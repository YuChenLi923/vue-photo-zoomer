<template>
  <div class="demo">
    <h1  class="demo-title">DEMO</h1>
    <div class="zoomer-x">
      <VuePhotoZoomer
        :url="demoImg"
        :zoomerStyle="{
          width: '100%',
          height: '100%'
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
  width: 530px;
  height: 300px;
  margin: auto;
  margin-top: 100px;
}
</style>
