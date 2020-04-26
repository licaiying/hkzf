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

  // 点击 确定 按钮时，关闭Picker组件
  onOk = () => {
    this.setState({
      openType: "",
    });
  };

  // 点击 取消 按钮时，关闭Picker组件
  onCancle = () => {
    this.setState({
      openType: "",
    });
  };

  componentDidMount() {
    this.getFilterData();
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
      return  <FilterPicker data={data} cols={cols} onOk={this.onOk} onCancle={this.onCancle} />    
    }
  };

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
          {/* <FilterMore /> */}
        </div>
      </div>
    );
  }
}
