<template>
	<el-container>
		<el-header style="padding: 0px;">
			<NavBar></NavBar>
		</el-header>
		<el-container>
			<el-aside width="200px">
				<!-- 菜单 -->
				<LeftMenu></LeftMenu>
			</el-aside>
			<el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
	
	
	
</template>

<script>
	import LeftMenu from '@/components/LeftMenu.vue'
	import NavBar from '@/components/NavBar.vue'
	//注册
	export default{
		components:{
			NavBar,
			LeftMenu
		}
	}
</script>

<style>
</style>
