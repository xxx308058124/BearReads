export default {
  state: {
    ssjg: [],
    qq: {}
  },
  getters: {

  },
  actions: { // 异步操作，请求数据
    getssjg (context, value) {
      fetch(`/zs/book/fuzzy-search?query=${value}&start=0&limit=10`)
        .then(res => res.json())
        .then(dataa => {
          console.log(dataa)
          context.commit('changessjg', dataa.books)
        })
    }
  },
  mutations: { // 唯一改变数据源的方式，可以在action中调用，也可以直接在组件内调用
    changessjg (state, data) {
      state.ssjg = data
    }
  }
}
