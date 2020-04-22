// 地图找房

import React, { Component } from "react";
import "./index.scss";
import { NavBar, Icon } from "antd-mobile";

class Map extends Component {

  componentDidMount() {
    this.initMap();
  }


  // 初始化地图
  initMap = () => {
    // console.log(window)
    const { BMap } = window;
    // console.log(BMap)

    // 1.创建地图实例
    const map = new BMap.Map("container");
    // 2.设置中心点坐标(默认是天安门)
    let point = new BMap.Point(116.404, 39.915);
    // 3.地图初始化，同时设置地图展示级别(设置地图的位置和缩放级别)
    map.centerAndZoom(point, 15);
  };


  render() {
    return (
      <div className="mapBox">
        {/* 导航区域 */}
        <NavBar
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          地图找房
        </NavBar>

        {/* 地图区域 */}
        <div id="container"></div>
      </div>
    );
  }
}

export default Map;
