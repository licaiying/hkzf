// tabBar 组件

import React, { Component } from "react";

import { Route } from "react-router-dom";

// tabBar组件
import { TabBar } from "antd-mobile";

// 导入tabBar的配置数据
import TabBarConfig from "../../utils/tabBarConfig";

// 导入样式
import "./index.css";

import Index from "../Index";
import House from "../House";
import Profile from "../Profile";


class Home extends Component {
  state = {
    // 选中状态
    selectedTab: this.props.location.pathname,
  };

  componentDidMount(){
    // console.log(this.props)
    // 监听路由变化 => 不能用PureComponent做性能优化
    // 因为PureComponent比较的是前一次和后一次的值，但是用户的路由的跳转，不一定就是同一个路由，所以不能进行比较
    this.props.history.listen((location)=>{
      // console.log(location)
      if (location.pathname !== this.state.selectedTab){
        // console.log(111)
        this.setState({
          selectedTab: location.pathname,
        });
      }
    })
  }

  // 渲染TabBar组件
  renderTabBar = () => {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white"
      >
        {TabBarConfig.map((item) => (
          <TabBar.Item
            title={item.title}
            key={item.path}
            icon={<i className={`iconfont ${item.icon}`}></i>}
            selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
            selected={this.state.selectedTab === item.path}
            // 点击事件=>切换路由
            onPress={() => {
              // this.setState({
              //   selectedTab: item.path,
              // });
              this.props.history.push(item.path);
            }}
          ></TabBar.Item>
        ))}
      </TabBar>
    );
  };

  render() {
    // console.log(this.props)
    // console.log(this.props.location.pathname);
    return (
      <div className="home">
        {/* 首页的二级路由 */}
        <Route exact path="/home" component={Index}></Route>
        <Route path="/home/house" component={House}></Route>
        <Route path="/home/profile" component={Profile}></Route>

        {/* 标签栏tabBar结构 */}
        <div className="tabBar">
            {this.renderTabBar()}</div>
        </div>
    );
  }
}

export default Home;
