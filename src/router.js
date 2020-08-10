import VueRouter from 'vue-router'
import Vue from 'vue'
const FirstPage = () => import('./pages/FirstPage')
const SecondPage = () => import('./pages/SecondPage')
Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {path: '/', component: FirstPage},
    {path: '/diffs', component: SecondPage}
  ]
})

