import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import router from "./router";
import './registerServiceWorker'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "./App.scss";
import VueParticles from 'vue-particles'
import * as api from './request/api.js'

import FormMaking from 'form-making'
import 'form-making/dist/FormMaking.css'

import Avue from '@smallwei/avue';
import '@smallwei/avue/lib/index.css';
import AvueFormDesign from '@sscfaith/avue-form-design'

Vue.use(Avue);
Vue.use(AvueFormDesign)

Vue.use(FormMaking)

Vue.prototype.$api = api;
Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueParticles);
Vue.use(ElementUI);

new Vue({
	router,
  render: h => h(App),
}).$mount('#app')
