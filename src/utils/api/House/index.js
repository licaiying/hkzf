// 房源相关的所有接口

import axiosAPI from '../../axios'

// 获取房屋查询条件
export function getFilterHouse(id){
    return axiosAPI.get('/houses/condition',{
        params:{
            id
        }
    })
}