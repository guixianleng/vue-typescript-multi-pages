/*
 * @Author: LenGxin
 * @Description: 公共函数库
 * @Date: 2019-11-18 15:02:49
 * @LastEditors: LenGxin
 * @LastEditTime: 2019-11-21 15:46:29
 */

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = (url: string) => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj: any = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
export const hasKey = (obj: any, key: string | number) => {
  if (key) {
    return key in obj
  } else {
    const keysArr = Object.keys(obj)
    return keysArr.length
  }
}

/**
 * @msg: 获取系统当前时间
 * @param {string} fmt 时间格式 具体看代码
 * @return: string
 */
export const getDate = (fmt: any) => {
  let time = ''
  const date = new Date()
  const o: any = {
    'M+': date.getMonth() + 1, // 月份 
    'd+': date.getDate(), // 日 
    'H+': date.getHours(), // 小时 
    'm+': date.getMinutes(), // 分 
    's+': date.getSeconds(), // 秒 
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度 
    'S': date.getMilliseconds() // 毫秒 
  }
  if (/(y+)/.test(fmt)) {
    time = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      time = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return time
}

/**
 * @msg: 获取系统当前时间
 * @param {string} date 时间
 * @param {string} fmt 时间格式
 * @return: string
 */
export const formatDate = (date: any, fmt: string) => {
  let time = ''
  const o: any = {
    'M+': date.getMonth() + 1, // 月份 
    'd+': date.getDate(), // 日 
    'H+': date.getHours(), // 小时 
    'm+': date.getMinutes(), // 分 
    's+': date.getSeconds(), // 秒 
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度 
    'S': date.getMilliseconds() // 毫秒 
  }
  if (/(y+)/.test(fmt)) {
    time = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      time = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return time
}

export const verifyStr = (str: string | number, text: string) => {
  const _str = str.toString().trim()
  const toastStr = _str.length ? false : `请填写${text}～`
  return {
    errMsg: toastStr,
    done: !toastStr,
    value: _str
  }
}

/**
 * JSON 克隆
 * @param {Object | Json} jsonObj json对象
 * @return {Object | Json} 新的json对象
 */
export function objClone(jsonObj: any) {
  let buf: any
  if (jsonObj instanceof Array) {
    buf = []
    let i = jsonObj.length
    while (i--) {
      buf[i] = objClone(jsonObj[i])
    }
    return buf
  } else if (jsonObj instanceof Object) {
    buf = {}
    for (let k in jsonObj) {
      buf[k] = objClone(jsonObj[k])
    }
    return buf
  } else {
    return jsonObj
  }
}
