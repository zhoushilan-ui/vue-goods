import axios from 'axios';
//引入Message框
import { Loading,Message } from 'element-ui';
//引入router实例
import router from '@/router/index.js';
//声明变量
let loading;

//默认的baseurl
axios.defaults.baseURL = 'http://localhost:3003';

//请求拦截器
axios.interceptors.request.use(function(config) {
	// console.log(config);
	//把loading开启
	loading = Loading.service({ background: 'rgba(0,0,0,0.3)' });
	//因为后台把token打开，要在headers头部设置
	//排除登录和注册
	if (config.url == '/api/admin/login' || config.url == '/api/admin/register') {
		return config;
	}
	// 获取token
	let token = sessionStorage.token;
	//若token为空
	if(!token){
		//以服务器的形式打开提示用户
		Message.error('无效的token,请重新登录！！');
		//延迟跳转页面的的时间
		setTimeout(function(){
			//关闭加载
			loading.close();
			//跳转页面
			router.replace('/login');
		},2000);
	}
	// 若token不为空
	config.headers.Authorization = `Bearer ${token}`;
	return config;

}, function(error) {
	// 对请求错误做些什么
	return Promise.reject(error);
});

//添加响应拦截器
axios.interceptors.response.use(function(response) {
	let { status, data } = response;
	console.log(data);
	loading.close();
	return data;
}, function(error) {
	// 对响应错误做点什么
	//检测401从这里检测
	return Promise.reject(error);
})
