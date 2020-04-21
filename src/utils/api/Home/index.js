// 首页相关的所有接口

import axiosAPI from '../../axios'

// 1.轮播图接口
export function getSwiper(){
    // 返回的是一个Promise对象
    return axiosAPI.get('/home/swiper')
}