import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello'
import Login from '../components/Login.vue'
import NotFound from '../components/404.vue'

// import word from '@/components/word'
// import index from '@/components/index/index'

Vue.use(Router)

//路由配置文件
export default new Router({
  routes: [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/word',
      name: 'word',
      // component: index,
      component: resolve => require(['../components/word'],resolve),
      meta: {
        keepAlive: true // 需要被缓存
      }
    },
    {
      path: '/index',
      name: 'index',
      // component: index,
      component: resolve => require(['../components/index/index'],resolve),
      meta: {
        keepAlive: false // 需要被缓存
      }
    }
  ]
})
