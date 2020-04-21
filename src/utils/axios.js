// 封装全局axios
// 1.创建一个axios实例，添加全局的配置：后台接口的路径，超时时间等
// 2.给axios实例添加拦截器

import axios from 'axios'

// 导入 加载效果 的Toast组件
import { Toast } from 'antd-mobile'
 
// 后台的基础路径
const BASE_URL = 'http://api-haoke-dev.itheima.net'

// 1.创建一个axios实例(单例模式)
const axiosAPI = axios.create({
    baseURL:BASE_URL
})

// 2.添加拦截器
// 2.1 请求拦截器(请求之前调用)
axiosAPI.interceptors.request.use(function(config){
    // console.log('开始请求了',config)

    // 数据请求时的加载效果
    Toast.loading('加载中...',0) // 0：表示只要不手动调用 hide，就会一直加载

    return config
},function(error){
    return Promise.reject(error)
})


// 2.2 响应拦截器(请求成功调用)
axiosAPI.interceptors.response.use(function(response){
    // console.log('请求成功了',response)

    // 数据请求成功后，关闭 加载中 的动画效果
    Toast.hide()

    // 设计一个新的简化的数据结构，然后返回
    let newRes = {
        status:response.data.status,
        data:response.data.body,
        description:response.data.description
    }

    return newRes
},function(error){
    return Promise.reject(error)
})

export default axiosAPI
export { BASE_URL }