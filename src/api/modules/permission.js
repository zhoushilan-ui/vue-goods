import axios from 'axios';
//获取用户角色
let list = (data) => axios.get('/api/role/list', { params: data });
//删除角色
let remove = (data) => axios.delete(`/api/role/`, { params: data });
//编辑角色
let edit = (id, name) => axios.put('/api/role', { id, name });
//添加角色
let role = (data) => axios.post('/api/role', data);

//为指定的按钮删除菜单
let remvoemenu = (data) => axios.delete('/api/role/menu', { params: data });
//根据角色的id来获取对应的菜单权限
let idmenu = (data) => axios.get('/api/role/config', { params: data });
export default {
	list,
	remove,
	edit,
	role,
	idmenu,
	remvoemenu,
}
