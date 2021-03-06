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
	}, {
		path: "home",
		name: "home",
		component: (resolve) => {
			require(["../views/home/home"], resolve);
		},
		meta: {
			title: '首页'
		},
	}, {
		path: "component",
		name: "component",
		component: (resolve) => {
			require(["../views/demo/list"], resolve);
		},
		meta: {
			title: '组件'
		},
	}, {
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

const componentDetail = {
	path: "/component/detail/1",
	component: (resolve) => {
		require(['../components/demo/detail1'], resolve);
	},
}

const componentDetail1 = {
	path: "/component/detail/2",
	component: (resolve) => {
		require(['../components/demo/detail2'], resolve);
	},
}

const componentDetail2 = {
	path: "/component/detail/3",
	component: (resolve) => {
		require(['../components/demo/detail3'], resolve);
	},
}

const componentDetail3 = {
	path: "/component/detail/4",
	component: (resolve) => {
		require(['../views/tv/index'], resolve);
	},
	redirect:'/component/detail/4/active',
	children:[{
		path: "active",
		name: "active",
		component: (resolve) => {
			require(["../views/tv/active-list"], resolve);
		}
	},{
		path: "live",
		name: "live",
		component: (resolve) => {
			require(["../views/tv/live"], resolve);
		}
	}]
}

const tvPerson = {
	path: "/person",
	name:"person",
	component: (resolve) => {
		require(['../views/tv/person'], resolve);
	},
}

const test = {
	path:"/test",
	name: "test",
	component: (resolve) => {
		require(['../views/test'], resolve)
	}
}

const router = new Router({
	base: "/",
	mode: 'history',
	routes: [
		index,
		noteDetail,
		componentDetail,
		componentDetail1,
		componentDetail2,
		componentDetail3,
		tvPerson,
		test
	]
});

router.beforeEach((to, from, next) => {
	next();
})

export default router;
