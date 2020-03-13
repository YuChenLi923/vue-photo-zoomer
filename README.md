# vue-photo-zoomer

[![Build Status](https://www.travis-ci.org/YuChenLi923/vue-photo-zoomer.svg)](https://www.travis-ci.org/YuChenLi923/vue-photo-zoomer)

[![Coverage Status](https://coveralls.io/repos/github/YuChenLi923/vue-photo-zoomer/badge.svg)](https://coveralls.io/github/YuChenLi923/vue-photo-zoomer) 

基于vue2.x设计的图片放大镜组件。


## DEMO

```vue
<template>
    <div class="zoomer-x">
        <VuePhotoZoomer
            :url="demoImg"
            :zoomerStyle="{
            width: '100%',
            height: '100%'
            }"
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
  width: 530px;
  height: 300px;
}
</style>

```
[示例](https://yuchenli923.github.io/vue-photo-zoomer/demo/index.html)

## API


参数 | 说明 | 类型 | 默认值
--- | --- | --- | ---
 `url` | 图片的URL | String | -
 `urlFull` | 放大后的图片URL  | String | `url`
 `scale` | 放大倍数 | Number | 2
 `unit` | 计算单位 | String | `'px'`
 `magnifierStyle` | 放大镜的样式 | Object | -  
 `viewerStyle` | 观察区域的样式 | Object | -