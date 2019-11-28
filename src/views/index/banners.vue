<template>
  <div class="banner-warp">
    <swiper :options="swiperOption">
      <swiper-slide v-for="items in banners" :key="items.goods">
        <router-link :to="'app/home/productDetail/'+items.goods" target="_blank">
          <img :src="items.image" alt=""/>
        </router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

  </div>

</template>

<script>
import {bannerGoods} from '../../api/api'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  data () {
    return {
      banners: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 3000, // 时间间隔
          stopOnLastSlide: false, // 到最后一张是否停止
          disableOnInteraction: false
        }
      }
    }
  },
  created () {
    this.getBanner()
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    getBanner () {
      bannerGoods().then(response => {
        // console.log(response.data)
        this.banners = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.banner-warp{
  height:300px;
}
</style>
