<template>
	<div class="back-menu">
		<el-row class="tac">
			<el-menu default-active="2" class="el-menu-vertical-demo" :router="true" @open="handleOpen" @close="handleClose"
			 background-color=" rgb(51, 78, 102)" text-color="#fff" active-text-color="#ffd04b" :collapse="isCollapse">
				<el-submenu index="1">
					<template slot="title">
						<i class="el-icon-goods"></i>
						<span>商品管理</span>
					</template>
					<template>
						<el-menu-item index="/goods/category">商品分类</el-menu-item>
					</template>
					<template>
						<el-menu-item index="/goods/release">发布商品</el-menu-item>
					</template>
					<template>
						<el-menu-item index="/goods/list">商品列表</el-menu-item>
					</template>
				</el-submenu>
				<el-submenu index="2">
					<template slot="title">
						<i class="el-icon-files"></i>
						<span>订单管理</span>
					</template>
					<template>
						<el-menu-item index="/order/list">订单列表</el-menu-item>
					</template>
				</el-submenu>
				<el-submenu index="3">
					<template slot="title">
						<i class="el-icon-setting"></i>
						<span>账户管理</span>
					</template>
					<template>
						<el-menu-item index="/account/message">账户信息</el-menu-item>
					</template>
				</el-submenu>
				<el-submenu index="4">
					<template slot="title">
						<i class="el-icon-user"></i>
						<span>用户管理</span>
					</template>
					<template>
						<el-menu-item index="/admin/list">用户列表</el-menu-item>
					</template>
				</el-submenu>
				<el-submenu index="5">
					<template slot="title">
						<i class="el-icon-set-up"></i>
						<span>权限设置</span>
					</template>
					<template>
						<el-menu-item index="/permission/role">用户角色</el-menu-item>
					</template>
					<template>
						<el-menu-item index="/permission/menu">菜单权限</el-menu-item>
					</template>
				</el-submenu>
			</el-menu>
		</el-row>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isCollapse: false,
			};
		},
		mounted() {
			const self = this;
			this.$root.Bus.$on('analysisClick', function(msg) {
				self.isCollapse=msg;
			});
		},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>

<style scoped>
	.back-menu {
		height: 100%;
	}

	.el-menu {
		height: 100vh;
	}
</style>
