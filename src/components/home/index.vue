<template>
   <div class="content">
    <div class="fa">
      <ul class="list">
        <router-link :to="{ name: 'detail', params: {id: item._id}}" tag="li" v-for="item of list" :key="item._id">
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
import Header from '@/components/Header'
import { Indicator } from 'mint-ui'
export default {
  data () {
    return {
      list: []
    }
  },
  components: {
    'my-header': Header
  },
  created () {
    Indicator.open('加载中...')
    fetch('/zs/ranking/54d42d92321052167dfb75e3')
      .then(res => res.json())
      .then(data => {
        this.list = data.ranking.books
        // console.log(data.ranking.books)
        Indicator.close()
      })
  }
}
</script>

<style lang='scss'>
@import '@/lib/reset.scss';
.mint-search-list{
  height:.2rem!important;
}
.content {
  @include flex();
  @include rect(100%, auto);
  @include overflow(hidden);
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
</style>
