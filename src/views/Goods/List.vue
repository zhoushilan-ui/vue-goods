<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>商品列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="name" label="商品名称" width="100">
				<template scope="scope">
					<img :src="scope.row.img_md" alt="图片加载失败" width="80px" height="80px">
				</template>
			</el-table-column>
			<el-table-column prop="name" width="400px"></el-table-column>
			<el-table-column prop="price" label="价格" sortable width="160">
			</el-table-column>
			<el-table-column prop="inventory" label="库存" sortable width="160">
			</el-table-column>
			<el-table-column prop="create_time" label="发布时间" sortable width="160">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-link :href="`#/goods/edit/${scope.row.id}`" class="el-link-button">
						<el-button type="primary" class="el-icon-edit" plain></el-button>
					</el-link>
					<el-button type="danger" class="el-icon-delete" plain @click="remove(scope.row.id,scope.$index)"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="float: right;">
			<el-pagination background layout="prev, pager, next,sizes" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :total="total" :page-sizes="[4,5,6]">
			</el-pagination>
		</div>
	</el-card>
</template>

<script>
	import { Goods } from '@/api/index.js';
	export default {
		data() {
			return {
				tableData: [],
				total: 0

			};
		},
		created() {
			//获取数据
			this.loadingList();

		},
		methods: {
			async loadingList() {
				this.loading = true;
				let { status, goods, total } = await Goods.list({ pageSize: 4, pageIndex: 1 });
				if (status) {
					this.tableData = goods;
					this.total = total;
					return status, goods;
				}
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			async handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				let { status, goods, total } = await Goods.list({ pageSize: 4, pageIndex: val });
				if (status) {
					this.tableData = goods;
				}

			},
			//删除按钮
			remove(id, index) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					console.log(id, index);
					let { status, data } = await Goods.remove({ id });
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
			}
		}
	}
</script>

<style scoped>
	.type {
		color: white;
		text-decoration: none;
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

	.box-card {
		width: 100%;
	}

	.el-link-button {
		display: inlne-block;
		margin-right: 5px;
	}
</style>
