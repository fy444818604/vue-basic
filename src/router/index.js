import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const index = {
	path: "/",
	name: "index",
	component: (resolve) => {
		require(["../views/index/index"], resolve);
	},
	meta: {
		title:'首页'
	}
}

const router = new Router({
	base: "/",
	mode: 'history',
	routes:[
		index
	]
});

router.beforeEach((to, from, next) => {
	next();
})

export default router;