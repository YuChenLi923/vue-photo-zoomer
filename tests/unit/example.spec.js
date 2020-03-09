import { expect } from 'chai'
import { mount } from '@vue/test-utils'
import VuePhotoZoomer from '@/index.vue'
import img from '../../src/assets/demo.jpg'

const BASE_PROPS = {
  url: img,
  zoomerStyle: {
    height: '200px',
    width: '200px',
    marginBottom: '20px'
  }
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
    zoomer.trigger('mouseenter')
    setTimeout(() => {
      const magnifier = zoomer.find('.vue-photo-zoomer_magnifier').element
      const viewer = zoomer.find('.vue-photo-zoomer_viewer').element
      expect({
        width: magnifier.offsetWidth * scale,
        height: magnifier.offsetHeight * scale
      }).to.deep.equal({
        width: viewer.offsetWidth,
        height: viewer.offsetHeight
      })
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
    const magnifier = wrapper.find('.vue-photo-zoomer_magnifier').element
    const viewer = wrapper.find('.vue-photo-zoomer_viewer').element
    expect(magnifier.style.display).to.deep.equal('none')
    expect(viewer.style.display).to.deep.equal('none')
    zoomer.trigger('mouseenter')
    setTimeout(() => {
      expect(magnifier.style.display).to.deep.equal('')
      expect(viewer.style.display).to.deep.equal('')
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
    const magnifier = wrapper.find('.vue-photo-zoomer_magnifier').element
    const viewer = wrapper.find('.vue-photo-zoomer_viewer').element
    zoomer.trigger('mouseenter')
    zoomer.trigger('mouseleave')
    setTimeout(() => {
      expect(magnifier.style.display).to.deep.equal('none')
      expect(viewer.style.display).to.deep.equal('none')
      done()
    })
  })
  it('mousemove', async () => {
    const scale = 3
    const ZOOMER_PAGE_X = 8
    const ZOOMER_PAGE_Y = 668
    const zoomer = mount(VuePhotoZoomer, {
      propsData: {
        test: true,
        scale,
        ...BASE_PROPS
      },
      attachToDocument: true
    })
    const image = zoomer.find('.vue-photo-zoomer_viewer_image').element
    zoomer.trigger('mouseenter')
    await zoomer.vm.$nextTick()
    zoomer.trigger('mousemove', {
      _pageY: ZOOMER_PAGE_Y + 80,
      _pageX: ZOOMER_PAGE_X + 100
    })
    await zoomer.vm.$nextTick()
    expect(image.style.marginTop).to.deep.equal(-(80 - 50) * scale + 'px')
    expect(image.style.marginLeft).to.deep.equal(-(100 - 50) * scale + 'px')
  })
})
