import axios from 'axios'
// let host = 'http://127.0.0.1:8000'
let host = ''

// 获取商品类别信息
export const getCatrgory = params => {
  if ('id' in params) {
    return axios.get(`${host}/categorys/${params.id}/`)
  } else {
    return axios.get(`${host}/categorys/`, params)
  }
}
// 获取热门关键字
export const getHostSearch = params => {
  return axios.get(`${host}/hotsearchs/`, params)
}
// 获取当前位置
export const getCurLoc = params => {
  return axios.get(`${host}/currentLoc/`, params)
}
// 获取价格区间
export const getPriceRange = params => {
  return axios.get(`${host}/priceRange/`, params)
}
// 获取商品列表
export const getGoods = params => {
  return axios.get(`${host}/goods/`, {params: params})
}
export const bannerGoods = () => {
  return axios.get(`${host}/getBanner/`)
}
export const queryCategoryGoods = () => {
  return axios.get(`${host}/indexgoods/`)
}
// 登陆
export const login = params => {
  return axios.get(`${host}/login/`, params)
}
export const getMessage = params => {
  return axios.post(`${host}/code/`, params)
}
export const register = params => {
  return axios.post(`${host}/users/`, params)
}
export const getGoodsDetail = goodId => {
  return axios.post(`${host}/goods/${goodId}/`)
}
export const getFav = goodId => {
  return axios.get(`${host}/userfavs/${goodId}/`)
}
export const addFav = params => {
  return axios.post(`${host}/userfavs/`, params)
}
export const delFav = goodId => {
  return axios.delete(`${host}/userfavs/${goodId}/`)
}
export const addShopCart = params => {
  return axios.post(`${host}/shopcarts/`, params)
}
export const getShopCarts = () => {
  return axios.get(`${host}/shopcarts/`)
}
export const deleteShopCart = goodsId => {
  return axios.delete(`${host}/shopcarts/${goodsId}/`)
}
export const updateShopCart = (goodsId, params) => {
  return axios.patch(`${host}/shopcarts/${goodsId}/`, params)
}
export const delAllShopCart = () => {
  return axios.delete(`${host}/shopcarts/`)
}
export const getAddress = () => {
  return axios.get(`${host}/address/`)
}
export const createOrder = params => {
  return axios.post(`${host}/orders/`, params)
}
