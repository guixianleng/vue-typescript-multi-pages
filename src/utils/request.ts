import * as axios from 'axios'
import { AxiosResponse, AxiosRequestConfig } from 'axios'
import { baseLink } from '@/config/baseUrl'

 /* 创建axios实例 */
const service = axios.default.create({
  baseURL: baseLink().apiUrl,
  timeout: 6 * 1000,
  maxContentLength: 4000,
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
}, (error: any) => {
  Promise.reject(error)
})

service.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status !== 200) {
      console.log('错误处理')
    } else {
      return res.data
    }
  },
  (error: any) => {
    return Promise.reject(error)
  }
)
    
export default service
