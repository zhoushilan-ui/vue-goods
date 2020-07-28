<template>
	<div class="back">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<el-input v-model="ruleForm.username" prefix-icon="el-icon-user" placeholder="账户名称在3到15个字符"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password" prefix-icon="el-icon-key" placeholder="密码至少在三位数字!"></el-input>
				</el-form-item>
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="ruleForm.fullname" prefix-icon="el-icon-postcard" placeholder="请填写真实的姓名"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="ruleForm.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model="ruleForm.tel" prefix-icon="el-icon-mobile-phone" placeholder="请填写常用的手机号码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-checkbox v-model="ruleForm.checked">请同意本站用户同意协议</el-checkbox>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
				</el-form-item>
				<div class="link">
					<router-link to="/">登录用户</router-link>
					<a href="#">忘记密码?</a>
				</div>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { Admin } from '@/api/index.js';
	export default {
		data() {
			return {
				ruleForm: {
					username: '',
					password: '',
					fullname: '',
					sex: '男',
					tel: '',
					checked: true,
				},
				rules: {
					username: [
						{ required: true, message: '请输入账户', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 3, max: 15, message: '密码至少三位', trigger: 'blur' }
					],
					fullname: [
						{ required: true, message: '请输入姓名', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					sex: [{ required: true, message: '请选择一个性别', trigger: 'change' }],
					tel: [
						{ required: true, message: '请输入手机号', trigger: 'blur' },
						{ min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
					],
					checked: [{ type: 'array', required: true, message: '请同意用户协议', trigger: 'change' }]
				}
			}
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, data, msg } = await Admin.register({ ...this.ruleForm });
						if (status) {
							//提示用户注册成功
							this.$message.success(msg);
							//保存token
							sessionStorage.id = data.id;
							sessionStorage.token = data.token;
							sessionStorage.role = data.role;
							//跳转页面
							this.$router.replace('/goods/list');
						}
					} else {
						this.$message.info(msg);
						return false;
					}
				});
			},
		}
	}
</script>
<style scoped>
	body {
		margin: 0;
		padding: 0;
	}

	.back {
		background: url(../assets/login-bg.jpg) top center no-repeat;
		background-size: cover;
		width: 100%;
		height: 100vh;
	}

	/* card卡 */
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
		width: 360px;
		position: absolute;
		right: 100px;
		top: 100px;
	}

	.link {
		display: inline-block;
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 5px;
	}

	.link a {
		display: inline-block;
		text-decoration: none;
		color: #666;
		font-size: 14px;
	}
</style>
