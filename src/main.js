import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from "./router";
import './registerServiceWorker'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./App.scss";
import VueParticles from 'vue-particles'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueParticles);
Vue.use(ElementUI);

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
