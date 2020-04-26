import React, { Component } from "react";

// FilterTitle:过滤标题模板
import FilterTitle from "../FilterTitle";
// FilterPicker:过滤选择器模板
import FilterPicker from "../FilterPicker";
// FilterMore；过滤内容模板
import FilterMore from "../FilterMore";

// styles:是自定义的字段
import styles from "./index.module.css";
import { getCurrCity } from "../../../../utils";
import { getFilterHouse } from "../../../../utils/api/House";

// 设置过滤器title的默认高亮显示
// 默认数据
const titleSelectedStatus = {
  area: false,
  mode: false,
  price: false,
  more: false,
};

// 当前选中的picker值的默认数据
const selectedValues = {
  // 默认值(没有选中)
  area:["area","null"], // 包含区域和地铁
  mode:["null"],
  price:["null"],
  more:[]
}

export default class Filter extends Component {
  // 定义状态数据
  state = {
    // 高亮的数据状态
    titleSelectedStatus,
    // 是否显示Picker组件
    openType: "", // 默认为空，不显示
  };

  // 父组件：提供 修改数据高亮状态的方法，给子组件使用
  // 这里必须是箭头函数，否则子组件无法调用该方法
  onTitleClick = (type) => {
    // 父组件接收子组件传递过来的type值
    // console.log('点击的是：',type) // 点击的是： price

    // 拷贝一份新的高亮状态数据
    // [type]:true:ES6写法，可给变量直接赋值
    // {...titleSelectedStatus,[type]:true} => 当点击的[type]的值，变为true时，替换前面的...titleSelectedStatus的对应的值
    let newSelected = { ...titleSelectedStatus, [type]: true };
    // console.log(newSelected) // {area: false, mode: false, price: false, more: true}

    // 根据点击的数据，显示相应的高亮状态
    this.setState({
      titleSelectedStatus: newSelected,
      openType: type, // 将点击时的type值，赋值给openType，以显示Picker组件
    });
  };

  // 定义方法，判断是否显示前三个过滤器的内容,即Picker组件的显示
  isShowPicker = () => {
    const { openType } = this.state;
    // 只有 openType的值，为以下数据时，才显示Picker组件，以展示对应的内容
    return openType === "area" || openType === "mode" || openType === "price";
  };


  // 处理确定的时候，查询selectedValues对应的选择器是否有数据=> 如果有，高亮显示对应的title
  handlerSel = () => {
    // 定义一个变量，存储新的高亮状态 
    const newStatus = {...titleSelectedStatus}
    // 遍历存储的选中数据selectedValues，确定是否有数据，并需要高亮
    Object.keys(this.selectedValues).forEach((key)=>{
      // 获取当前picker选中的值
      let cur = this.selectedValues[key]
      // 判断是否高亮
      if (key === 'area' && (cur[1] !== 'null' || cur[0] === 'subway')) {
        newStatus[key] = true
      } else if (key === 'mode' && cur[0] !== 'null') {
        newStatus[key] = true
      } else if (key === 'price' && cur[0] !== 'null') {
        newStatus[key] = true
      } else if (key === 'more' && cur.length > 0) {
        newStatus[key] = true
      }
       else {
        newStatus[key] = false
      }
    })
    return newStatus
  }


  // 处理所有的筛选器数据 => 后台同学需要的数据格式
  formatFilters = (selDatas) => {
    // selDatas:传递的存储的筛选条件数据
    // 获取存储的筛选条件数据
    const {area, mode, price, more} = selDatas

    // 创建一个空对象，存储格式化的数据
    const filters = {}
    // 处理区域(area)部分：区域 | 地铁
    let areaKey = area[0],aval;
    if (area.length === 2) {
      aval = area[1]
    } else {
      if (area[2] === 'null') {
        aval = area[1]
      } else {
        aval = area[2]
      }
    }
    // 处理后的 区域部分
    filters[areaKey] = aval
    // 出租方式部分 
    filters.rentType = mode[0]
    // 价格部分
    filters.price = price[0]
    // 更多部分
    filters.more = more.join(',')

    // 返回处理后的数据
    return filters
  }


