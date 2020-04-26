import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
// styles:自定义字段名称
import styles from './index.module.css'
import { getHouseInfoList } from '../../utils/api/House'
import { getCurrCity } from '../../utils'


export default class HouseList extends React.Component {

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
    let res = await getHouseInfoList(this.cityId, this.filters, 1, 20)
    console.log(res)
  }


  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
        {/* 筛选结果：列表 */}
      </div>
    )
  }
}
