<template>
  <div class="content">
    <div class="taa">
      <mt-index-list>
        <mt-index-section :index='"章节目录("+$store.state.kind.mulu.length+")"'>
					<div @click="tabnn" style="position: fixed;top: 0.1rem;right: 0.1rem;z-index: 9999;font-size: 0.15rem;">返回</div>
          <p  @click="tabn(index)" v-for="(item, index) in $store.state.kind.mulu" :key="index"><mt-cell :title="item.title"></mt-cell></p>
        </mt-index-section>
      </mt-index-list>
    </div>
    <div class="zhangj">
      <ul @click = 'showActionSheet'>
          <h3>{{$store.state.kind.zj}}</h3>
          <p>{{$store.state.kind.centent}}</p>
      </ul>
    </div>
    <div class="shade">
      <div v-if="sheetVisible">
        <mt-header fixed v-model="sheetVisible" title="书 籍" style="font-size:.2rem;">
          <mt-button @click="back" slot="left" icon="back"></mt-button>
          <mt-button @click="tab" slot="right" style="color:#ccc">目录</mt-button>
        </mt-header>
      </div>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible"
        cancelText="">
      </mt-actionsheet>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Indicator, Header, Actionsheet, IndexList, IndexSection } from 'mint-ui'
import { mapState } from 'vuex'
import axios from 'axios'
Vue.use(Header)
Vue.use(Actionsheet)
Vue.use(IndexList)
Vue.use(IndexSection)
export default {
  data () {
    return {
      list: [0],
      sheetVisible: false,
      actions: [],
			gzj: false,
			pid: '',
			url: '',
			pimg:'',
			pname:''
    }
  },
  computed: mapState({
    centent: state => state.kind.centent,
    zj: state => state.kind.zj
  }),
  mounted: function () {
    var ths = this
    this.loadMore()
    this.actions = [
      {name: '上一章', method () { ths.loadMore(-3) }},
      {name: '下一章', method () { ths.loadMore(-1) }}
    ]
    // var feader = document.querySelector('.mint-header is-fixed')
  },
  methods: {
		deleteb() { //删
				axios({
					method:'post',
					url: 'http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php', 
					params: {
						pid: this.pid
					}
				}).then(data => {
					// console.log(data.data.msg)
				})
		},
		tabnn () {
			var taa = document.querySelector('.taa')
			this.showActionSheet()
			taa.style.display = 'none'
		},
    tab () {
      var taa = document.querySelector('.taa')
      taa.style.display = 'block'
    },
    tabn (list) {
      var taa = document.querySelector('.taa')
      this.loadMore(list)
      taa.style.display = 'none'
      this.showActionSheet()
    },
    showActionSheet () {
      this.sheetVisible = !this.sheetVisible
    },
    back () {
      this.$router.go(-1)
			// window.location.href = document.referrer
			
    },
    loadMore (a) {
      Indicator.open('加载中...')
      var b = 0
      // console.log(document.documentElement.scrollTop)
      setTimeout(() => {
        this.id = this.$route.params.id
				let last = this.list[this.list.length - 1]
				var czj = this.$route.params.id.substring(this.$route.params.id.indexOf("?")+1)
				if (isNaN(czj-1) == false){
					// console.log(czj)
					if (b == 0) {
						this.list[0] = czj-1
					}
				} else {
					this.list[0] = last + Number(b)
				}
				
				if (a != null) {
					b = a
					if (b == 0) {
						this.list[0] = 0
					} else if (b > 1) {
						this.list[0] = b
					} else if (b < 0) {
						this.list[0] = last + Number(b) + 2
					}
				}
        if (this.list[0] < 0) {
          this.list[0] = 0
        }
        this.qq({id: this.id, list: this.list[0], zj: this.zj, centent: this.centent})
        this.loading = false
      }, 1)
    }
  },
  created () {
    Indicator.open('加载中...')
    this.qq = (id) => {
      this.$store.dispatch('getxiangq', id).then(() => {
        Indicator.close()
      })
      document.querySelector('.content').scrollTop = 0
    }
		axios({ //  查
			method:'post',
			url: 'http://jx.xuzhixiang.top/ap/api/productlist.php', 
			params: {
				uid: 5614
			}
		}).then(data => {
			this.url = this.$route.params.id
			var url1 = this.$route.params.id.substring(0,this.$route.params.id.indexOf("?"))
			if(url1 != '') {
				this.url = url1
			}
			// console.log(this.$route.params.id.substring(0,this.$route.params.id.indexOf("?")))
			data.data.data.map((c) => {
				if (c.pdesc == this.url){
					this.pid = c.pid
					this.gzj = true
					this.pimg = c.pimg
					this.pname = c.pname
				}
			})
			// console.log(this.pid)
		})
  },
	destroyed (){
		if(this.gzj){// 查到有就删
			axios({ //增
				method:'post',
				url: 'http://jx.xuzhixiang.top/ap/api/goods/goods-add.php', 
				params: {
					pimg: this.pimg,
					pname: this.pname,
					pprice: this.list[0]+1,
					pdesc: this.url,
					uid: 5614
				}
			}).then(data => {
					if (data.status == 200){
						// console.log('+++')
						this.deleteb()//  删
						setTimeout(() => {
							this.$store.dispatch('queryshu',sessionStorage.getItem('uid'))
						}, 100)
// 						this.deleteb()//  删
// 						this.$store.dispatch('queryshu')
					}
			})
		}

	}
}
</script>

<style lang="scss">
.content{
  .taa{
    display: none;
    width: 100%;
    height: 100%;
    position: absolute;
    background: #fff;
    z-index: 9999;
  }
  .zhangj{
    white-space: pre-wrap;
    color: #755927;
    background: #e9e6d0;
    padding: 3%;
    font-size: .23rem;
    div{
      display: flex;
      justify-content: space-between
    }
  }
  .shade{
    .mint-header{
      z-index: 2050;
      height: 7%;
      background: #000;
    }
  }
}
.mint-indexsection{
	padding-top: 0.4rem;
}
.mint-indexsection-index{
	width: 100%;
	position: absolute;
	top: 0;
	z-index: 9998;
}
.mint-actionsheet-listitem{
  background: #000;
  color: #fff
}
.mint-indexsection{
  ul p{
    background: #755927
  }
}
.mint-indexlist-nav{
  width:0
}
.up-enter-active {
  transform: translateY(0);
  transition: all 0.6s ease;
}
.up-leave-active {
  transition: all 0s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.up-enter {
  transform: translateY(100%);
}
.up-leave-to{
  transform: translateY(-100%);
}
</style>
