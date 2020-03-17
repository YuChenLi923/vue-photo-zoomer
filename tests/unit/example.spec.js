import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import VuePhotoZoomer from '@/index.vue'
import img from './test.jpeg'
const IMAGE_WIDTH = 200
const IMAGE_HEIGHT = 200
const BASE_PROPS = {
  url: img,
  style: `height: ${IMAGE_HEIGHT}px;width: ${IMAGE_WIDTH}px; margin-bottom: 20px`
}

describe('vue-photo-zoomer', () => {
  it('props.scale', (done) => {
    const scale = 3
    const zoomer = mount(VuePhotoZoomer, {
      propsData: {
        scale,
        ...BASE_PROPS
      },
      attachToDocument: true
    })
    const image = zoomer.find('.vue-photo-zoomer_image').element
    const magnifier = zoomer.find('.vue-photo-zoomer_magnifier').element
    const viewer = zoomer.find('.vue-photo-zoomer_viewer').element
    image.addEventListener('load', async () => {
      zoomer.trigger('mouseenter')
      await zoomer.vm.$nextTick()
      expect({
        width: magnifier.offsetWidth * scale,
        height: magnifier.offsetHeight * scale
      }).to.deep.equal({
        width: viewer.offsetWidth,
        height: viewer.offsetHeight
      })
      zoomer.destroy()
      done()
    })
  })
  it('mouseenter', (done) => {
    const scale = 3
    const wrapper = mount(VuePhotoZoomer, {
      propsData: {
        scale,
        ...BASE_PROPS
      },
      attachToDocument: true
    })
    const zoomer = wrapper.find('.vue-photo-zoomer')
    const image = zoomer.find('.vue-photo-zoomer_image').element
    const magnifier = wrapper.find('.vue-photo-zoomer_magnifier').element
    const viewer = wrapper.find('.vue-photo-zoomer_viewer').element

    image.addEventListener('load', async () => {
      expect(magnifier.style.display).to.deep.equal('none')
      expect(viewer.style.display).to.deep.equal('none')
      zoomer.trigger('mouseenter')
      await zoomer.vm.$nextTick()
      expect(magnifier.style.display).to.deep.equal('')
      expect(viewer.style.display).to.deep.equal('')
      zoomer.destroy()
      done()
    })
  })
  it('mouseleave', (done) => {
    const scale = 3
    const wrapper = mount(VuePhotoZoomer, {
      propsData: {
        scale,
        ...BASE_PROPS
      },
      attachToDocument: true
    })
    const zoomer = wrapper.find('.vue-photo-zoomer')
    const image = zoomer.find('.vue-photo-zoomer_image').element
    const magnifier = wrapper.find('.vue-photo-zoomer_magnifier').element
    const viewer = wrapper.find('.vue-photo-zoomer_viewer').element
    image.addEventListener('load', async () => {
      zoomer.trigger('mouseenter')
      await zoomer.vm.$nextTick()
      zoomer.trigger('mouseleave')
      await zoomer.vm.$nextTick()
      expect(magnifier.style.display).to.deep.equal('none')
      expect(viewer.style.display).to.deep.equal('none')
      zoomer.destroy()
      done()
    })
  })
  it('mousemove', async () => {
    const scale = 3
    const ZOOMER_PAGE_X = 8
    const ZOOMER_PAGE_Y = 8
    const OFFSET_X = 10
    const OFFSET_Y = 10
    const zoomer = mount(VuePhotoZoomer, {
      propsData: {
        test: true,
        scale,
        ...BASE_PROPS
      },
      attachToDocument: true
    })
    const image = zoomer.find('.vue-photo-zoomer_image').element
    const viewerImage = zoomer.find('.vue-photo-zoomer_viewer_image').element
    image.addEventListener('load', async () => {
      zoomer.trigger('mouseenter')
      await zoomer.vm.$nextTick()
      zoomer.trigger('mousemove', {
        _pageY: ZOOMER_PAGE_Y + 50 + OFFSET_Y,
        _pageX: ZOOMER_PAGE_X + 50 + OFFSET_X
      })
      await zoomer.vm.$nextTick()
      expect(viewerImage.style.marginTop).to.deep.equal(-OFFSET_Y * scale + 'px')
      expect(viewerImage.style.marginLeft).to.deep.equal(-OFFSET_X * scale + 'px')
      zoomer.destroy()
    })
  })
})
