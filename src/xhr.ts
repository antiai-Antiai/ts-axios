import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helpers/header'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise(resolve => {
    const { data, url, method = 'get', headers, responseType } = config
    // 创建XHR请求对象的实例
    const request = new XMLHttpRequest()
    /**如果存在responseType */
    if (responseType) {
      request.responseType = responseType
    }
    /**发送请求 */
    request.open(method.toUpperCase(), url, true)
    /**处理相应后的数据 */
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
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
      resolve(response)
    }
    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
  })
}
