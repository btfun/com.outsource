import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/word',
      name: 'word',
      // component: index,
      component: resolve => require(['@/components/word'],resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    }
  ]
})
