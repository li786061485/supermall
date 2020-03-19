import axios from 'axios'
export function request(config, success, failure){
	//1.创建axios实例
	const instance = axios.create({
		baseURL : 'http://127.0.0.1:8081',
		timeout : 600000
	})
	
	//发送真正的网络请求
	instance(config)
	.then(res => {
		success(res)
	})
	.catch(err => {
		failure(err)
	})
}

export function request2(config){
	//1.创建axios实例
	const instance = axios.create({
		baseURL : 'http://127.0.0.1:8081',
		timeout : 600000
	})
	
	//发送真正的网络请求
	instance(config.baseConfig)
	.then(res => {
		config.success(res)
	})
	.catch(err => {
		config.failure(err)
	})
}

export function request3(config){
	return new Promise((resolve, reject) => {
		const instance = axios.create({
			baseURL : 'http://127.0.0.1:8081',
			timeout : 600000
		})
		
		instance(config)
		.then(res => {
			resolve(res)
		})
		.catch(err => {
			reject(err)
		})
	})
}

//推荐使用
export function request4(config){
	//1.创建axios实例
	const instance = axios.create({
		baseURL : 'http://127.0.0.1:8081',
		timeout : 600000
	})
	
	//2.axios拦截器
	instance.interceptors.request.use(config => {
		console.log(config)
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