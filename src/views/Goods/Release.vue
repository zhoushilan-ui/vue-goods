<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>发布商品</span>
		</div>
		<el-form label-width="100px" :model="form" :rules="rules" ref="form">
			<el-form-item label="商品分类">
				<el-row>
					<el-col :span="5">
						<el-select v-model="form.cate_1st" placeholder="请选择活动区域" style="width: 200px;">
							<el-option v-for="options in options_1st" :key="options.id" :label="options.name" :value="options.id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.cate_2nd" placeholder="请选择活动区域" style="width: 200px;">
							<el-option v-for="options in options_2nd" :key="options.id" :value="options.id" :label="options.name"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.cate_3rd" placeholder="请选择活动区域" style="width: 200px;">
							<el-option v-for="options in options_3rd" :key="options.id" :value="options.id" :label="options.name"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="商品名称">
				<el-col :span="14">
					<el-input v-model="form.name"></el-input>
					<p>商品标题名称长度至少3个字符，最长200个汉字</p>
				</el-col>
			</el-form-item>
			<el-form-item label="商品买点">
				<el-col :span="14">
					<el-input type="textarea" v-model="form.hotPoint"></el-input>
					<p>商品卖点不能超过140个汉字</p>
				</el-col>
			</el-form-item>
			<el-form-item label="商品价格">
				<el-col :span="14">
					<el-col :span="8">
						<el-input placeholder="请输入内容" v-model="form.price">
							<template slot="append">元</template>
						</el-input>
					</el-col><br>
					<p>价格必须是0-999999之间的数字，且不能高于市场价</p>
					<p>此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</p>
				</el-col>
			</el-form-item>
			<el-form-item label="市场价">
				<el-col :span="14">
					<el-col :span="8">
						<el-input placeholder="请输入内容" v-model="form.marketPrice">
							<template slot="append">元</template>
						</el-input>
					</el-col><br>
					<p>价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</p>
				</el-col>
			</el-form-item>
			<el-form-item label="成本价">
				<el-col :span="24">
					<el-col :span="8">
						<el-input placeholder="请输入内容" v-model="form.cost">
							<template slot="append">元</template>
						</el-input>
					</el-col><br>
					<p>价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</p>
				</el-col>
			</el-form-item>
			<el-form-item label="折扣">
				<el-col :span="14">
					<el-col :span="8">
						<el-input placeholder="请输入内容" v-model="form.discount=discount">
							<template slot="append">折</template>
						</el-input>
					</el-col><br>
					<p>根据销售价与市场价比例自动生成不需要编辑 </p>
				</el-col>
			</el-form-item>
			<el-form-item label="商品存库">
				<el-col :span="14">
					<el-col :span="8">
						<el-input placeholder="请输入内容" v-model="form.inventory">
							<template slot="append">件</template>
						</el-input>
					</el-col><br>
					<p>价格必须是0-999999之间的整数</p>
					<p>若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</p>
				</el-col>
			</el-form-item>
			<el-form-item label="商品货号">
				<el-col :span="14">
					<el-col :span="8">
						<el-input placeholder="请输入内容" v-model="form.articleNo"></el-input>
					</el-col><br>
					<p>商品货号是商家管理商品的编号，买家不可见</p>
					<p>最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</p>
				</el-col>
			</el-form-item>
			<el-form-item label="商品主图">
				<single-upload @success='handleUpload($event)' @remove='form.img_lg="" ' :url="form.img_lg"></single-upload>
				<div>上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
			</el-form-item>
			<el-form-item label="商品轮播图">
				<el-upload action="/api/upload/slider" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
					<i class="el-icon-plus"></i>
				</el-upload>
				<el-dialog :visible.sync="dialogVisible">
					<img width="100%" :src="dialogImageUrl" alt="">
				</el-dialog>
				<div>上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸 800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
			</el-form-item>
			<div class="back-color">商品详情描述</div>

			<el-form-item label="商品品牌" style="margin-top: 10px;">
				<el-col :span="14">
					<el-input placeholder="请输入内容" v-model="form.brand"></el-input>
				</el-col>
			</el-form-item>
			<!-- 副文本编辑器 -->
			<el-form-item label="商品描述">
				<div>
					<div ref="editor" v-model="form.detail"></div>
				</div>
			</el-form-item>
			<div class="back-color">商品物流信息</div>
			<el-form-item label="所在地" style="margin-top: 10px;">
				<el-row>
					<el-col :span="5">
						<el-select v-model="form.province" placeholder="请选择活动区域" style="width: 200px;">
							<el-option v-for="item in province" :label="item.name" :key="item.province_id" :value="item.province_id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.city" placeholder="请选择活动区域" style="width: 200px;">
							<el-option v-for="item in city" :label="item.name" :key="item.city_id" :value="item.city_id"></el-option>
						</el-select>
					</el-col>
					<el-col :span="5">
						<el-select v-model="form.county" placeholder="请选择活动区域" style="width: 200px;">
							<el-option v-for="item in county" :label="item.name" :key="item.county_id" :value="item.county_id"></el-option>
						</el-select>
					</el-col>
				</el-row>
			</el-form-item>
			<el-form-item label="运费">
				<el-col :span="14">
					<el-col :span="8">
						<el-input placeholder="请输入内容" v-model="form.freight">
							<template slot="append">元</template>
						</el-input>
					</el-col><br>
					<p>运费设为0，前台商品将显示免运费</p>
				</el-col>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="handleProduct('form')">提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>
