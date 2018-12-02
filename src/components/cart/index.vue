<template>
  <div class="content">
    <div class="flex">
      <mt-search class="sousuo" cancel-text=""
      placeholder="搜索书籍" v-model="value">
      </mt-search>
      <mt-button type="primary" @click="qq(1)" class="button">搜索</mt-button>
    </div>
    <div class="tab" @click="remen">
      <el-tag type="info">雪中悍刀行</el-tag>
      <el-tag>剑来</el-tag>
      <el-tag type="success">牧神记</el-tag>
      <el-tag type="warning">凡人修仙传</el-tag>
      <el-tag type="danger">圣墟</el-tag>
      <el-tag type="info">斗破苍穹</el-tag>
      <el-tag>无限恐怖</el-tag>
      <el-tag type="success">将夜</el-tag>
    </div>
    <div class="fa" style="display: none;">
      <ul class="list">
        <router-link :to="{ name: 'detail', params: {id: item._id}}" tag="li" v-for="item of $store.state.cart.ssjg" :key="item._id">
          <img :src="decodeURIComponent(item.cover).substring(7)" :alt="item.alt" />
          <div>
            <h3>{{item.title}} <span>作者：{{item.author}}</span></h3>
            <span>{{item.shortIntro}}</span>
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Indicator, Search, Button } from 'mint-ui'
import { Tag } from 'element-ui'
Vue.use(Button)
Vue.use(Search)
Vue.use(Indicator)
Vue.use(Tag)
// Vue.use(Element)
export default {
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.remen = (event) => {
      if (event.target.className !== 'tab') {
        this.qq(event.target.innerHTML)
      }
    }
    this.qq = (n) => {
      Indicator.open()
      var tab = document.querySelector('.tab')
      tab.style.display = 'none'
      if (n !== 1) {
        this.value = n
      }
      this.$store.dispatch('getssjg', this.value).then(() => {
        setTimeout(() => {
          var fa = document.querySelector('.fa')
          fa.style.display = 'block'
          Indicator.close()
        }, 1000)
      })
    }
    document.onkeydown = (e) => {
      var key = window.event.keyCode
      if (key === 13) {
        this.qq(1)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/lib/reset.scss';
.mint-search-list{
  height:.2rem!important;
}
.content {
  @include flex();
  @include rect(100%, auto);
  @include overflow(hidden);
  .flex{
    display: flex;
    height: 0.5rem ;
    padding: 0 .05rem;
    .sousuo{
      width: 80%;
      height: 0.5rem ;
    }
    .button{
      width: 20%;
      height: 0.44rem ;
      background: #ccc
    }
  }
  .list{
    padding: 2%;
  li{
    display: flex;
    margin-top: 1%;
    height: 1rem;
    @include overflow(hidden);
    div{
      padding-left: 1.5em;
    }
    h3{
      line-height: .3rem;
      width: 100%;
      font-size: .2rem;
      span{
        text-indent: 0;
      }
    }
    span{
      text-indent: 2em;
      float: right;
      font-size: .15rem;
      color:rgb(150, 131, 131);
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
    }
  }
  img{
    width: 20%;
    height: atuo;
    }
  }
}
.el-tag{
  font-size: .15rem;
  display: inline-block;
  margin: 3%
}
</style>
