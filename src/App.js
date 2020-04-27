import React from 'react';

import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFound from './pages/NotFound'
import HouseDetail from './components/HouseDetail';


// 测试按钮
// import {Button} from 'antd-mobile'


function App() {
  return (
    <div className="app">
      <Router>
        {/* <Link to="/home">首页</Link>
        <Link to="/cityList">城市列表</Link>
        <Link to="/map">地图找房</Link> */}
        <Switch>
          {/* 路由重定向 */}
          <Redirect exact from="/" to="/home"></Redirect>
          {/* 项目的一级路由 */}
          <Route path="/home" component={Home}></Route>
          {/* 城市选择列表 */}
          <Route path="/cityList" component={CityList}></Route>
          {/* 地图找房 */}
          <Route path="/map" component={Map}></Route>
          {/* 房源详情 */}
          <Route path="/detail/:id" component={HouseDetail}></Route>
          {/* 配置404页面 */}
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
