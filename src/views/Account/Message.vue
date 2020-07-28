<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>账户信息</span>
		</div>
		<el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="80px" class="demo-ruleForm">
			<el-form-item label="账户" prop="username">
				<el-input v-model="ruleForm.username" :disabled="true"></el-input>
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
			<el-form-item label="权限" prop="role_name">
				<el-select v-model="ruleForm.role_name" placeholder="请选择">
					<el-option v-for="item in permission" :key="item.id" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<single-upload :url="ruleForm.avatar" @success='handleUpload($event)' @remove='ruleForm.avatar=""'></single-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSave">修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>

</template>

<script>
	import { Admin } from "@/api/index.js";
	import { Permission } from '@/api/index.js';
	import SingleUpload from '@/components/UploadAvatar.vue';
	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				ruleForm: {
					username: '',
					fullname: '',
					sex: '',
					tel: '',
					role_name: '',
					avatar: ''
				},
				permission: [],
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

					avatar: []
				}
			};
		},
		async created() {
			//获取管理员的信息的id
			this.id = sessionStorage.id;
			this.loadingMessage(this.id);
			//获取管理员的权限select的一级分类
			let { status, data } = await Permission.list({ data });
			console.log(data);
			if (status) {
				// let data = data;
				this.permission = data;
			}

			console.log(this.permission);

		},
		methods: {
			async loadingMessage(id) {
				console.log(id);
				let { status, data } = await Admin.message({ id: id });
				if (status) {
					this.ruleForm = data;
				}

			},
			//保存数据
			async handleSave() {
				let { status, msg, data } = await Admin.upadmin({ ...this.ruleForm });
				if (status) {
					//提示用户编辑成功
					this.$message.success(msg);

				}
			},


			//头像上传成功
			handleUpload({ status, src }) {
				console.log(src);
				this.ruleForm.avatar = src;
			},
			//告诉父组件删除成功 ,上传图片的地址为空
			removeSuccess(value) {
				this.ruleForm.avatar = value;
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
		width: 100%;
	}

	.el-form {
		width: 70%;
		margin: 0 auto;
	}
</style>
