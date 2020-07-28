import axios from 'axios';
//获取商品列表
let list = (data) => axios.get('/api/admin/goods/list', { params: data });

//获取商品的分类
let category = (data) => axios.get('/api/category/all', { params: data });

//删除商品
let remove = (data) => axios.delete(`/api/admin/goods`, { params: data });

//获取商品的详情
let detail = (data) => axios.get('/api/admin/goods', { params: data });

//获取子级分类
let sub = (data) => axios.get('/api/category/sub', { params: data });

//删除子级分类的的节点
let removesub = (data) => axios.delete(`/api/category/`, { params: data });

//添加子级分类
let addsub = (data) => axios.post('/api/category', data);

//编辑节点的数据
let editsub = (data) => axios.put('/api/category', data);

//发布商品
let newproduct = (data) => axios.post('/api/admin/goods', data);

//编辑商品
let edit = (data) => axios.put('/api/admin/goods', data);

export default {
	list,
	category,
	remove,
	detail,
	sub,
	newproduct,
	removesub,
	edit,
	addsub,
	editsub,
	edit,
}
