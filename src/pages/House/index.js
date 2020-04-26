import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
// styles:自定义字段名称
import styles from './index.module.css'
import { getHouseInfoList } from '../../utils/api/House'
import { getCurrCity } from '../../utils'

import {List, AutoSizer} from 'react-virtualized';


export default class HouseList extends React.Component {

  state = {
    // 房屋列表数据
    list:[]
  } 

// 渲染列表项方法
  renderHouseItem = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {

    return (
      <div key={key} style={style} className="">
        {index}
      </div>
    );
  }


  async componentDidMount() {
    // 获取城市的id
    let {value} = await getCurrCity()
    // console.log(value)
    // 将获取的城市id存储在this上
    this.cityId = value
    // 在进入页面时,获取房屋列表数据,展示首屏房屋数据，所以需默认调用一次
    this.getHouseList()
  }


  // 要实现 子传父
  // 父组件提供接收数据的方法
  // filters:子组件传递过来的数据
  onFilter = (filters) => {
    // console.log('父组件接收的数据：', filters)
    // 将接收到的数据，存储在this实例上
    this.filters = filters
    // 调用方法，获取列表数据,做展示
    // 触发时机：每次用户通过过滤器选中数据，点击确定按钮时，调用
    this.getHouseList()
  }


  // 获取房源信息的方法
  getHouseList = async () => {
    // 发请求，获取房源信息
    let { status, data:{ list } } = await getHouseInfoList(this.cityId, this.filters, 1, 20)
    // console.log(res)
    if (status === 200) {
      this.setState({
        list
      })
    }
  }


  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
        {/* 筛选结果：列表 */}
        <AutoSizer>
          {({ height, width }) => (
            <List
            height={height}
            rowCount={this.state.list.length}
            rowHeight={130}
            rowRenderer={this.renderHouseItem}
            width={width}
          />
          )}
        </AutoSizer>
      </div>
    )
  }
}
