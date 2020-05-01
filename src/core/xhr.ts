import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helpers/header'
import { createError } from '../helpers/error'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data, url, method = 'get', headers, responseType, timeout, withCredentials } = config
    // 创建XHR请求对象的实例
    const request = new XMLHttpRequest()
    /**如果存在responseType */
    if (responseType) {
      request.responseType = responseType
    }
    /**设置请求时间 */
    if (timeout) {
      request.timeout = timeout
    }
    /**发送请求 */
    request.open(method.toUpperCase(), url!, true)
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
    /**是否携带cookie */
    if (withCredentials) {
      request.withCredentials = withCredentials
    }
    /**网络错误处理 */
    request.onerror = function() {
      reject(createError('Network Error!', config, null, request))
    }
    /**处理请求错误 */
    request.ontimeout = function() {
      reject(createError(`Timeout of ${timeout} ms exceeded`, config, null, request))
    }
    /**处理网络请求头 */
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
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
  })
}
