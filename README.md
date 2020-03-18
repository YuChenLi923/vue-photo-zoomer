# vue-photo-zoomer

[![Build Status](https://www.travis-ci.org/YuChenLi923/vue-photo-zoomer.svg)](https://www.travis-ci.org/YuChenLi923/vue-photo-zoomer)
[![Coverage Status](https://coveralls.io/repos/github/YuChenLi923/vue-photo-zoomer/badge.svg)](https://coveralls.io/github/YuChenLi923/vue-photo-zoomer) 
[![license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://mit-license.org/) 
[![language](https://img.shields.io/badge/language-Vue2-brightgreen.svg)](https://www.npmjs.com/package/v-viewer)

基于vue2.x设计的图片放大镜组件。


## DEMO

```vue
<template>
  <div class="zoomer-x">
    <VuePhotoZoomer
      :url="demoImg"
      :style="{
        width: '500px'
      }"
    />
  </div>
</template>

<script>
import VuePhotoZoomer from 'vue-photo-zoomer'
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
  text-align: center;
}
</style>

```
[示例](https://yuchenli923.github.io/vue-photo-zoomer/demo/index.html)

## Props

参数 | 说明 | 类型 | 默认值
--- | --- | --- | ---
 `url` | 图片的URL | String | -
 `urlFull` | 放大后的图片URL  | String | `url`
 `scale` | 放大倍数 | Number | 2
 `viewerStyle` | 观察区域的样式 | Object | -
 `magnifierStyle` | 放大镜的样式 | Object | -

 ## Slots

 名称 | 说明 |
 --- | --- |
  `loading` | 图片加载时的内容 |