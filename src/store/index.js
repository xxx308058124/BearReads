import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import kind from './kind'
import cart from './cart'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    home, // home: home
    kind, // kind: kind
    cart, // cart: cart
    user
  }
})

export default store
