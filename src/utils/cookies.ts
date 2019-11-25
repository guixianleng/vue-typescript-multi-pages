/*
 * @Author: LenGxin
 * @Description: cookie存储
 * @Date: 2019-11-18 15:37:16
 * @LastEditors: LenGxin
 * @LastEditTime: 2019-11-18 15:40:47
 */
import Cookies from 'js-cookie'
import { TOKEN_EXPIRES } from '@/config' // cookie保存的天数

/**
 * @description: 存取token
 * @param {string} token
 */
export const TOKEN_KEY: string = 'token'

export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, { expires: TOKEN_EXPIRES })
}

export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) {
    return token
  } else {
    return false
  }
}

export const removeToken = () => Cookies.remove(TOKEN_KEY)
