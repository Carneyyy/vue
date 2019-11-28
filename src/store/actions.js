import {SET_INFO, SET_SHOPLIST} from './mutation-types'
function makeAction (type) {
  return ({commit}, ...args) => commit(type, ...args)
}
export default {
  setInfo: makeAction(SET_INFO),
  setShopList: makeAction(SET_SHOPLIST)
}
