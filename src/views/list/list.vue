<template>
  <div id="wrapper">
    <current-loc :curloc="curloc"></current-loc>
    <div class="main cle">
      <list-nav @on-change="changeMenu" :currentCategoryName = "currentCategoryName" :cateMenu="cateMenu" :isobject="isobject" :proNum="proNum"></list-nav>
      <div class="maincon">
        <price-range :priceRange="priceRange" @on-change="changePrice"></price-range>
        <list-sort @on-sort="changeSort" :proNum="proNum"></list-sort>
        <div class="list-detail">
          <product-list :listData="listData"></product-list>
          <page @pagefn="pagefn" pre-text="上一页" next-text="下一页" end-show = "false" :page="curPage" :total-page="totalPage"></page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getCatrgory, getCurLoc, getPriceRange, getGoods} from '../../api/api'
import currentLoc from './current-loc'
import listNav from './listNav'
import priceRange from './priceRange'
import listSort from './listSort'
import productList from './productList'
import page from './page'

export default {
  data () {
    return {
      top_category: '', // 商品类别id
      cateMenu: {}, // 菜单列表
      currentCategoryName: '',
      isobject: true,
      curloc: [],
      priceRange: [], // 价格区间
      pageTpye: 'list',
      searchWord: '',
      listData: [],
      proNum: 0,
      ordering: '-add_time',
      pricemin: '',
      pricemax: '',
      curPage: 1
    }
  },
  components: {
    'current-loc': currentLoc,
    'list-nav': listNav,
    'price-range': priceRange,
    'list-sort': listSort,
    'product-list': productList,
    'page': page
  },
  created () {
    this.getAllData()
  },
  methods: {
    getAllData () {
      // console.log(this.$route.params)
      if (this.$route.params.id) {
        this.top_category = this.$route.params.id
        this.getMenu(this.top_category) // 获取左侧菜单列表
      } else {
        this.getMenu(null) // 获取左侧菜单列表
        this.pageTpye = 'search'
        this.searchWord = this.$route.params.keyword
      }
      this.getCurLoc() // 获取当前位置
      this.getPriceRange()// 获取价格区间
      this.getListData()// 获取产品列表
    },
    getMenu (id) {
      if (id != null) {
        getCatrgory({
          id: id
        }).then(response => {
          // console.log(response.data)
          this.cateMenu = response.data.sub_cat
          this.currentCategoryName = response.data.name
        }).catch(error => {
          console.log(error)
        })
      } else {
        getCatrgory({}).then(response => {
          // console.log(response.data)
          this.cateMenu = response.data
          this.isobject = false
        }).catch(error => {
          console.log(error)
        })
      }
    },
    getCurLoc () {
      getCurLoc({
        proType: this.top_category
      }).then(response => {
        // console.log(response.data)
        this.curloc = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getPriceRange () {
      getPriceRange({
        proType: this.top_category
      }).then(response => {
        // console.log(response.data)
        this.priceRange = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListData () {
      if (this.pageTpye === 'search') {
        getGoods({
          search: this.searchWord,
          ordering: this.ordering,
          pricemin: this.pricemin,
          pricemax: this.pricemax,
          page: this.curPage
        }).then(response => {
          // console.log(response.data)
          this.listData = response.data.results
          this.proNum = response.data.count
        }).catch(error => {
          console.log(error)
        })
      } else {
        getGoods({
          top_category: this.top_category,
          ordering: this.ordering,
          pricemin: this.pricemin,
          pricemax: this.pricemax,
          page: this.curPage
        }).then(response => {
          console.log(response.data)
          // this.priceRange = response.data
          this.listData = response.data.results
          this.proNum = response.data.count
        }).catch(error => {
          console.log(error)
        })
      }
    },
    changeSort (type) {
      this.ordering = type
      this.getListData()
    },
    changePrice (data) {
      this.pricemin = data.min
      this.pricemax = data.max
      this.getListData()
    },
    changeMenu (id) {
      this.top_category = id
      this.getCurLoc()
      this.getMenu()
      this.getListData()
    },
    pagefn (value) {
      this.curPage = value.page
      this.getListData()
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.proNum / 12)
    }
  },
  watch: {
    '$route': 'getAllData'
  }
}
</script>

<style scoped>
  .maincon {
    width: 970px;
    float: right;
  }
</style>
