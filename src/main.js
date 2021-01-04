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

import VueEpg from 'vue-epg' //引入组件

//定义并实例化 VueEpg 
const epg = new VueEpg({
	focus_class: 'focus',
	group_name: '.group',
	actions: ['number'], //自定义的方法，在 组件中需指定，名称对应大写的 KeyActions 的Key 如 number 对应  NUMBER
	setKeyBoardEventListener: service => {
		//这里设置各事件监听
		//方向 上下左右必须监听  可绑定多个值 
		document.addEventListener("keydown", event => {
			const keyCode = event.keyCode ? event.keyCode : event.charCode ? event.charCode : event.which;
			service.keyActions.UP.push(...[19, 38]) //数组中的值响应 按下上键的事件
			service.keyActions.DOWN.push(...[20, 47, 40])
			service.keyActions.LEFT.push(...[29, 21, 37])
			service.keyActions.RIGHT.push(...[22, 32, 39])
			service.keyActions.ENTER.push(...[73, 66, 23]) //类似Click 点击
			service.keyActions.BACK.push(...[4, 27])
			service.keyActions.NUMBER = [49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 96, 97, 98, 99, 100, 101, 102, 103, 104,
				105
			] //绑定为数字键
			service.eventHandler(keyCode) //注册响应
		})
	}
})

// //vue 绑定 epg 实例
Vue.use(epg)


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

