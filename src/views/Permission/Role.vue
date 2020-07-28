<template>
	<div class="back-card">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户角色</span>
				<el-button style="float: right; padding: 3px 0" type="text" class="el-icon-circle-plus-outline" @click="handleAdd">添加角色</el-button>
			</div>
			<template>
				<el-table :data="tableData" style="width: 100%">
					<el-table-column type="index" prop="id" label="#" width="100">
					</el-table-column>
					<el-table-column prop="name" label="角色" width="100" v-model="form.name">
						<template scope="scope">
							<el-tag>{{scope.row.name}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template scope="scope">
							<el-button type="primary" plain icon="el-icon-edit" size="mini" @click="openAdminModal(scope.row,scope.$index)"></el-button>
							<el-button type="danger" plain icon="el-icon-delete" size="mini" @click="remove(scope.row.id,scope.$index)"></el-button>
							<el-button type="primary" plain icon="el-icon-setting" size="mini" @click="open(scope.row.id,scope.$index)"></el-button>
						</template>
					</el-table-column>
				</el-table>
			</template>
		</el-card>
		<div v-show="isShow">
			<el-card class="box-card" style="height: 180px; width: 700px; margin: 20px 0px;" v-for="(item,index) in tableMenu">
				<div slot="header" class="clearfix">
					<i class="el-icon-collection-tag" style="color: #409EFF;"></i>
					<span style="color: #409EFF;">{{item.name}}</span>
					<el-switch v-model="item.checked" style="position: absolute; right: 40px;" @click="handleAllChecked(item)">
					</el-switch>
				</div>
				<div v-for="items in tableMenu[index].children" :key="items.id" style="margin: 10px 0px;">
					<span>{{items.name}}</span>
					<el-switch v-model="items.checked" style="position: absolute; right: 40px;" @click="handleCheced(item,index)">
					</el-switch>
				</div>
			</el-card>
		</div>
	</div>

</template>

<script>
	import { Permission } from '@/api/index.js';
	export default {
		data() {
			return {
				isShow: false,
				tableMenu: [],
				checked: false,
				form: {
					id: '',
					name: ''
				},
				tableData: []
			};
		},
		created() {
			//获取数据
			this.loadingList();
		},
		methods: {
			async loadingList() {
				let { status, data } = await Permission.list({ data });
				if (status) {
					this.tableData = data;
				}
			},
			//获取点击设置后右边的菜单栏的数据
			async handleAllChecked(item) {
				console.log("sss");
				console.log(item);
				// let {status,data}=await Permission.removemenu({id,menu_id});
				// if(status){
				// 	data.children.checked=true;
				// }
				
			},
			handleCheced(item,index){
				
			},
			async open(id, index) {
				this.isShow = true;
				console.log(sessionStorage.id);
				console.log(id,index);
				let { status, data } = await Permission.idmenu({ id });
				if (status) {
					console.log(data);
					this.tableMenu = data;
				}
			},
			//添加角色
			handleAdd() {
				this.$prompt('请填写角色的名称', "添加角色", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputErrorMessage: '名称的格式不正确'
				}).then(async ({ value }) => {
					console.log(value);
					let { status } = await Permission.role({ name: value });
					console.log(status);

					if (status) {
						console.log(222)
						this.tableData.push({ name: value, ...data });
						this.$message.success('添加成功');
					}
				}).catch(() => {
					this.$message.error("取消添加");
				});
			},
			//删除角色
			remove(id, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status } = await Permission.remove({ id });
					console.log(status);
					if (status) {
						this.tableData.splice(index, 1);
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			//编辑角色
			openAdminModal(data, index) {
				this.$prompt('请修改角色的名称', "修改角色", {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /\S/,
					inputValue: data.name,
					inputErrorMessage: '名称的格式不正确'
				}).then(async ({ value }) => {
					let { status } = await Permission.edit(data.id, value);
					console.log(123);
					if (status) {
						data.name = value;
						this.$message.info('修改成功');
					}
				}).catch(() => {
					this.$message.error("修改失败");
				});
			},
		}

	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}

	.box-card {
		width: 520px;
	}

	.back-card {
		display: flex;
		justify-content: space-between;
	}
</style>
