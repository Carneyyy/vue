// 引入vue
import Vue from 'vue'
// 全局引入Vuex
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import cookie from '../../static/js/cookie'
// 全局注册vuex
Vue.use(Vuex)
const userInfo = {
  name: cookie.getCookie('name') || '',
  token: cookie.getCookie('token') || ''
}
const goodsList = {
  totalPrice: '',
  goods_list: []
}
const state = {
  userInfo,
  goodsList
}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
})
