<template style="padding: 0px;">
	<div class="bg-color">
		<div class="left">
			<img :src="nav" alt="图片加载失败" style="width: 150px; margin-top: 8px;">
			<div class="el-icon-s-fold el-icon-color" @click="analysis"></div>
		</div>
		<div class="right">
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
			 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-submenu index="2">
					<template slot="title">
						<img :src="avatar" alt="图片加载失败" class="avatar">{{admin}}</template>
				</el-submenu>
			</el-menu>
			<el-dropdown>
				<span class="el-dropdown-link admin">
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>消息</el-dropdown-item>
					<el-dropdown-item>设置</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	import nav from '@/assets/nav/logo.png';
	import avatar from '@/assets/default.jpg';
	import { Admin } from '@/api/index.js';
	export default {
		data() {
			return {
				nav: nav,
				avatar: '',
				admin: '',
				activeIndex: '1',
			}
		},
		async created() { //获取登录的管理员的资料
			let id = sessionStorage.id;
			let { status, data } = await Admin.message({ id });
			if (status) {//赋值。把登录的管理员的头像与用户名显示在nav栏的最右边
				this.avatar = data.avatar;
				this.admin = data.username;
			}

		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			analysis() {
				this.$root.Bus.$emit("analysisClick", true);

			},

		},

	}
</script>

<style scoped>
	body {
		margin: 0;
		padding: 0;
	}

	.bg-color {
		display: flex;
		justify-content: space-between;
		background-color: #545c64 !important;
	}



	.bg-color {
		width: 100%;
		height: 60px;
		background-color: black;
	}

	.el-icon-color {
		color: white;
		font-size: 20px;
		position: absolute;
		top: 18px;
		left: 160px;
	}

	.right {
		width: 160px;
		color: white;
		font-size: 16px;
		padding: 0 10px;
	}

	.el-dropdown {
		margin-top: 10px !important;
	}

	.admin {
		display: block;
		font-size: 16px;
		width: 100px;
		color: white;
		margin-left: 20px;

	}

	.el-dropdown-menu {
		width: 200px;
		margin-top: 5px;
	}

	.avatar {
		width: 30px;
		border-radius: 50%;
		margin-right: 10px;
		padding: 10px;
	}
</style>
