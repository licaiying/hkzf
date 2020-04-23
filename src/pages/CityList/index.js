import React, { Component } from "react";
import { getCityList, getHotCity } from "../../utils/api/City";
import { getCurrCity } from "../../utils";

import { NavBar, Icon } from 'antd-mobile'

import './index.scss'

import {List, AutoSizer} from 'react-virtualized';

// const list = Array.from(new Array(100)).map((item,index)=>{
//   return {name:index}
// })


class CltyList extends Component {

    // 设置列表状态数据
    state = {
      // 归类的城市数据
      cityList:{},
      // 归类的城市数据的索引
      cityIndex:[]
    }

    componentDidMount(){
        this.getCityList()
    }

    // 格式化列表的title
    formatLetter = (letter) => {
      switch (letter) {
        case '#':
          return '当前城市';
        case 'hot':
          return '热门城市';  
        default:
          return letter.toUpperCase();
      }
    }

    rowRenderer = ({
      key, // Unique key within array of rows
      index, // Index of row within collection
      isScrolling, // The List is currently being scrolled
      isVisible, // This row is visible within the List (eg it is not an overscanned row)
      style, // Style object to be applied to row (to position it)
    }) => {
      // 获取处理完的状态数据
      const { cityList, cityIndex } = this.state
      // 对象的键
      let letter = cityIndex[index]
      // console.log(letter)
      // 对象的值
      let item = cityList[letter]
      // console.log(letter,item)
      return (
        <div key={key} style={style} className="city-item">
          <div className="title">{this.formatLetter(letter)}</div>
          {
            item.map((item)=><div className="name" key={item.value}>{item.label}</div>)
          }
        </div>
      );
    }

  // 获取所有城市的列表数据
  getCityList = async () => {
    const {status,data} = await getCityList();
    // console.log(res); // {status: 200, data: Array(92), description: "请求成功"}
    if (status === 200) {
        // 按首字母归类的数据
       let {cityList,cityIndex} = this.formatCities(data)
       
       // 在城市列表数据中，加入热门城市数据
       // 重新命名，防止与第一次数据冲突
        const {status:st, data:hot} = await getHotCity()
        if (st === 200) {
            cityList['hot'] = hot // 加入热门城市字段和数据
            cityIndex.unshift('hot') // 将 'hot' 字段，加入到 首字母列表数组cityIndex 的头部
        }

       // 在城市列表数据中，加入当前城市数据
       const res = await getCurrCity()
       cityList['#'] = [res]
       cityIndex.unshift('#')

       // 数据响应式处理
       this.setState({
         cityList,
         cityIndex
       })

      //  console.log(cityList,cityIndex) // {b: Array(3), a: Array(1), n: Array(6),...} ["hot", "a", "b", "c",......]
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
    return (
      <div className="cityList">
        {/* 导航区域 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          城市选择
        </NavBar>

        {/* 城市列表 */}
        <AutoSizer>
          {({height, width}) => (
            <List
              height={height}
              rowCount={this.state.cityIndex.length}
              rowHeight={100}
              rowRenderer={this.rowRenderer}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    )
  }

}

export default CltyList;
