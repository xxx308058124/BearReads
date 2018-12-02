<template>
  <div class="content">
    <div class="conten">
      <img src="../../build/xiaoxiong.jpg" alt="小熊看书">
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
	created () {
		Indicator.open('加载中...')
		setTimeout(() => {
		  Indicator.close()
		  location.href = '/#/home'
		}, 3000)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.conten{
  overflow: hidden;
  width: 100%;
  height:100%;
  background: #eab476
}
.conten img{
  display: block;
  margin: 50% auto;
}
</style>
