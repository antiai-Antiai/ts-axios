import { isDate, isObject } from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
export function buildURL(url: string, params?: any): string {
  if (!params) {
    return url
  }
  const parts: string[] = []
  /**
   * 遍历params
   * 定义键值对数组，把遍历params的结果以key-value的形式push进数组
   * 通过join 和 & 符号拼接成字符串返回
   */
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return // return 不能跳出forEach循环，会进入到下一次循环
    }

    /**
     * val的值可能是数组，也可能不是，此处统一做数组处理
     */
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    /**
     * val有可能是日期类型，也有可能是对象类型
     */
    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${encode(key)}=${encode(val)}`)
    })
  })
  /**拼接数组 返回组装后的url */
  let serializedParams = parts.join('&')
  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }
  return url
}
