import Vue from 'vue'
import App from './App.vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Core from '../core'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(PerfectScrollbar)
Vue.config.productionTip = false
const core = new Core([{ name: 'eventBus' }, { name: 'sdk' }]);
(async () => {
  await core.install()
  core.sdk.setOnMessage((e) => {
    const data = JSON.parse(e.data)
    if (core.sdk.firstMessage && core.sdk.lastUpdateId) {
      if (data.U <= core.sdk.lastUpdateId + 1 && data.u >= core.sdk.lastUpdateId + 1) {
        core.eventBus.$emit('recievedData', data)
        core.sdk.lastEventu = data.u
      }
    }
    if (data.U === core.sdk.lastEventu + 1) {
      core.eventBus.$emit('recievedData', data)
      core.sdk.lastEventu = data.u
    }
  })
  Vue.prototype.$core = core
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
})()
