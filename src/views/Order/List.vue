<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>订单列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%">
			<el-table-column prop="id" label="#" width="50">
			</el-table-column>
			<el-table-column width="600">
				<template scope="scope">
					<el-table :data="scope.row.goodsList" style="width: 100%">
						<el-table-column label="商品" width="100">
							<template scope="scope">
								<img :src="scope.row.img_md" alt="图片加载失败" width="80px" style="border: 1px solid #ccc;">
							</template>
						</el-table-column>
						<el-table-column prop="name" width="250px">
						</el-table-column>
						<el-table-column prop="goods_price" label="单价" width="80px">
						</el-table-column>
						<el-table-column prop="goods_num" label="数量" width="90px">
						</el-table-column>
					</el-table>
				</template>
			</el-table-column>
			<el-table-column prop="payment" label="付款总额" width="100">
			</el-table-column>
			<el-table-column prop="create_time" label="下单时间" width="200">
			</el-table-column>
			<el-table-column prop="status" label="状态" width="100">
			</el-table-column>
			<el-table-column label="操作">
				<el-button type="primary" class="el-icon-edit"></el-button>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	import { Order } from '@/api/index.js';
	export default {
		data() {
			return {
				tableData: [],
				table: [],
			}
		},
		created() {
			//获取数据
			this.loadingList(this.$route.id);
		},
		methods: {
			async loadingList(id) {
				let { status, data } = await Order.list({ id });
				if (status) {
					this.tableData = data;
				}
			},
			formatter(row, column) {
				return row.address;
			}
		}
	}
</script>

<style>
</style>
