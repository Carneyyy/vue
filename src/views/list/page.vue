<template>
  <div>
    <footer class="footer" style="margin-top:30px;">
      <div class="footerK">
        <div class="pageNav">
          <!-- 页码 -->
          <span @click="pageCallback(page.page)" v-for="(page,index) in apages" :key="index" class="page" :class="[page.active?'cPageNum':'pageNum']">{{page.text}}</span>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    preText: {
      type: String,
      default: '上一页'
    },
    nextText: {
      type: String,
      default: '下一页'
    },
    endshow: {
      type: String,
      default: 'false'
    },
    page: [String, Number],
    totalPage: [String, Number]
  },
  computed: {
    apages: function () {
      return this.nav(parseInt(this.page), parseInt(this.totalPage))
    }
  },
  methods: {
    nav: function (a, b) { // 当前页, 总页数
      var c = [] // 最终要遍历的数组
      // 如果总页数<=1就直接返回空数组不显示页码
      if (b <= 1) {
        return []
      }
      // 不走if说明总页数>1
      // 如果总页数小于当前页就给当前页重新赋值为总页数
      b < a && (a = b)
      // 如果当前页<=1就改为1
      if (a <= 1) {
        a = 1
      } else { // 否则则当前页大于1
        // 那就添加上一页和第一页
        c.push({page: a - 1, text: this.preText})
        c.push({page: 1, text: '1'})
      }
      // d表示当前页前面有几个最少两个就是前边添加上一页和第一页
      var d = 2
      // e 是当前页后边有几个最多9个因为太多显示不下
      var e = b < 9 ? b : 9
      // 如果当前页>=7就说明页码太多
      if (a >= 7) {
        // 当前页太多显示省咯号
        c.push({page: '', text: '...'})
        // 重新计算当前页前后各有几个页面始终保证当前页在中间显示
        d = a - 4
        e = a + 4
        e = b < e ? b : e
      }
      // 遍历当前页之前的页码
      for (; d < a; d++) c.push({page: d, text: d})
      // 插入当前页码并且为激活状态
      c.push({page: a, text: a, active: true})
      // 插入当前之后页码并且为激活状态
      for (d = a + 1; d <= e; d++)c.push({page: d, text: d})
      // 显示后置的省咯号
      if (this.endShow === 'true') {
        // 并且当前页之后的页码还没达到总页数
        if (e < b) {
          // 就插入省咯号和总页数及最后一页
          c.push({page: b, text: '...'})
          c.push({page: b, text: b})
        }
      }
      // 如果当前页小于总页数在插入下一页
      a < b && (c.push({page: a + 1, text: this.nextText}))
      // 发挥页码数组
      return c
    },
    pageCallback (page) {
      this.$emit('pagefn', {page: page})
    }
  }
}
</script>

<style scoped>
  footer {
    width: 100%;
    height: 60px;
    float: left;
  }

  .footerK {
    height: 100%;
    margin: 0px auto;
    line-height: 60px;
    text-align: right;
    position: relative;
  }

  .page {
    border: 1px solid #ddd;
    padding: 8px 12px;
    margin-left: 10px;
    text-align: center;
    cursor: pointer;
  }

  .page:hover {
    color: #09c762;
    border-color: #09c762;
  }

  .footerK a,
  .cPageNum {
    line-height: 35px;
    font-size: 12px;

    color: #939393;
    border: none;
    tencursor: pointer;
  }

  .cPageNum {
    color: #333333;
    font-weight: bold;

  }

  .footerK a:hover {
    color: #fff;
    background: #68a0fc;
  }
</style>
