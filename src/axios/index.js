import axios from 'axios'
import store from '../store/store'
// http 拦截器
axios.interceptors.request.use(
  config => {
    // 判断token是否存在
    if (store.state.userInfo.token) {
      config.headers.authorizetion = `JWT ${store.state.userInfo.token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
axios.interceptors.response.use(
  undefined,
  error => {
    let res = error.response
    switch (res.status) {
      case 401:
        console.log('未登录')
        break
      case 403:
        console.log('您没有该操作权限')
        break
      case 500:
        console.log('服务器错误')
        break
    }
    return Promise.reject(error.response.data)
  }
)
