<template>
  <div class="vue-photo-zoomer"
       @mouseenter="onMouseenter"
       @mousemove="onMousemove"
       @mouseleave="visiable = false"
       ref="zoomer">
    <img
      class="vue-photo-zoomer_image"
      :src="url"
      ref="img"
      @load="onLoadImage"
    />
    <div class="vue-photo-zoomer_loading"
         v-if="loading">
      <slot name="loading">
      </slot>
    </div>
    <div class="vue-photo-zoomer_magnifier"
         v-show="visiable"
         :style="{
           ...magnifierStyle,
           ...magnifierPos
          }"
         ref="magnifier">
    </div>
    <div
      v-show="visiable"
      class="vue-photo-zoomer_viewer"
      :style="{
        ...viewerStyle,
        ...viewerSize
      }">
      <img :src="urlFull || url"
           class="vue-photo-zoomer_viewer_image"
           :style="viewerImgStyle"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      default: ''
    },
    urlFull: {
      type: String,
      default: ''
    },
    viewerStyle: {
      type: Object,
      default: () => {}
    },
    magnifierStyle: {
      type: Object,
      default: () => ({
        width: '100px',
        height: '100px'
      })
    },
    scale: {
      type: Number,
      default: 2
    },
    test: { // 用于单元测试
      type: Boolean,
      default: () => false
    }
  },
  data () {
    return {
      visiable: false,
      magnifierPos: { top: 0, left: 0 },
      zoomerPos: {},
      magnifierSize: {},
      viewerSize: {},
      viewerImgStyle: {},
      preMousePos: null,
      unit: 'px',
      loading: true
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
  },
  destroyed () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    setMagnifierPos (e) {
      const {
        zoomerPos,
        magnifierSize,
        unit,
        scale
      } = this
      const pageY = this.test ? (e._pageY || e.pageY) : e.pageY
      const pageX = this.test ? (e._pageX || e.pageX) : e.pageX
      this.preMousePos = { pageY, pageX }
      let top = pageY - zoomerPos.top - magnifierSize.height / 2
      let left = pageX - zoomerPos.left - magnifierSize.width / 2
      top = Math.min(Math.max(0, top), zoomerPos.height - magnifierSize.height)
      left = Math.min(Math.max(0, left), zoomerPos.width - magnifierSize.width)
      this.magnifierPos = {
        top: top + unit,
        left: left + unit
      }
      this.viewerImgStyle.marginTop = -top * scale + unit
      this.viewerImgStyle.marginLeft = -left * scale + unit
    },
    setviewerSize () {
      const magnifier = this.$refs.magnifier.getBoundingClientRect()
      this.magnifierSize = magnifier
      this.viewerSize = {
        width: magnifier.width * this.scale + this.unit,
        height: magnifier.height * this.scale + this.unit
      }
    },
    setZoomerPos () {
      const zoomerRect = this.$refs.zoomer.getBoundingClientRect()
      this.zoomerPos = {
        height: zoomerRect.height,
        width: zoomerRect.width,
        top: zoomerRect.top + window.pageYOffset,
        left: zoomerRect.left + window.pageXOffset
      }
    },
    onResize (e) {
      this.setZoomerPos()
    },
    onMouseenter (e) {
      if (this.loading) {
        return
      }
      this.setMagnifierPos(e)
      this.visiable = true
      this.$nextTick(() => {
        this.setviewerSize()
      })
    },
    onMousemove (e, options) {
      if (this.loading) {
        return
      }
      this.setMagnifierPos(e)
      if (!this.visiable) {
        this.visiable = true
        this.$nextTick(() => {
          this.setviewerSize()
        })
      }
    },
    onLoadImage () {
      const image = this.$refs.img
      this.loading = false
      this.viewerImgStyle.width = image.offsetWidth * this.scale +
                                  this.unit
      this.viewerImgStyle.height = image.offsetHeight * this.scale +
                                  this.unit
      this.viewerSize.background = getComputedStyle(this.$refs.zoomer).background
      this.setZoomerPos()
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
