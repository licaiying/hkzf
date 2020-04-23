import React, { Component } from "react";
import { getCityList } from "../../utils/api/City";


class CltyList extends Component {

    componentDidMount(){
        this.getCityList()
    }


  // 获取所有城市的列表数据
  getCityList = async () => {
    const {status,data} = await getCityList();
    // console.log(res); // {status: 200, data: Array(92), description: "请求成功"}
    if (status === 200) {
       let {cityList,cityIndex} = this.formatCities(data) 
       console.log(cityList,cityIndex)   
    }
  };


  // 按城市首字母归类城市数据，做展示
  // 声明一个方法，将需归类的城市数据 作为参数
  formatCities = (data) => {
    // 声明一个空对象，存放归类好的数据
    let cityList = {}, cityIndex;
    // 遍历要归类的数据data
    data.forEach((item)=>{
        // console.log(item)
        // 获取当前的城市的首首字母
        let first = item.short.slice(0,1)
        // console.log(first)
        // 去重和归类
        // 判断 cityList 中，是否存在以当前首字母开头的键，对应的数据信息
        if (!cityList[first]) {
            // 不存在，定义该键的对应数组信息
            cityList[first] = [item]
        } else {
            // 存在，向该数组信息里，添加最新的数据信息
            cityList[first].push(item)
        }
    })
    // console.log('首字母归类完的数据',cityList)
    // 获取归类的首字母数据索引(即：key值)
    // Object.keys():获取对象里的key属性，返回值是 数组
    cityIndex = Object.keys(cityList).sort() // ["a", "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "q", "s", "t", "w", "x", "y", "z"]
    // console.log('获取归类的首字母数据',cityIndex)

    // 遍历首字符列表数据
    // cityIndex.map((item) => {
    //     // item:是cityList对象的key值
    //     console.log(item,cityList[item]) // a [{…}],  b (3) [{…}, {…}, {…}], ......
    // })

    return { cityList, cityIndex }
  }


  render() {
    return <div>CltyList</div>;
  }

}

export default CltyList;
