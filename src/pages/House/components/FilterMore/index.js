import React, { Component } from 'react'

import FilterFooter from '../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {

  // 设置状态数据
  state = {
    // 当前选中的条件数据
    // selected:[]
    // 接收父组件传递过来的,当前选中的条件数据
    selected:this.props.value
  }

  // 处理选中的条件数据
  handlerSel = (id) => {
    // console.log(id)
    // 获取状态数据
    const {selected} = this.state
    // 定义已选中的数据数组newSelected
    let newSelected = [...selected]
    // 判断当前数组中是否存在=>删除 / 添加
    let index = newSelected.indexOf(id)
    if (index < 0) {
      // 不存在=>添加
      newSelected.push(id)
    } else {
      // 存在=>删除
      newSelected.splice(index,1)
    }
    // 根据修改后的数组，更新数据和页面
    this.setState({
      selected:newSelected
    })
  }

  // 渲染标签
  renderFilters(data) {
    // 高亮类名： styles.tagActive
  return data.map((item)=>
      <span key={item.value} 
        onClick={()=>this.handlerSel(item.value)}
        className={[styles.tag, this.state.selected.includes(item.value)?styles.tagActive:''].join(' ')}>{item.label}</span>)
  }

  render() {
  // console.log(this.props)
    const { onOk, onCancle, data:{characteristic, floor, oriented, roomType} } = this.props
    // console.log('第四个筛选器的数据：', data)

    return (
      <div className={styles.root}>
        {/* 遮罩层 */}
        <div className={styles.mask} onClick={onCancle} />

        {/* 条件内容 */}
        <div className={styles.tags}>
          <dl className={styles.dl}>
            <dt className={styles.dt}>户型</dt>
            <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

            <dt className={styles.dt}>朝向</dt>
            <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

            <dt className={styles.dt}>楼层</dt>
            <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

            <dt className={styles.dt}>房屋亮点</dt>
            <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
          </dl>
        </div>

        {/* 底部按钮 */}
        <FilterFooter className={styles.footer} onOk={()=>onOk(this.state.selected)} onCancle={onCancle} />
      </div>
    )
  }
}
