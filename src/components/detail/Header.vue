<template>
    <mt-header title="书 籍 详 情" style="font-size:.2rem;">
        <mt-button @click="back" slot="left" icon="back"></mt-button>
    </mt-header>
</template>

<script>
import Vue from 'vue'
import { Header } from 'mint-ui'
Vue.use(Header)
export default {
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
