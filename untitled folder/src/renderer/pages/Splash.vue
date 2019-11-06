<template>
  <div
    class="fixed-page"
    style="background: white">
    <div
      id="splash-container"
      class="hero-xy"
      style="height: 200px; width: auto;" />
    <img
      class="hero-bottom"
      center
      :src="logo"
      style="margin: 0 0 40px 20px; height: 40px; width: auto;">
  </div>
</template>

<script>
import logo from '@/assets/logo.png'

const animationDataExchange = require('@/assets/lottie/4949-loading-circle-gradient.json')
const lottie = require('lottie-web')

export default {
  data () {
    return {
      logo,
      animationObj: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.animationObj = lottie.loadAnimation({
        container: document.getElementById('splash-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationDataExchange
      })
      const waitTime = setInterval(() => {
        this.$router.replace('/on-board')
        clearInterval(waitTime)
      }, 5000)
    })
  }
}
</script>
