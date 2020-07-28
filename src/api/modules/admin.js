import axios from "axios";

//管理员登录
let login = (data) => axios.post('/api/admin/login', data);

//管理员的注册
let register = (data) => axios.post('/api/admin/register', data);

//获取管理员的列表
let list = (data) => axios.get('/api/admin/list', { params: data });

//获取子级分类
//let sub=(data)=>axios.get('/api/category/sub',{ params: data });

//删除管理员
let remove = (data) => axios.delete('/api/admin', { params: data });

//获取管理员个人的资料
let message = (data) => axios.get('/api/admin', { params: data });

//获取菜单
let menu = (data) => axios.get('/api/menu/sub', { params: data });

//删除子菜单
let childrenmenu = (data) => axios.delete(`/api/menu`, { params: data });
//编辑子菜单
let editmenu=(data)=>axios.put('/api/menu',data);
//添加子菜单
let addmenu=(data)=>axios.post('/api/menu',data);
//获取子菜单的图标

//获取所有的字体图标
let icon = (data) => axios.get('/api/admin/icon/list', { params: data });

//设置子菜单的icon
let editicon=(data)=>axios.put('/api/menu/icon',data);

//更新管理员的个人资料
let upadmin = (data) => axios.put('/api/admin', data);

//获取所有的省
let province = (data) => axios.get('/api/pcct/province', { params: data });

//获取指定的省份下所有的市
let city = (data) => axios.get('/api/pcct/city', { params: data });

//获取指定的市下面的所有的县
let county = (data) => axios.get('/api/pcct/county', { params: data });
export default {
	login,
	register,
	list,
	remove,
	message,
	menu,
	upadmin,
	province,
	city,
	county,
	childrenmenu,
	icon,
	editmenu,
	addmenu,
	editicon,
}
