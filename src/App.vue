<template>
  <div class="demo">
    <h1 class="demo-title">DEMO</h1>
    <div class="zoomer-x">
      <VuePhotoZoomer
        :url="url"
      />
    </div>
  </div>
</template>

<script>
import VuePhotoZoomer from './index.vue'
import demoImg from './assets/demo.jpg'
export default {
  name: 'App',
  components: {
    VuePhotoZoomer
  },
  data () {
    return {
      demoImg,
      url: 'https://1cm.hk.chinamobile.com/images/onlineshop/product/8c23ac7f2a2168e150002174dfe3e478.jpg'
    }
  }
}
</script>
<style>
.demo-title {
  text-align: center;
}
.zoomer-x {
  margin-top: 100px;
  text-align: center;
}
</style>
