// 城市相关接口

import axiosAPI from '../../axios'


// 根据城市名称查询该城市信息
export function getCityInfo(name){
    return axiosAPI.get('/area/info',{
        params:{
            name
        }
    })
}
