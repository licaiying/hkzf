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


// 根据筛选器条件(即：选好的数据信息)，获取房源信息
export function getHouseInfoList (cityId, filters, start, end) {
    return axiosAPI.get('/houses',{
        params:{
            cityId,
            ...filters, // 解构格式化后的数据，传递给后台
            start, // 分页开始
            end   // 分页结束
        }
    })
}