  // 点击 确定 按钮时，关闭Picker组件
  // val:子组件传递过来的数据
  onOk = (val) => {
    // console.log('当前选中的值：', val)
    // 将获得的值，存储到组件的this实例上
    const {openType} = this.state
    this.selectedValues[openType] = val
    // console.log('当前选中的值：', val, this.selectedValues)

    this.setState({
      openType: "",
      // 处理高亮状态
      titleSelectedStatus:this.handlerSel()
    },()=>{
      // console.log('列表需要的数据', this.formatFilters(this.selectedValues))
      // 子组件调用父组件的方法，点击确定按钮时，传递用户选择的过滤器数据给子组件
      this.props.onFilter(this.formatFilters(this.selectedValues))
    });
  };

  // 点击 取消 按钮时，关闭Picker组件
  onCancle = () => {
    this.setState({
      openType: "",
      // 处理高亮状态
      titleSelectedStatus:this.handlerSel()
    });
  };

  componentDidMount() {
    this.getFilterData();
    // 当前选中的值
    this.selectedValues = {...selectedValues}
  }

  // 获取房源筛选条件的数据：对应城市的id
  getFilterData = async () => {
    // 调用封装的方法，获取城市的id
    // let currCity = await getCurrCity()
    // console.log(currCity) // {label: "北京", value: "AREA|88cff55c-aaa4-e2e0", pinyin: "beijing", short: "bj"}

    // 解构
    // value:相当于城市的id
    let { value } = await getCurrCity();

    // 发请求，向后台获取房源数据信息
    let { status, data } = await getFilterHouse(value);
    // console.log(res)
    if (status === 200) {
      // 把组件筛选数据存放到组件实例的成员属性上
      this.filterDatas = data;
      // console.log("过滤器所有的数据：", this.filterDatas);
    }
  };

  // 渲染picker并提供对应的数据
  renderPicker = () => {
    if (this.isShowPicker()) {
      // 获取对应的picker数据
      const { area, subway, rentType, price } = this.filterDatas;
      const { openType } = this.state;
      // 传递对应的picker数据
      // cols = 1:控制PickerView的列数,默认是一列显示
      let data, cols = 1;

      // 存储当前选中的筛选数据(渲染在picker组件中)
      let curSel = this.selectedValues[openType]

      // 根据openType去取当前点击的picker数据
      switch (openType) {
        case "area":
          data = [area, subway]
          cols = 3
          break;
        case "mode":
          data = rentType
          break;
        case "price":
          data = price
          break;
        default:
          break;
      }
      // value={curSel}:传递当前选中的筛选数据，在下次打开的时候，显示已经选好的数据
      return  <FilterPicker data={data} value={curSel} key={openType} cols={cols} onOk={this.onOk} onCancle={this.onCancle} />    
    }
  };


  // 渲染第四个筛选器
  renderFilterMore = () => {
    const { openType } = this.state
    if (openType === 'more') {
      // 传递后台过滤条件的数据
      // console.log(this.filterDatas)
      const { characteristic, floor, oriented, roomType } = this.filterDatas
      let data = { characteristic, floor, oriented, roomType }

      return (
        <FilterMore data={data} value={this.selectedValues[openType]} onOk={this.onOk} onCancle={this.onCancle} />
      )
    }
  }


  render() {
    return (
      <div className={styles.root}>
        {/* 前三个菜单的遮罩层 */}
        {this.isShowPicker() ? (
          <div className={styles.mask} onClick={this.onCancle} />
        ) : null}

        <div className={styles.content}>
          {/* 标题栏 */}
          {/* 父组件传值给子组件控制状态 */}
          <FilterTitle
            titleSelectedStatus={this.state.titleSelectedStatus}
            onTitleClick={this.onTitleClick}
          />

          {/* 前三个菜单对应的内容： */}
          {this.renderPicker()}

          {/* 最后一个菜单对应的内容： */}
          {this.renderFilterMore()}
        </div>
      </div>
    );
  }
}
