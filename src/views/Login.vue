<template>
	<div class="back">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>欢迎登录</span>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="60px" class="demo-ruleForm">
				<el-form-item label="账户" prop="username">
					<el-input v-model="ruleForm.username" prefix-icon="el-icon-user" placeholder="请输入账户名"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password" prefix-icon="el-icon-key" placeholder="请输入密码" show-password></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
				</el-form-item>
				<div class="link">
					<router-link to="/register">注册</router-link>
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
					password: ''
				},
				rules: {
					username: [
						{ required: true, message: '请输入账户', trigger: 'blur' },
						{ min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
						{ min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg, data } = await Admin.login({ ...this.ruleForm });
						if (status) {
							console.log(data);
							sessionStorage.id = data.id;
							sessionStorage.token = data.token;
							sessionStorage.role = data.role;
							//如果用户是从系统中的某个页面因为token到期，跳转到了登录页面，传个重定向的redirect参数
							let { redirect } = this.$route.query;
							if (redirect) { //如果redirect有参数，跳转到先前的页面
								this.$route.replace(redirect);
							} else {
								//如果用户没有登录过系统，默认跳转到商品列表，跳转页面
								this.$router.replace('/goods/list');
							}
							//提示用户登录成功
							this.$message.success(msg);

						} else {
							this.$message.error(msg);
						}

					} else {
						console.log('error submit!!');
						return false;
					}

				});
			},
			
		}
	}
</script>

<style scoped>
	.back {
		width: 100%;
		height: 100vh;
		background: url(../assets/login-bg.jpg) top center no-repeat;
		background-size: cover;
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
		top: 200px;
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
