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


// 获取所有城市的列表数据
// level = 1：表示获取所有城市数据
// level = 2：表示城市下区的数据
// 这里，先默认获取所有城市数据
export function getCityList(level = 1){
    return axiosAPI.get('/area/city',{
        params:{
            level 
        }
    })
}
