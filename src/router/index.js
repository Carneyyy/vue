// 引入vue
import Vue from 'vue'
// 引入路由组件
import Router from 'vue-router'
// 引入公共部分
import app from '../views/app/app'
import head from '../views/head/head'
import home from '../views/home/home'
import footer from '../views/footer/footer'
import list from '../views/list/list'
import index from '../views/index/index'
import loginHead from '../views/loginhead/loginHead'
import login from '../views/login/login'
import register from '../views/register/register'
import store from '../store/store'
import productDetail from '../views/productDetail/productDetail'
import cart from '../views/cart/cart'
import shophead from '../views/head/shophead'
import cookie from '../../static/js/cookie'
// 注册路由
Vue.use(Router)

var router = new Router({
  routes: [{
    path: '/app',
    component: app,
    children: [
      {
        path: 'login',
        name: 'login',
        components: {
          head: loginHead,
          content: login,
          footer: footer
        },
        meta: {
          title: '登录',
          need_log: false
        }
      },
      {
        path: 'register',
        name: 'register',
        components: {
          head: loginHead,
          content: register,
          footer: footer
        },
        meta: {
          title: '注册',
          need_log: false
        }
      },
      {
        path: 'home',
        components: {
          head: head,
          content: home,
          footer: footer,
          need_log: false
        },
        children: [
          {
            path: 'list/:id',
            name: 'list',
            component: list,
            meta: {
              title: '列表',
              need_log: false
            }
          },
          {
            path: 'search/:keyword',
            name: 'search',
            component: list,
            meta: {
              title: '搜索',
              need_log: false
            }
          },
          {
            path: 'index',
            name: 'index',
            component: index,
            meta: {
              title: '首页',
              need_log: false
            }
          },
          {
            path: 'productDetail/:productId',
            name: 'productDetail',
            component: productDetail,
            meta: {
              title: '商品详情',
              need_log: false
            }
          }
        ]
      },
      {
        path: 'shoppingcart',
        name: 'shoppingcart',
        components: {
          head: shophead,
          content: home,
          footer: footer
        },
        children: [
          {
            path: 'cart',
            name: 'cart',
            component: cart,
            meta: {
              title: '购物车',
              need_log: true
            }
          }
        ]
      }
    ]
  }
  ]
})
// 进行路由判断
router.beforeEach((to, from, next) => {
  var nextPath = cookie.getCookie('nextPath')
  console.log(nextPath)
  if (nextPath === 'pay') {
    next({
      path: '/app/home/member/order' // 跳转到订单列表页
    })
  } else {
    if (to.meta.need_log) {
      if (!store.state.userInfo.token) {
        next({
          path: '/app/login'
        })
      } else {
        next()
      }
    } else {
      if (to.path === '/') {
        next({
          path: 'app/home/index'
        })
      } else {
        next()
      }
    }
  }
})
// 用来修改网络标题
router.afterEach((to, from) => {
  document.title = to.matched[to.matched.length - 1].meta.title
})

export default router
