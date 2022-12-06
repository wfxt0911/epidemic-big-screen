import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";


const routes: RouteRecordRaw[] = [
	{
		path: "/",
		redirect: { name: "home" }
	},
	{
		path: "/home",
		name: "home",
		component: () => import("@/views/home/index.vue"),
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
	strict: false,
	// 切换页面，滚动到最顶部
	scrollBehavior: () => ({ left: 0, top: 0 })
});

export default router;
