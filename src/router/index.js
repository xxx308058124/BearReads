import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Footer from '@/components/Footer'
// import Header from '@/components/Header'
import HomeHeader from '@/components/home/Header'
// import KindHeader from '@/components/kind/Header'
import UserHeader from '@/components/user/Header'
import CartHeader from '@/components/cart/Header'
import DetailHeader from '@/components/detail/Header'
import Home from '@/components/home/index'
import Kind from '@/components/kind/index'
import Cart from '@/components/cart/index'
import User from '@/components/user/index'
import Detail from '@/components/detail/index'
import Ward from '@/components/ward/index'
import Register from '@/components/ward/register'
import '../main.scss'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: {
        // header: Header,
        default: HelloWorld
      }
    },
		{
			path: '/ward',
			name: 'ward',
			components: {
				default: Ward
			}
		},
		{
			path: '/register',
			name: 'register',
			components: {
				default: Register
			}
		},
    {
      path: '/detail/:id',
      name: 'detail',
      components: {
        header: DetailHeader,
        default: Detail
      }
    },
    {
      path: '/home',
      name: 'home',
      components: {
        header: HomeHeader,
        footer: Footer,
        default: Home
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        header: CartHeader,
        footer: Footer,
        default: Cart
      }
    },
    {
      path: '/kind/:id',
      name: 'kind',
      components: {
        default: Kind
      }
    },
    {
      path: '/user',
      name: 'user',
      components: {
        header: UserHeader,
        footer: Footer,
        default: User
      }
    }
  ]
})
