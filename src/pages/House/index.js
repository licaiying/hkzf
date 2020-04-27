import React from 'react'

import { Flex, Toast } from 'antd-mobile'

import Filter from './components/Filter'
// 导入样式
// styles:自定义字段名称
import styles from './index.module.css'
import { getHouseInfoList } from '../../utils/api/House'
import { getCurrCity } from '../../utils'

import {List, AutoSizer, InfiniteLoader} from 'react-virtualized';
import HouseItem from '../../components/HouseItem'
import { BASE_URL } from '../../utils/axios'
import NoHouse from '../../components/NoHouse'


export default class HouseList extends React.Component {

  state = {
    // 房屋列表数据
    list:[],
    // 列表数据的总条数
    count:0
  } 

// 渲染列表项方法
  renderHouseItem = ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }) => {
    // 获取数据 => 渲染列表项
    const {list} = this.state
    // 获取当前列表项的数据
    const item = list[index]
    // console.log(item)  // 每条房源的具体详情信息

    // 数据item没有的时候的处理
    if (!item) {
      return (
        <div style={style} key={key}>
          <p className={styles.loading}></p>
        </div>
      )
    }


    // 因为后台返回的图片路径的字段名称为houseImg 与 定义的 src 不一样，所以需做处理
    // item.houseImg = `${BASE_URL}${item.houseImg}`
    item.src = `${BASE_URL}${item.houseImg}`
    return (
      <HouseItem {...item} key={key} style={style} onClick={()=>{
        // this.props.history.push('/detail/'+item.houseCode)

        // 演示 哈希模式(hash) 和 历史模式(history) 通过push传递参数的不同点
        // 1. history模式 => H5模式
        // this.props.history.push('/detail/'+item.houseCode, { id: item.houseCode, a: '历史模式' })

        // 2. hash模式
        this.props.history.push({ pathname: '/detail/'+ item.houseCode, state: { id: item.houseCode, a: 'hash模式' }})

      }}></HouseItem>     
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
    let { status, data:{ list, count } } = await getHouseInfoList(this.cityId, this.filters, 1, 20)
    // console.log(res)
    if (status === 200) {
      // 有数据提示
      if (count !== 0) {
        Toast.success(`获取到${count}条房源数据!`)
      }

      this.setState({
        list,
        count
      })
    }
  }

  // 下拉加载更多
  // 判断当前行，是否加载完成
  isRowLoaded = ({ index }) => {
    return !!this.state.list[index];  // !!: 一般处理null，undefined和空值判断
  }
  
  // 回调函数：下拉到一定位置执行=>调用后台数据获取下一页数据=>刷新房源列表
  loadMoreRows = ({ startIndex, stopIndex }) => {
    return getHouseInfoList(this.cityId, this.filters, startIndex, stopIndex)
      .then(res => {
        // Store response data in list...
        // console.log('下一页数据：',startIndex, stopIndex, res) // 下一页数据： 20 29 {status: 200, data: {…}, description: "请求成功"}
        if (res.status === 200) {
          this.setState({
            list:[...this.state.list, ...res.data.list]
          })
        }
      })
  }

  renderList = () => {
    const {count} = this.state
    // 没有数据渲染NoHouse组件
    return count>0?<InfiniteLoader
      isRowLoaded={this.isRowLoaded}
      loadMoreRows={this.loadMoreRows}
      rowCount={this.state.count}
      minimumBatchSize={10}  // 下拉更新时，每次刷新加载的房源数据条数
    >
      {({ onRowsRendered, registerChild }) => (
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              onRowsRendered={onRowsRendered}
              ref={registerChild}
              className={styles.houseList}
              rowCount={this.state.count}
              rowHeight={130}
              rowRenderer={this.renderHouseItem}
              width={width}
            />
          )}
        </AutoSizer>        
      )}
    </InfiniteLoader>:<NoHouse>暂无房源数据信息</NoHouse>
  }

  render() {
    return (
      <div className={styles.root}>
        {/* 条件筛选栏 */}
        <Filter onFilter={this.onFilter} />
        {/* 筛选结果：列表 */}
        {this.renderList()}
      </div>
    )
  }
}
