<template>
  <div class="demo">
    <h1 class="demo-title">DEMO</h1>
    <div class="zoomer-x">
      <VuePhotoZoomer
        :url="demoImg"
        :style="{
          width: '500px'
        }"
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
      demoImg
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
