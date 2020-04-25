import React, { Component } from 'react'

// FilterTitle:过滤标题模板
import FilterTitle from '../FilterTitle'
// FilterPicker:过滤选择器模板
import FilterPicker from '../FilterPicker'
// FilterMore；过滤内容模板
import FilterMore from '../FilterMore'

import styles from './index.module.css'

export default class Filter extends Component {
  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {/* <div className={styles.mask} /> */}

        <div className={styles.content}>
          {/* 标题栏 */}
          <FilterTitle />

          {/* 前三个菜单对应的内容： */}
          {/* <FilterPicker /> */}

          {/* 最后一个菜单对应的内容： */}
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
