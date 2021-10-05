import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import { BootstrapVue} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import firebase from 'firebase/app';
import "firebase/auth";


Vue.use(BootstrapVue)

Vue.prototype.$http = axios
Vue.config.productionTip = false


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
