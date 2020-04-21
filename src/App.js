import React from 'react';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import NotFound from './pages/NotFound'

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
          <Route path="/cityList" component={CityList}></Route>
          <Route path="/map" component={Map}></Route>
          {/* 配置404页面 */}
          <Route component={NotFound}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
