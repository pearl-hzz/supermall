import axios from 'axios'


export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/z8', // api的base_url
    timeout: 10000 // 请求超时时间10s
  })



  // request拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // return err
  })

  // respone拦截器
  instance.interceptors.response.use(res => {
    // console.warn(res.data)//data 有用
    return res.data //这个config一定要返回出去，不然直接拦截
  }, err => {
    // return err
  })

  return instance(config)
}
