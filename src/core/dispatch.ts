import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { buildURL } from '../helpers/url'
import { transformRequest, transformReponse } from '../helpers/data'
import { processHeaders } from '../helpers/header'
import { flattenHeaders } from '../helpers/util'
import xhr from './xhr'

function dispatch(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.headers = transformHeaders(config)
  config.data = transformDataRequest(config)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformDataRequest(config: AxiosRequestConfig): string {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config
  return processHeaders(headers, data)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformReponse(res.data)
  return res
}
export default dispatch
