<template>
  <footer class="footer">
    <ul>
      <router-link :to="item.path" tag="li" v-for = "(item, index) of list" :key = "index">
        <span :class = "item.icon" @click="callheader(item.name)"></span>
        <p>{{ item.name }}</p>
      </router-link>
    </ul>
  </footer>
</template>

<script>
export default {
  data () {
    return {
      list: [
        {
          icon: 'iconfont icon-wode1',
          name: '我的书架',
          path: '/user'
        },
        {
          icon: 'iconfont icon-sousuo',
          name: '搜索',
          path: '/cart'
        },
        {
          icon: 'iconfont icon-paixingbang',
          name: '排行榜',
          path: '/home'
        }
      ]
    }
  },
  methods: {
    callheader (n) {
      this.$parent.$emit('call-header', n)
    }
  }
}
</script>

<style lang='scss'>
@import '@/lib/reset.scss';
.footer {
  @include rect(100%, 0.5rem);
  ul {
    @include rect(100%, 100%);
    @include flexbox();
    li {
      @include flex();
      @include flexbox();
      @include flex-direction(column);
      @include justify-content();
      @include align-items();
      span {
        @include font-size(0.24rem);
      }
      p {
        @include font-size(0.12rem);
      }
      &.router-link-active {
        @include text-color(#f66)
      }
    }
  }
}
</style>
