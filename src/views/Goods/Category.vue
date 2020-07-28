<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>商品分类</span>
			</div>
			<el-tree ref="tree" node-key="id" lazy :load='loadNode' :default-expanded-keys="[0]" :props="defaultProps">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span class="tree-node-right">
						<el-button type="text" size="mini" class="el-icon-edit" :disabled="node.level==1" @click="handleModule(node,data)">
							编辑
						</el-button>
						<el-button type="text" size="mini" class="el-icon-plus" @click.stop="openInserNode(node,data)">
							添加
						</el-button>
						<el-button type="text" class="el-icon-delete" size="mini" @click.stop="remove(node,data)">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form :model="insertForm" :rules='rules' ref="insertForm">
				<el-form-item label="分类名称" label-width="120px" prop="name">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" label-width="100px">
					<single-upload :url="insertForm.img" @success='handleUpload($event)' @remove='insertForm.img=""'></single-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow=false">取 消</el-button>
				<el-button type="primary" @click='handleAdd("insertForm")'>添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form :model="editForm" :rules='rules' ref="editForm">
				<el-form-item label="分类名称" label-width="120px" prop="name">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" label-width="100px">
					<single-upload :url="editForm.img" @success='handleUpload($event)' @remove='editForm.img=""'></single-upload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow=false">取 消</el-button>
				<el-button type="primary" @click="handleSave('editForm')">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Goods } from '@/api/index.js';
	import SingleUpload from '@/components/Updataimg.vue';
	export default {
		components: {
			SingleUpload
		},
		data() {
			return {
				defaultProps: {
					label: 'name'
				},
				insertForm: {
					name: '',
					pId: '',
					img: ''
				},
				editForm: {
					id: '',
					name: '',
					pId: '',
					img: '',
				},
				nodeData: {}, //节点数据
				node: {}, //节点
				insertModalShow: false,
				editModalShow: false,
				rules: {
					name: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
						{ min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
					]
				}
			};
		},
		methods: {
			async loadNode(node, resolve) {
				//节点是0
				if (node.level == 0) { //当节点为0，发送ajax获取节点为0 的数据
					let { data } = await Goods.sub({ pId: 0 });
					return resolve(data);
				}
				//父级节点
				let { id } = node.data;
				console.log(id);
				//获取节点为0 的子节点的数据
				let { status, data } = await Goods.sub({ pId: id });
				if (status) {
					return resolve(data);
				}
			},
			//更新节点
			handleModule(node, data) {
				this.editModalShow = true;
				//把数据放在model里面
				this.editForm = { ...data };
				//保存节点数据
				this.node = node;

			},
			//点击编辑保存
			handleSave(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg, data } = await Goods.editsub({ ...this.editForm });
						if (status) {
							//关闭模态框
							this.editModalShow = false;
							//提示用户更新成功
							this.$message.success(msg);
							this.node.data = this.editForm;
						}
					} else {
						this.$message.error('编辑失败');
						return false;
					}
				});

			},
			//点击添加按钮,插入节点
			openInserNode(node, data) {
				//打开模态框
				this.insertModalShow = true;
				console.log(node, data.id);
				//把父节点保存起来
				this.node = node;
				//把data.id转存在表单里
				this.insertForm.pId = data.id;

			},
			//添加子级分类
			async handleAdd(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						let { status, msg, data } = await Goods.addsub({ ...this.insertForm });
						if (status) {
							this.insertModalShow = false;
							this.$message.success(msg);
							this.$refs.tree.append({ ...data, ...this.insertForm }, this.node);
						}else{
							this.$message.error(msg);
						}
					} else {
						this.$message.error('添加失败');
						return false;
					}
				});

			},
			//删除一个分类
			remove(node, data) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status } = await Goods.removesub({ id: data.id });
					if (status) {
						//删除页面的数据
						this.$refs.tree.remove({ ...data });
						//提示用户删除成功
						this.$message.success('删除成功');
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			//头像上传成功
			handleUpload({ status, total, src }) {
				this.insertForm.img = src;
				this.editForm.img = src;
			},
			//告诉父组件删除成功 ,上传图片的地址为空
			removeSuccess(value) {
				this.insertForm.img = value;
			},
		}
	};
</script>

<style scoped>
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
