export default {
  state: { // 页面需要的状态，原先需要在组件的data选项中定义
		ssjg: [],
  },
  getters: { // state中数据的计算属性---组件中的computed

  },
  actions: { // 异步操作，请求数据
		queryshu(context, uid) {
			fetch('http://jx.xuzhixiang.top/ap/api/productlist.php?uid='+uid)
				.then(res => res.json())
				.then(data => {
					var ssjg = data.data
					// console.log(zzj, cententt)
					context.commit('changekssjg', {ssjg: ssjg})
				})
		}
  },
  mutations: { // 唯一改变数据源的方式，可以在action中调用，也可以直接在组件内调用
		changekssjg (state, data) {
			state.ssjg = data.ssjg
		}
  }
}
