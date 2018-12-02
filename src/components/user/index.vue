<template>
	<div class="content">
		<div class="fa">
			<ul class="listt">
				<div id="bianji" @click="bianji">编辑</div>
				<div class="bianji"  style="display:none;">
					<div class="hetop">
						<el-checkbox id="quan" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAll">全选</el-checkbox>
						<button type="primary" class="btn" @click="deletea">删除</button>
					</div>
					<el-checkbox-group v-model="checkedCities" @change="handleChecked">
						<el-checkbox v-for="item in ssjg" :label="item" :key="item.pid">{{item.pname}}</el-checkbox>
					</el-checkbox-group>
					<div @click="clearlogin" style="margin:0 25% 5%;width: 50%;height: 30px;background: #FF6666;text-align: center;line-height: 30px;color: #FFFFFF;font-size: 20px;">退出登录</div>
				</div>
				<router-link :to="{ name: 'kind', params: {id:item.pdesc+'?'+parseInt(item.pprice)}}" tag="div" v-for="item in ssjg"
				 :key="item.pid">
					<li>
						<img :src="decodeURIComponent(item.pimg).substring(7)" :alt="item.alt" />
						<div>
							<h3>{{item.pname}}</span></h3>
							<span>上次读到:第{{SectionToChinese(parseInt(item.pprice))}}章</span>
						</div>
					</li>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import {
		Checkbox
	} from 'element-ui'
	Vue.use(Checkbox)
	const cityOptions = ['上海', '北京', '广州', '深圳']
	export default {
		data() {
			return {
				// ssjg: [],
				checkedCities: [],
				checkAll: false,
				isIndeterminate: true,
				uid: ''
			}
		},
		computed: {
			ssjg () {
      return this.$store.state.user.ssjg
    }
		},
		methods: {
			clearlogin () {
				sessionStorage.clear()
				location.href = '/#/home'
			},
			bianji () {
				var bianji = document.querySelector('.bianji')
				if ( bianji.style.display == 'block'){
					bianji.style.display = 'none'
				} else if ( bianji.style.display == 'none'){
					bianji.style.display = 'block'
				}
				
			},
			handleAll(val) {
				this.checkedCities = val ? this.ssjg : [];
				this.isIndeterminate = false;
			},
			handleChecked(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.ssjg.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.ssjg.length;
			},
			deletea() {
				var pid = this.checkedCities[0].pid
				// console.log(this.checkedCities)
				this.checkedCities.map((c) => {
					// console.log(c.pid)
					axios({
						method:'post',
						url: 'http://jx.xuzhixiang.top/ap/api/goods/goods-delete.php', 
						params: {
							pid: c.pid
						}
					}).then(data => {
						console.log(data.data.msg)
						this.$store.dispatch('queryshu',this.uid)
					})
				})
			},
			SectionToChinese(section) {
				var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
				var chnUnitChar = ["", "十", "百", "千"];
				var strIns = '',
					chnStr = '';
				var unitPos = 0;
				var zero = true;
				while (section > 0) {
					var v = section % 10;
					if (v === 0) {
						if (!zero) {
							zero = true;
							chnStr = chnNumChar[v] + chnStr;
						}
					} else {
						zero = false;
						strIns = chnNumChar[v];
						strIns += chnUnitChar[unitPos];
						chnStr = strIns + chnStr;
					}
					unitPos++;
					section = Math.floor(section / 10);
				}
				return chnStr;
			}
			// ,
// 			queryshu() {
// 				fetch('http://jx.xuzhixiang.top/ap/api/productlist.php?uid=5614')
// 					.then(res => res.json())
// 					.then(data => {
// 						this.ssjg = data.data
// 						// console.log(data.data)
// 					})
// 			}
		},
		created() {
			var uid = sessionStorage.getItem('uid')
			if(uid){
				this.uid = uid
				// console.log(sessionStorage.getItem('uid'))
				this.$store.dispatch('queryshu',this.uid)
			} else {
				location.href = '/#/register'
			}
			
			// this.queryshu()
		},
		updated() { //.getAttribute('aria-checked')
			var checkbox = document.querySelectorAll('.el-checkbox')
			var sh = [...checkbox]
			var f = true
			sh.map((c) => {
				if(c.getAttribute('aria-checked') == 'true'){
					f = false
				}
			})
			// this.queryshu()
			if (f) {
				// console.log('刷新')
				// this.queryshu()
			} else {
				// console.log('不刷新')
			}
			
		}
	}
</script>

<style lang="scss">
	@import '@/lib/reset.scss';

	.content {
		@include flex();
		@include rect(100%, auto);
		@include overflow(hidden);

		.listt {
			padding: 2%;
			#bianji{
				color:#fff;
				font-size: 0.22rem;
				position: fixed;
				top:.05rem;
				right:.1rem;
			}
			.bianji{
				width:100%;
				min-height:1.5rem;
				.hetop{
					width: 100%;
					height: 0.4rem;
				}
				.el-checkbox-group{
					width:100%;
					min-height:1rem
				}
				.el-checkbox__inner::after{
					height: .13rem;
					left: .07rem;
				}
				.el-checkbox__inner{
					width: 0.2rem;
					height: 0.2rem;
				}
				.el-checkbox__label,.btn{
					font-size:.2rem ;
				}
				.el-checkbox__label{
					margin-bottom: 0.2rem;
				}
				.el-checkbox{
					margin:0.1rem 0.05rem;
					// float: left;
				}
				.btn{
					background: #E9E6D0;
					width: .6rem;
					float: right;
				}
			}
			li {
				display: flex;
				margin-top: 1%;
				height: 1rem;
				@include overflow(hidden);

				div {
					padding-left: 1.5em;
				}

				h3 {
					margin: .1rem 0;
					line-height: .3rem;
					width: 100%;
					font-size: .2rem;

					span {
						text-indent: 0;
					}
				}

				span {
					text-indent: 2em;
					font-size: .15rem;
					color: rgb(150, 131, 131);
				}
			}

			img {
				width: 25%;
				height: atuo;
			}
		}
	}
</style>
