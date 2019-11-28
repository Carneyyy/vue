var Mock = require('mockjs')

var catehorys = require('./mock/categorys')
var hotsearchs = require('./mock/hotSearch')
var categorysid = require('./mock/categorys_id')
var goods = require('./mock/goods')
var banner = require('./mock/banner')
var newopro = require('./mock/newopro')
var seriesList = require('./mock/seriesList')
var login = require('./mock/login')
var productDetail = require('./mock/productDetail')

Mock.mock(/\/categorys\/[0-9]+/, categorysid) // 所有类别菜单列表
Mock.mock('/categorys/', catehorys)
Mock.mock('/hotsearchs/', hotsearchs) // 首页热搜
Mock.mock('/currentLoc/', // 当前位置
  [
    {
      id: 0,
      name: '首页'
    },
    {
      id: 2,
      name: '酒水饮料'
    },
    {
      id: 21,
      name: '白酒'
    },
    {
      id: 213,
      name: '茅台'
    }
  ]
)
Mock.mock('/priceRange/', // 价格区间
  [
    {
      min: 1,
      max: 25
    },
    {
      min: 25,
      max: 50
    },
    {
      min: 50,
      max: 75
    },
    {
      min: 75,
      max: 100
    }
  ]
)
Mock.mock(/\/goods\/\?is_new=true/, newopro)
Mock.mock(/\/goods\/[0-9A-Za-z]+/, productDetail)
Mock.mock(/\/goods\/.+/, goods)// 列表商品
Mock.mock('/getBanner/', banner)
Mock.mock('/indexgoods/', seriesList)
Mock.mock('/login/', login) // 登录
Mock.mock('/code/', {status: 'ok'})// 发送短
Mock.mock('/users/', login) // 注册
Mock.mock(/\/userfavs\/[0-9A-Za-z]+/, 'get', {hasFav: true}) // 是否收藏
Mock.mock(/userfavs/, 'post', {}) // 添加收藏
Mock.mock(/\/userfavs\/[0-9A-Za-z]+/, 'delete', {}) // 取消收藏
Mock.mock(/shopcarts/, 'post', {}) // 加入购物车
Mock.mock(/shopcarts/, 'delete', {}) // 清空购物车
Mock.mock('/shopcarts/', 'get', // 请求购物车列表数据
  [
    {
      goods: {
        id: '23243453',
        image: '../../../static/images/productDetail/images/1_thumb_G_1449024889033.jpg',
        title: '新鲜水果甜蜜香脆单果约800克',
        shop_price: 123
      },
      nums: 1,
      total: 123
    },
    {
      goods: {
        id: '23243454',
        image: '../../../static/images/productDetail/images/21_thumb_G_1448946793103.jpg',
        title: '人头马进口XO',
        shop_price: 123
      },
      nums: 2,
      total: 123
    },
    {
      goods: {
        id: '23243455',
        image: '../../../static/images/productDetail/images/30_thumb_G_1448948662661.jpg',
        title: '菠萝蜜新鲜水果甜蜜保鲜1000克',
        shop_price: 123
      },
      nums: 4,
      total: 123
    }
  ]
)
Mock.mock(/\/shopcarts\/[0-9]+/, 'delete', {}) // 移除购物车某个商品
Mock.mock(/\/shopcarts\/[0-9]+/, 'patch', {}) // 更新购物车商品
Mock.mock('/address/', // 获得所有配送地址
  [
    {
      id: '222',
      province: '四川省',
      city: '成都市',
      district: '双流区',
      address: '锦绣花园',
      signer_mobile: 18311220453,
      signer_name: '李易峰',
      note: '发顺丰'
    },
    {
      id: '333',
      province: '辽宁省',
      city: '铁岭市',
      district: '清河区',
      address: '象牙山村',
      signer_mobile: 18311220453,
      signer_name: '赵本山',
      note: '发顺丰'
    }
  ]
)
Mock.mock(/orders/, 'post', {'alipay_url': '../static/alipay.html'})
