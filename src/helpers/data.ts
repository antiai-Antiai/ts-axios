import { isPlainObject } from './util'
export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
}

export function transformReponse(data: any): any {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch (error) {
      // do nothing
    }
  } else {
    return data
  }
}
