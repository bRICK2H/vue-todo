import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import '@/assets/scss/_general.scss'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')