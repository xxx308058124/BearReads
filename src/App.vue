<template>
  <div class="container">
    <router-view name="header"></router-view>
    <router-view></router-view>
    <router-view name="footer"></router-view>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  components: {
    'my-footer': Footer
  }
}
</script>

<style lang="scss">
</style>
