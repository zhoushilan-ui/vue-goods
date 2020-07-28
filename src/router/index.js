import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/components/Layout.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/login',
		alias: '/',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
		// meta: { requiresAuth: false },
	},
	{
		path: '/register',
		name: 'Register',
		component: () => import('@/views/Register.vue'),
		// meta: { requiresAuth: false },
	},
	//商品列表
	{
		path: '/goods/',
		name: 'Goods',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'GoodsList',
			component: () => import('@/views/Goods/List.vue')
		}, {
			path: 'category',
			name: 'GoodsCategory',
			component: () => import('@/views/Goods/Category.vue')
		}, {
			path: 'release',
			name: 'GoodsRelease',
			component: () => import('@/views/Goods/Release.vue')
		}, {
			path: 'edit/:id',
			name: 'GoodsEdit',
			component: () => import('@/views/Goods/Edit.vue')
		}, ]
	},
	//订单管理
	{
		path: '/order/',
		name: 'Order',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'OrderList',
			component: () => import('@/views/Order/List.vue')
		}]
	},
	//账户信息
	{
		path: '/account/',
		name: 'Account',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'message',
			name: 'AccountMessage',
			component: () => import('@/views/Account/Message.vue')
		}],
	},
	//用户列表
	{
		path: '/admin/',
		name: 'Admin',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'list',
			name: 'AdminList',
			component: () => import('@/views/Admin/List.vue')
		}]
	},
	//权限设置
	{
		path: '/permission/',
		name: 'Permission',
		component: Layout,
		meta: { requiresAuth: true },
		children: [{
			path: 'role',
			name: 'PermissionRole',
			component: () => import('@/views/Permission/Role.vue')
		}, {
			path: 'menu',
			name: 'PermissionMenu',
			component: () => import('@/views/Permission/Menu.vue'),
		}, {
			path: 'config',
			name: 'PermissionConfig',
			component: () => import('@/views/Permission/Config.vue')
		}]
	}
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
	routes
})


//全局守卫导航

router.beforeEach((to, form, next) => {
	//如果页面是登录和注册的话 不需要验证 直接放行
	let isRequireAuth = to.matched.some((path) => path.meta.requiresAuth);
	if (!isRequireAuth) {
		next();
		return;
	}

	let token = sessionStorage.token; //获取token
	//有token，直接放行
	if (token) {
		next();
		return;
	}
	//没有token,提示用户
	Message.error('无效的token，请重新登录！');
	//自动跳转登录页面
	setTimeout(function() {
		next(`/login?redirect=${to.path}`);
	}, 2000);
})
export default router
