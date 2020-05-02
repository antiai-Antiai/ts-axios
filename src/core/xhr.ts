import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'
import { isURLSameOrigin } from '../helpers/url'
import { formData } from '../helpers/util'
import cookie from '../helpers/cookie'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data,
      url,
      method = 'get',
      headers,
      responseType,
      timeout,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress
    } = config
    // 创建XHR请求对象的实例
    const request = new XMLHttpRequest()
    /**发送请求 */
    request.open(method.toUpperCase(), url!, true)

    configreRequest()

    processHeaders()

    addEvent()

    request.send(data)

    // 处理状态码函数
    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    /**配置相关的操作 */
    function configreRequest(): void {
      /**如果存在responseType */
      if (responseType) {
        request.responseType = responseType
      }
      /**设置请求时间 */
      if (timeout) {
        request.timeout = timeout
      }
    }

    /**添加事件的相关操作 */
    function addEvent(): void {
      /**监听上传下载 */
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
      /**网络错误处理 */
      request.onerror = function() {
        reject(createError('Network Error!', config, null, request))
      }
      /**处理请求错误 */
      request.ontimeout = function() {
        reject(createError(`Timeout of ${timeout} ms exceeded`, config, null, request))
      }
      /**处理相应后的数据 */
      request.onreadystatechange = function handleLoad() {
        if (request.readyState !== 4) {
          return
        }
        if (request.status === 0) {
          return
        }
        const responseHeaders = parseHeaders(request.getAllResponseHeaders())
        const responseData = responseType !== 'text' ? request.response : request.responseText
        const response: AxiosResponse = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config,
          request
        }
        handleResponse(response)
      }
    }

    /** 请求头相关的处理 */
    function processHeaders(): void {
      /** 如果是formData上传方式，应该删除headers[Content-type],让浏览器自己判断 */
      if (formData) {
        delete headers['Content-type']
      }
      /**防止xsrf攻击 */
      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }
      /**是否携带cookie */
      if (withCredentials) {
        request.withCredentials = withCredentials
      }
      /**处理网络请求头 */
      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }
  })
}
