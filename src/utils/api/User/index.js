// 用户相关的所有接口

import axiosAPI from '../../axios'

// 登录接口
export function login(data){
    return axiosAPI.post('/user/login',data)
}