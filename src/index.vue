<template>
  <div class="vue-photo-zoomer"
       :style="zoomerStyle"
       @mouseenter="onMouseenter"
       @mousemove="onMousemove"
       @mouseleave="visiable = false"
       ref="zoomer">
    <img
      class="vue-photo-zoomer_image"
      :src="url"
    />
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
    zoomerStyle: {
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
      unit: 'px'
    }
  },
  mounted () {
    const zoomerPos = this.$refs.zoomer.getBoundingClientRect()
    this.zoomerPos = zoomerPos
    this.viewerImgStyle.width = zoomerPos.width * this.scale +
                                this.unit
    this.viewerImgStyle.height = zoomerPos.height * this.scale +
                                 this.unit
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
    onMouseenter (e) {
      this.setMagnifierPos(e)
      this.visiable = true
      this.$nextTick(() => {
        const magnifier = this.$refs.magnifier.getBoundingClientRect()
        this.magnifierSize = magnifier
        this.viewerSize = {
          width: magnifier.width * this.scale + this.unit,
          height: magnifier.height * this.scale + this.unit
        }
      })
    },
    onMousemove (e, options) {
      this.setMagnifierPos(e)
      if (!this.visiable) {
        this.visiable = true
      }
    }
  }
}
</script>

<style src="./style.scss" lang="scss"></style>
