<template>
  <div class="content">
    <div class="boxx">
      <ul>
        <div class="Bookdetails">
          <dl>
            <dt><img :src="decodeURIComponent(list.cover).substring(7)"/></dt>
            <dd>
              <h2>书名:{{list.title}}</h2>
              <ul>
                <li>作者:{{list.author}}</li>
                <li>类型:{{list.cat}}</li>
                <li>连载中</li>
              </ul>
            </dd>
          </dl>
        </div>
        <div class="backlist">
          <div class="jianjie">
            <h2>简介</h2>
            <p>{{list.longIntro}}</p>
          </div>
          <div class="mulu">
            <h2>目录</h2>
            <p>最新章节:{{list.lastChapter}}</p>
          </div>
        </div>
      </ul>
    </div>
    <div class="Bookfooter">
      <button id="add" @click="uid==''?login():add()"  :disabled="falg">
        <span  class="iconfont icon-jiajianzujianjiahao"> 加入书架</span>
      </button>
      <router-link :to="{ name: 'kind', params: {id: id}}" tag="div" id="go">
        立即阅读
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
			falg: false,
      list: {},
      id: 1,
			uid:''
    }
  },
	methods:{
		login () {
			location.href = '/#/register'
		},
		addquery () {// 查询购物车中是否存在
				axios({
					method:'post',
					url: 'http://jx.xuzhixiang.top/ap/api/productlist.php', 
					params: {
						uid: this.uid
					}
				}).then(data => {
					var state = true
					data.data.data.map((c) => {
						if (c.pdesc == this.id){
							state = false
						}
					})
					if (state) {//不存在  可以加
						this.falg = false
						// this.add()
					} else {//存在  不能点，变色
						this.falg = true
						var add = document.querySelector('#add')
						add.style.background = '#666'
						add.childNodes[0].innerHTML = " 已在书架"
					}
				})
		},
		add () {// 加入书架
			axios({
				method:'post',
				url: 'http://jx.xuzhixiang.top/ap/api/goods/goods-add.php', 
				params: {
					pimg: this.list.cover,
					pname: this.list.title,
					pprice: 1,
					pdesc: this.id,
					uid: this.uid
				}
      }).then(data => {
          if (data.status == 200){
						this.addquery()
						// alert('加入书架')
					}
      })
		 }
	},
  created () {
		var uid = sessionStorage.getItem('uid')
		if(uid){
			this.uid = uid
			// console.log(sessionStorage.getItem('uid'))
			this.addquery()
		} else {
			
		}
    this.id = this.$route.params.id
    // console.log(this.$route.params.id)
    fetch('/zs/book/' + this.id)
      .then(res => res.json())
      .then(data => {
        this.list = data
        // console.log(data)
      })
  }
}
</script>
<style lang="scss">
@import '@/lib/reset.scss';
.mint-header{
  background: rgb(88, 34, 34);
  height: 8%;
}
.content{
  font-size: .2rem;
}
.boxx{
  width: 100%;
  height: 90%;
  display: flex;
  flex:1;
  overflow: hidden;
  ul{
    width: 100%;
    height: 100%;
    overflow: auto
  }
}
.Bookdetails{
  padding: 2%;
  background: rgb(133, 68, 44);
  color: #fff;
  dl{
    display: flex;
    @include rect(100%, 30%);
    img{
      width: 1.4rem;
      height: 2rem;
    }
    dd{
      margin-left: 5%;
    }
  }
}
.backlist{
  // margin:2% 0;
  h2{
    font-size: .25rem;
  }
  .jianjie{
    background: #ccc;
    margin:2% 0;
    padding: 2%;
    p{
      text-indent: 2em;
      font-size: .16rem;
    }
  }
  .mulu{
    background: #ccc;
    margin:2% 0;
    padding: 2%;
  }
}
.Bookfooter{
  position: absolute;
  z-index: 5;
  top: 89%;
  padding: 2%;
  font-size: .2rem;
  background: rgb(207, 204, 204);
  @include rect(100%, 11%);
  #add{
		border: 0;
    font-size: .15rem;
  }
  div,#add{
    margin: 1%;
    @include rect(48%, 100%);
    color: #fff;
    background: rgb(228, 54, 54);
    float: left;
    @include flexbox();
    @include flex-direction(column);
    @include justify-content();
    @include align-items();
  }
}
</style>
