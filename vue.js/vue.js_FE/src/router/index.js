import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import ImageSlider from '@/components/Slider'
import NotFound from '@/components/NotFound'
import ScrollActive from '@/components/ScrollActive'
import FullPage from '@/components/FullPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/version1',
      name: 'ScrollActive',
      component: ScrollActive
    },
    {
      path: '/version2',
      name: 'FullPage',
      component: FullPage
    },
    {
      path: '/#section-*',
      name: 'ScrollActive',
      component: ScrollActive
    },
    {
      path: '/Slider',
      name: 'ImageSlider',
      component: ImageSlider
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
