<template>
  <div class="zoomer-x">
    <VuePhotoZoomer
      :url="demoImg"
    />
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
.zoomer-x {
  width: 300px;
  height: 300px;
  margin: 40px;
}
</style>
