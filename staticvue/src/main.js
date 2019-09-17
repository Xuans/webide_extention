import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import './theme/index.css';
import router from './router';
import axios from 'axios';

Vue.prototype.$axios=axios;

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
