import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../components/FilterFooter'

const province = [
  {
    label: '北京',
    value: '01',
    children: [
      {
        label: '东城区',
        value: '01-1'
      },
      {
        label: '西城区',
        value: '01-2'
      },
      {
        label: '崇文区',
        value: '01-3'
      },
      {
        label: '宣武区',
        value: '01-4'
      }
    ]
  },
  {
    label: '浙江',
    value: '02',
    children: [
      {
        label: '杭州',
        value: '02-1',
        children: [
          {
            label: '西湖区',
            value: '02-1-1'
          },
          {
            label: '上城区',
            value: '02-1-2'
          },
          {
            label: '江干区',
            value: '02-1-3'
          },
          {
            label: '下城区',
            value: '02-1-4'
          }
        ]
      },
      {
        label: '宁波',
        value: '02-2',
        children: [
          {
            label: 'xx区',
            value: '02-2-1'
          },
          {
            label: 'yy区',
            value: '02-2-2'
          }
        ]
      },
      {
        label: '温州',
        value: '02-3'
      },
      {
        label: '嘉兴',
        value: '02-4'
      },
      {
        label: '湖州',
        value: '02-5'
      },
      {
        label: '绍兴',
        value: '02-6'
      }
    ]
  }
]

export default class FilterPicker extends Component {

  // constructor:只在组件实例化的时候(new的时候)，执行1次
  // constructor(props){
  //   super(props)
  //   console.log('子组件picker=>constructor演示',this.props.value)
  // }

  // state：只在组件实例化的时候，执行1次
  // 添加状态数据value
  state = {
    // picker当前选中的数据
    // value:[]
    value:this.props.value  // 接收父组件传递过来的数据
  }

  render() {
    const {data,cols} = this.props
    // console.log(data)
    return (
      <>
        {/* 选择器组件： */}
        <PickerView data={data} 
          value={this.state.value} 
          cols={cols} 
          onChange={(val)=>{
          // console.log(val)
          this.setState({
            value:val
          })
        }} />

        {/* 底部按钮 */}
        {/* 点击 确定 按钮的时候，将picker选好的数据传递给父组件 => 通过函数套函数的方式传递数据 */}
        <FilterFooter onOk={()=>{
          this.props.onOk(this.state.value)
        }} onCancle={this.props.onCancle} />
      </>
    )
  }
}
