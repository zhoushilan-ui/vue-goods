<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>菜单权限</span>、
			</div>
			<div class="custom-tree-container">
				<el-alert title="Tips" type="warning" show-icon description="设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。">
				</el-alert>
				<div class="block">
					<el-tree ref='tree' :data="data" node-key="id" lazy :load='loadNode' :props="defaultProps" :default-expanded-keys="[0]"
					 :expand-on-click-node="false">
						<span class="custom-tree-node" slot-scope="{ node, data }">
							<span>{{ node.label }}</span>
							<span>
								<el-popover placement="left-start" width="100" trigger="hover" :class="el-icon-data.icon" v-model="visable">
									<el-button type="text" :icon="'el-icon-'+data.icon" @click="visible = true"></el-button>
									<el-button type="text" slot="reference" :icon="'el-icon-'+data.icon" :disabled="node.level==1" size="mini"
									 @click="handleIcon(node,data)">
										图标
									</el-button>
								</el-popover>
								<el-button type="text" size="mini" class="el-icon-edit" @click.stop="edit(node,data)">
									编辑
								</el-button>
								<el-button type="text" size="mini" class="el-icon-plus" @click.stop=" append(node,data)">
									添加
								</el-button>
								<el-button type="text" size="mini" class="el-icon-delete" @click.stop="remove(node, data)">
									删除
								</el-button>
								<el-button type="text" size="mini" style="color: #000000;">
									显示序号 <el-tag>{{data.order}}</el-tag>
								</el-button>
							</span>
						</span>
					</el-tree>
				</div>
			</div>
		</el-card>
		<!-- 添加窗口 -->
		<el-dialog title="添加节点" :visible.sync="insertModalShow">
			<el-form :model="insertForm" >
				<el-form-item label="菜单名称" label-width="120px" prop="name">
					<el-input autocomplete="off" v-model="insertForm.name"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" label-width="120px" prop="name">
					<el-input autocomplete="off" v-model="insertForm.path" placeholder="指定菜单的链接地址,选填"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序" label-width="120px" prop="name">
					<el-input autocomplete="off" v-model="insertForm.order" placeholder="显示顺序按照从小到大,如2001"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow=false">取 消</el-button>
				<el-button type="primary" @click='handleAdd'>添 加</el-button>
			</div>
		</el-dialog>
		<!-- 编辑弹窗 -->
		<el-dialog title="编辑节点" :visible.sync="editModalShow">
			<el-form :model="editForm" >
				<el-form-item label="菜单名称" label-width="120px" prop="name">
					<el-input autocomplete="off" v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" label-width="120px" prop="name">
					<el-input autocomplete="off" v-model="editForm.path"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序" label-width="120px" prop="name">
					<el-input autocomplete="off" v-model="editForm.order"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow=false">取 消</el-button>
				<el-button type="primary" @click="handleSave">保 存</el-button>
			</div>
		</el-dialog>
		<!-- 图标显示弹窗 -->
		<el-dialog title="编辑节点" :visible.sync="iconModalShow">
			<ul class="icons clear">
				<li v-for="(item,index) in iconMenu" :key="item.id" :class="{'bule':index==isColor}" @click="handleClickIcon(index,item)">
					<i :class="'el-icon-'+item.name"></i>
					<span>{{icon}}{{item.name}}</span>
				</li>
			</ul>
			<div style="position: absolute; right: 10px; bottom: 60px;">
				<el-pagination background layout="prev, pager, next,sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange"
				 :total="total" :page-sizes="[4,5,6]">
				</el-pagination>
			</div>
			<div slot="footer" class="dialog-footer" style="margin-top: 300px;">
				<el-button @click="iconModalShow=false">取 消</el-button>
				<el-button type="primary" @click="handleSaveIcon(index)">保 存</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	let id = 1000;
	import { Admin } from '@/api/index.js';
	export default {
		data() {
			return {
				icon:'el-icon-',
				isColor: 0,
				total: 0,
				defaultProps: {
					label: 'name'
				},
				editForm: {
					name: '',
					order: '',
					path: '',
				},
				insertForm: {
					name: '',
					pId: '',
					order: '',
					path: '',
				},
				insertModalShow: false,
				editModalShow: false,
				iconModalShow: false,
				options: [], //保存的一级分类
			
				iconMenu: [],
				nodeData: {}, //节点数据
				node: {}, //节点
				item: [],
			}
		},
		created() {
			this.options = this.loadNode(1);
		},
		methods: {
			async loadNode(node, resolve) {
				if (node.level == 0) {
					let { data } = await Admin.menu({ pId: 0 });
					return resolve(data);
				}
				let { id } = node.data;
				let { status, data } = await Admin.menu({ pId: id });
				if (status) {
					// this.tableData = data;
					return resolve(data);
				}
			},
			append(data) {
				this.insertModalShow = true;
			},
			//删除子菜单
			remove(node, data) {
				this.$confirm('此操作将永久删除该子菜单, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					console.log(data.id);
					let { status } = await Admin.childrenmenu({ id: data.id });
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
			//编辑子菜单
			edit(node, data) {
				this.editModalShow = true;
				this.editForm = { ...data };
				//保存节点数据
				this.node = node;
			},
			//点击保存按钮
			async handleSave() {
				let { status, data, msg } = await Admin.editmenu({ ...this.editForm });
				if (status) {
					this.editModalShow = false;
					this.$message.success(msg);
					this.node.data = this.editForm;
				}
			},
			//点击添加
			append(node, data) {
				this.insertModalShow = true;
				this.node = node;
				this.insertForm.pId = data.id;
			},
			//点击保存按钮
			async handleAdd() {
				let { status, msg, data } = await Admin.addmenu({ ...this.insertForm });
				if (status) {
					this.insertModalShow = false;
					this.$message.success(msg);
					this.$refs.tree.append({ ...data, ...this.insertForm }, this.node)
				} else {
					this.$message.error(msg)
				}
			},
			//显示图标
			async handleIcon(node, data) {
				// 保存data，有id
				console.log(node, data);
				this.iconModalShow = true;
				let { status, icons, total } = await Admin.icon({ pageSize: 25, pageIndex: 1 });
				if (status) {
					this.iconMenu = icons;
					this.total = total;
					//把树状的分类 的数据保存在数组里
					this.nodeData = data;
					this.node=node;
				}
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			async handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				let { status, icons, total } = await Admin.icon({ pageSize: 25, pageIndex: val });
				if (status) {
					this.iconMenu = icons;
				}
			},
			handleClickIcon(index, item) {
				// 保存item，有element的id
				this.isColor = index;
				this.item = item;
			},
			async handleSaveIcon() {
				let { status, icons,msg} = await Admin.editicon({ id:this.nodeData.id, icon: this.item.id });
				if (status) {
					//提示用户修改成功
					this.$message.success(msg);
					//把点击的icon的字体图标赋值给node
					this.node.data.id=this.item.id;
					this.node.data.icon=this.item.name;
					//关闭模态框
					this.iconModalShow = false;
				}
			}
		}
	};
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

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	/* 弹层 */
	ul {
		/* border: 1px solid #ccc; */
		padding: 0px;
		text-decoration: none;
		position: relative;
		display: block;
		height: 650px;
	}

	.icons li {
		border: 1px solid #ccc;
		list-style: none;
		width: 13%;
		height: 70px;
		line-height: 70px;
		float: left;
	}

	ul li i {
		display: block;
		font-size: 26px;
		font-weight: 100;
		padding-top: 10px;
		font-variant: normal;
		text-align: center;
	}

	ul li:hover {
		color: #409eff;

	}

	li.bule {
		background-color: #409EFF;
		color: white;
	}

	ul li span {
		display: block;
		font-size: 12px;
		line-height: 10px !important;
		text-align: center;
	}

	.el-dialog__header {
		height: 100% !important;
	}

	.clear {
		content: "";
		display: block;
		height: 0;
		clear: both;
	}
</style>
