import router from "@/routers/router";



/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
	next();
});

export default router;
