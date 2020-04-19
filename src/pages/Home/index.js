// tabBar 组件

import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom'

import Index from '../Index'
import House from '../House'
import Profile from '../Profile'

class Home extends Component {
    render() {
        return (
            <div className="home">
                {/* 首页的二级路由 */}
                <Link to="/home">首页</Link>
                <Link to="/home/house">找房</Link>
                <Link to="/home/profile">我的</Link>
                <Route exact path="/home" component={Index}></Route>
                <Route path="/home/house" component={House}></Route>
                <Route path="/home/profile" component={Profile}></Route>
            </div>
        );
    }
}

export default Home;