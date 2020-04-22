// 首页相关的所有接口

import axiosAPI from '../../axios'

// 1.轮播图接口
export function getSwiper(){
    // 返回的是一个Promise对象
    return axiosAPI.get('/home/swiper')
}

// 2.租房小组接口
export function getGroups(area='AREA|88cff55c-aaa4-e2e0'){
    // 返回的是一个Promise对象
    return axiosAPI.get('/home/groups',{
        params:{
            area
        }
    })
}

// 3.最新资讯列表接口
export function getNews(area='AREA|88cff55c-aaa4-e2e0'){
    return axiosAPI.get('/home/news',{
        params:{
            area
        }
    })
}