import React, { Component } from 'react'

// FilterTitle:过滤标题模板
import FilterTitle from '../FilterTitle'
// FilterPicker:过滤选择器模板
import FilterPicker from '../FilterPicker'
// FilterMore；过滤内容模板
import FilterMore from '../FilterMore'

// styles:是自定义的字段
import styles from './index.module.css'


// 设置过滤器title的默认高亮显示
// 默认数据
const titleSelectedStatus = {
  area:false,
  mode:false,
  price:false,
  more:false
}


export default class Filter extends Component {

  // 定义状态数据
  state = {
    titleSelectedStatus
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle titleSelectedStatus={this.state.titleSelectedStatus} />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
