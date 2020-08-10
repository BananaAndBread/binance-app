import Vue from 'vue'
import App from './App.vue'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import router from "./router"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


Vue.use(PerfectScrollbar)
Vue.config.productionTip = false
import Core from "../core";
const core = new Core([{name: 'eventBus'}, {name: 'sdk'}])
// eslint-disable-next-line no-unused-vars
import EventBus from "../plugins/eventBus";
  // eslint-disable-next-line no-unused-vars,no-unexpected-multiline
(async () => {
  await core.install()
  core.sdk.setOnMessage((e) => {
    const data = JSON.parse(e.data)
    core.eventBus.$emit("recievedData", data )
  })
  Vue.prototype.$core = core
  new Vue({
    router,
    render: h => h(App),
  }).$mount('#app')
})()
