<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
				<template>
					<el-table-column prop="id" label="#" width="50">
					</el-table-column>
					<el-table-column label="头像" sortable width="130">
						<!-- <template scope="scope">
	 					<img :src="scope.row.avatar" alt="图片加载失败" width="50px" height="50px">
	 				</template> -->
						<template scope="scope">
							<img :src="scope.row.avatar" alt="图片加载失败" width="50px" height="50px" style="border-radius: 50%;">
						</template>
					</el-table-column>
					<el-table-column prop="username" label="账号" sortable width="140">
					</el-table-column>
					<el-table-column prop="fullname" label="姓名" sortable width="110">
					</el-table-column>
					<el-table-column prop="sex" label="性别" sortable width="80">
					</el-table-column>
					<el-table-column prop="tel" label="手机号" sortable width="110">
					</el-table-column>
					<el-table-column label="角色" prop="role_name" sortable width="120">
						<template scope='scope'>
							<el-tag type="">{{scope.row.role_name}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="login_time" label="上次登录" sortable width="140">
					</el-table-column>
					<el-table-column prop="login_count" label="登录次数" sortable width="100">
					</el-table-column>
					<el-table-column label="操作" width="180">
						<template scope="scope">
							<el-button type="primary" plain class="el-icon-edit" size="mini" @click="handleEdit(scope.row.id,scope.$index)">编辑</el-button>
							<el-button type="danger" plain class="el-icon-delete" size="mini" @click="remove(scope.row.id,scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</template>
			</el-table>
		</el-card>

		<template>
			<div class="back" v-show="isShow">
				<el-card class="box-card content">
					<div slot="header" class="clearfix">
						<span>修改信息</span>
						<i class="el-icon-close" style="float: right; cursor: pointer;" @click="isShow=false"></i>
					</div>
					<el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
						<el-form-item label="账户" prop="username">
							<el-input v-model="ruleForm.username"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="fullname">
							<el-input v-model="ruleForm.fullname"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="ruleForm.sex">
								<el-radio label="男"></el-radio>
								<el-radio label="女"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="手机号" prop="tel">
							<el-input v-model="ruleForm.tel"></el-input>
						</el-form-item>
						<el-form-item label="权限" prop="role">
							<el-select v-model="ruleForm.role" placeholder="请选择">
								<el-option v-for="item in permission" :key="item.id" :label="item.name" :value="item.id">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="头像" prop="avatar">
							<single-upload :url="ruleForm.avatar" @success='handleUpload($event)' @remove='ruleForm.avatar=""'></single-upload>
						</el-form-item>
						<el-form-item>
							<template scope='scope'>
								<el-button type="primary" @click='handleSave'>修改</el-button>
							</template>

						</el-form-item>
					</el-form>
				</el-card>
			</div>
		</template>
	</div>

</template>

<script>
	import { Admin } from '@/api/index.js';
	import { Permission } from '@/api/index.js';
	import SingleUpload from '@/components/UploadAvatar.vue';
	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				isShow: false,
				tableData: [],
				permission: [],
				id: 0,
				ruleForm: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					role_name: '',
					avatar: ''
				},
				rules: {
					fullname: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
					],
					sex: [
						{ required: true, message: '请选择一个性别', trigger: 'change' }
					],
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ type: 'string', required: true, pattern: /^1[3456789]\d{9}$/, trigger: 'change' }
					],
					role_name: [
						{ required: true, message: '请选择一个选项', trigger: 'change' }
					],
					avatar: []
				},

			};
		},
		async created() {
			//获取数据
			this.loadingList();
			//获取权限select
			let { status, data } = await Permission.list({ data });
			if (status) {
				this.permission = data;
			}
		},
		methods: {
			async loadingList() {
				let { status, data, total } = await Admin.list({ data });
				if (status) {
					this.tableData = data;
				}
			},
			//删除用户
			remove(id, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status, data } = await Admin.remove({ id });
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
			async handleEdit(id, index) {
				console.log(id, index)
				this.id = id;
				this.isShow = true;
				//获取管理员个人资料
				let { status, data } = await Admin.message({ id });
				if (status) {
					this.ruleForm = data;
					return id, index;
				}

			},
			//保存数据
			async handleSave() {
				console.log(this.id);
				let id = this.id;
				let { status, msg, data } = await Admin.upadmin({ id: id, ...this.ruleForm });
				if (status) {
					//提示用户编辑成功
					this.$message.success(msg);
					//重新获取后台的数据
					this.loadingList();
					//关闭弹层
					this.isShow = false;
				}
			},
			//头像上传成功
			handleUpload({ status, src }) {
				console.log(src);
				this.ruleForm.avatar= src;
			},
			//告诉父组件删除成功 ,上传图片的地址为空
			removeSuccess(value) {
				this.ruleForm.avatar = value;
			},
		}

	}
</script>

<style scoped>
	.back {
		background-color: rgba(0, 0, 0, 0.5);
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1000;
	}

	.content {
		width: 300px;
		padding: 20px;
		background-color: white;
		position: fixed;
		margin: 0 auto;
		top: 10vh;
		left: 30%;
	}

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

	.box-card.content {
		width: 600px;
	}
</style>
