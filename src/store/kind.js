export default {
  state: {
    zj: '',
    centent: '',
    mulu: []
  },
  getters: {

  },
  actions: { // 异步操作，请求数据
    getxiangq (context, id) {
      // console.log(id)
			return new Promise((resolve, reject) => {
				fetch(`/zs/mix-atoc/${id.id}?view=chapters`)// 返回章节列表
					.then(res => res.json())
					.then(data => {
						// console.log(data.mixToc.chapters)
						return data.mixToc.chapters
					}).then(link => {
						var enlink = encodeURIComponent(link[id.list].link)
						var zzj = link[id.list].title
						var mulu = link
						// console.log(encodeURIComponent(link))
						// 根据章节返回内容
						fetch(`http://chapter2.zhuishushenqi.com/chapter/${enlink}`)
							.then(res => res.json())
							.then(data => {
								// console.log(data.chapter.body)
								var cententt = data.chapter.body
								// console.log(zzj, cententt)
								context.commit('changekshu', {content: cententt, zj: zzj, mulu: mulu}),
								resolve()
							})
					})
				})
				
    }
  },
  mutations: { // 唯一改变数据源的方式，可以在action中调用，也可以直接在组件内调用
    changekshu (state, data) {
      state.centent = data.content
      state.zj = data.zj
      state.mulu = data.mulu
    }
  }
}
