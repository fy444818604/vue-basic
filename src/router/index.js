import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const index = {
	path: "/",
	redirect: "/home",
	name: "index",
	component: (resolve) => {
		require(["../views/index/index"], resolve);
	},
	meta: {
		title: ''
	},
	children: [{
		path: "note",
		name: "note",
		component: (resolve) => {
			require(["../views/note/list"], resolve);
		},
		meta: {
			title: '笔记'
		},
	},{
		path: "home",
		name: "home",
		component: (resolve) => {
			require(["../views/home/home"], resolve);
		},
		meta: {
			title: '首页'
		},
	},{
		path: "component",
		name: "component",
		component: (resolve) => {
			require(["../views/demo/list"], resolve);
		},
		meta: {
			title: '组件'
		},
	},{
		path: "photos",
		name: "photos",
		component: (resolve) => {
			require(["../views/photos/list"], resolve);
		},
		meta: {
			title: '相册'
		},
	}]
}

const noteDetail = {
	path: "/detail/:id",
	component: (resolve) => {
		require(["../views/note/detail"], resolve);
	},
}

const router = new Router({
	base: "/",
	mode: 'history',
	routes: [
		index,
		noteDetail
	]
});

router.beforeEach((to, from, next) => {
	next();
})

export default router;
