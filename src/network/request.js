import axios from 'axios'

export function request(config){
	//1.创建axios实例
	const instance = axios.create({
		//baseURL : 'http://127.0.0.1:8081',
		//baseURL : 'http://123.207.32.32:8000',
		baseURL: 'http://123.207.32.32:8000/api/wh',
		timeout : 600000
	})
	
	//2.axios拦截器
	instance.interceptors.request.use(config => {
		//1.比如说config中的一些信息不符合服务器要求
		
		//2.比如我们每次发送网络请求时显示load图表
		
		//3.某些网络请求时必须携带一些特殊信息,如token等,此处可拦截,返回错误信息
		
		return config
	}, err => {
		console.log(err)
	})
	
	instance.interceptors.response.use(res => {
		console.log(res)
		return res
	}, err => {
		console.log(err)
	})
	
	//3.发送真正的网络请求
	return instance(config)
}