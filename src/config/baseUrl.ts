/*
 * @Author: LenGxin
 * @Description: 环境配置API_URL
 * @Date: 2019-11-18 20:35:03
 * @LastEditors: LenGxin
 * @LastEditTime: 2019-11-25 10:36:49
 */

/**
 * @param {X_API_URL} 项目接口地址
 * @param {X_DOMAIN} 项目域名地址
 */
// 线上环境
const PROD_API_URL: string = 'https://xxx.com'
const PROD_DOMAIN = ''

// 预发布环境
const UAT_API_URL: string = 'http://xxx.com'
const UAT_DOMAIN: string = 'http://xxx.com'

// 测试环境
const TEST_API_URL: string = 'http://xxx.com'
const TEST_DOMAIN: string = 'http://xxx.com'

// 开发环境
const DEV_API_URL: string = 'http://webapp.test.zanjiahao.com'
const DEV_DOMAIN: string = 'http://192.168.3.126:9527'

// mock环境
const MOCK_API_URL: string = '/mock/5c09ca373601b6783189502a/example/mock'

export function baseLink() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return {
        apiUrl: PROD_API_URL,
        domain: PROD_DOMAIN
      }
    case 'uat':
      return {
        apiUrl: UAT_API_URL,
        domain: UAT_DOMAIN
      }
      case 'test':
      return {
        apiUrl: TEST_API_URL,
        domain: TEST_DOMAIN
      }
    default:
      return {
        apiUrl: DEV_API_URL || MOCK_API_URL,
        domain: DEV_DOMAIN
      }
  }
}
