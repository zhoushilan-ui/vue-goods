import axios from 'axios';

//删除图片
let removeimg = (data) => axios.delete('/api/upload', { params: data });

//上传商品 的主图
let productimg = (data) => axios.post('/api/upload/goods', data);
export default {
	removeimg,
	productimg,
}