<script>
	import E from 'wangeditor';
	import { Goods } from '@/api/index.js';
	import { Admin } from '@/api/index.js';
	import SingleUpload from '@/components/Upload.vue';
	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				form: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					cost: '',
					create_time: '',
					detail: '',
					hotPoint: '',
					id: '',
					img_lg: '',
					img_md: '',
					inventory: '',
					marketPrice: '',
					price: '',
					slider: [],
					name: '',
					update_time: '',
					brand: '',
					articleNo: '',
					discount: '',
					province: '',
					city: '',
					county: '',
					freight: ''
				},
				tableData: [],
				options_1st: [], //一级分类的的数据放在数组里
				options_2nd: [], //二级分类的数据放在数组里
				options_3rd: [], //三级分类的数据放在数组里
				dialogImageUrl: '',
				dialogVisible: false,
				province: [], //省
				city: [], //市
				county: [], //县
				rules: {
					cate_1st: [{ required: true, message: '请选择一级分类', trigger: 'change' }],
					cate_2nd: [{ required: true, message: '请选择二级分类', trigger: 'change' }],
					cate_3rd: [{ required: true, message: '请选择三级分类', trigger: 'change' }],
					name: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{ min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
					],
				}
			};
		},
		computed: {
			discount: {
				get: function() {
					// if(this.form.price=="" || this.form.marketPrice==""){
					return (this.form.price / this.form.marketPrice) * 100;
					// }
				}
			}
		},
		async created() {
			//获取一级分类的数据
			let options = await this.loadSubcate(1);
			this.options_1st = options;
			//默认选项第一个
			this.form.cate_1st = options[0].id;
			//获取省的一级分类
			let option = await this.loadAddress(0);
			this.province = option;
			this.form.province = option[0].province_id;
		},
		watch: {
			"form.cate_1st": async function(val) {
				//监听一级分类 来获取二级分类
				let options = await this.loadSubcate(val);
				this.options_2nd = options;
				//默认第一项
				this.form.cate_2nd = options[0].id;
			},
			"form.cate_2nd": async function(val) {
				//监听二级分类，获取三级分类
				let options = await this.loadSubcate(val);
				this.options_3rd = options;
				//默认第一项
				this.form.cate_3rd = options[0].id;
			},
			"form.province": async function(val) { //监听省份的变化，获取市的分类
				let option = await this.loadAddressCity(val);
				this.city = option;
				//默认第一个
				this.form.city = option[0].city_id;
			},
			"form.city": async function(val) { //监听市的变化，获取县的分类
				let option = await this.loadAddressCounty(val);
				this.county = option;
				//默认第一项
				this.form.county = option[0].county_id;
			}
		},
		mounted() {
			//富文本编译器
			var editor = new E(this.$refs.editor);
			editor.customConfig.onchange = (html) => {
				this.form.detail = html;
			}
			// 配置服务器端地址
			editor.customConfig.uploadImgServer = '/api/upload/editor/';
			//配置上传图片
			editor.customConfig.uploadFileName = 'file';
			//自定义headers头 是了获取到权限
			editor.customConfig.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}`,
			}
			editor.create();
			//设置富文本框的高度
			editor.$textContainerElem.css('height', '100% !importance'); //设置高度
			//配置编辑域的z-index
			editor.customConfig.zIndex = 1000;
		},
		methods: {
			//获取省的分类
			async loadAddress() {
				let { status, data } = await Admin.province({ data });
				if (status) {
					return data;
				}
			},
			//获取市
			async loadAddressCity(id) {
				let { status, data } = await Admin.city({ id: id });
				if (status) {
					return data;
				}
			},
			//获取县
			async loadAddressCounty(id) {
				let { status, data } = await Admin.county({ id: id });
				if (status) {
					return data;
				}
			},
			//获取子级分类
			async loadSubcate(id) {
				let { status, data } = await Goods.sub({ pId: id });
				if (status) {
					return data;
				}
			},

			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			//发布商品
			handleProduct(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, data } = await Goods.newproduct({ ...this.form });
						if (status) {
							this.$message.success("商品发布成功");
							//跳转页面
							setTimeout(function() {
								this.$router.replace('/goods/list')
							}, 2000)

						} else {
							this.$message.info("商品发布失败");
						}
					}
				});
			},
			//头像上传成功
			handleUpload({ status, total, mdImg, lgImg }) {
				this.form.img_lg = lgImg;
				this.form.img_md = mdImg;
				console.log(this.form.img_lg);
				this.form.slider = lgImg;
			},
			//告诉父组件删除成功 ,上传图片的地址为空
			removeSuccess(value) {
				// this.insertForm.img = value;
			},
		}
	}
</script>

<style scoped>
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.back-color {
		background-color: #f5f5f5;
		padding: 8px 20px;
		color: #000;
	}
</style>
