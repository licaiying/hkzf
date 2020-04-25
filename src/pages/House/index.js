import React from 'react'

import { Flex } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
// styles:自定义字段名称
import styles from './index.module.css'


export default class HouseList extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter />
        {/* 筛选结果：列表 */}
      </div>
    )
  }
}
