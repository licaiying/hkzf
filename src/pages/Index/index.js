import React, { Component } from "react";

// 导入自己封装的 axios
import { BASE_URL } from "../../utils/axios";

// 导入 走马灯(轮播图)组件
import { Carousel, Flex, Grid } from "antd-mobile";

// 导入 获取 轮播图数据的接口请求方法
import { getSwiper, getGroups } from "../../utils/api/Home/index.js";

// 导入组件样式文件
import "./index.scss";
import Navs from "../../utils/navConfig";


class Index extends Component {
  state = {
    // 轮播图的数据
    swiper: [],
    // 设置轮播图的默认高度
    imgHeight: 176,
    // 是否自动播放
    isPlay: false,
    // 租房小组数据
    groups:[]
  };

  componentDidMount() {
    // 调用函数，获取轮播图数据，渲染页面
    this.getSwiper();
    this.getGroups()
  }

  // 获取轮播图的数据
  getSwiper = async () => {
    // const res = await axiosAPI.get('/home/swiper')
    const { status, data } = await getSwiper();
    // console.log('page',res)
    if (status === 200) {
      // 处理图片的路径
      // res.data.body.forEach((item)=>{
      //     item.imgSrc = `http://api-haoke-dev.itheima.net${item.imgSrc}`
      // })

      // 修改 swiper 状态数据
      // setState()方法，是一个异步操作
      // 它的第二个参数(是一个函数)可以获取到更新后的数据，所有可通过第二个参数对数据状态做更新修改
      this.setState(
        {
          swiper: data,
        },
        () => {
          // 确保swiper有数据,然后再去更新状态数据
          this.setState({
            isPlay: true,
          });
        }
      );
    }
  };

  // 获取租房小组数据
  getGroups = async () => {
    let {status,data} = await getGroups()
    // console.log(res)
    if (status === 200) {
      this.setState({
        groups:data
      })
    }
  }

  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel
        autoplay={this.state.isPlay} // 轮播图的自动播放
        autoplayInterval={2000} // 自动播放的间隔时间
        infinite // 无线循环播放
      >
        {this.state.swiper.map((val) => (
          <a
            key={val.id}
            href="http://www.itheima.com"
            style={{
              display: "inline-block",
              width: "100%",
              height: this.state.imgHeight,
            }}
          >
            <img
              src={`${BASE_URL}${val.imgSrc}`}
              alt=""
              style={{ width: "100%", verticalAlign: "top" }}
              onLoad={() => {
                // fire window resize event to change height
                // 窗口大小改变的时候=>让图片自适应=>是 移动端适配
                window.dispatchEvent(new Event("resize"));
                this.setState({ imgHeight: "auto" });
              }}
            />
          </a>
        ))}
      </Carousel>
    );
  };

  // 渲染栏目导航
  renderNavs = () => {
    return (
      <Flex className="nav">
        {Navs.map((item) => (
          <Flex.Item
            key={item.id}
            onClick={() => {
              this.props.history.push(item.path);
            }}
          >
            <img src={item.img} alt=""></img>
            <p>{item.name}</p>
          </Flex.Item>
        ))}
      </Flex>
    );
  };

  render() {
    return (
      <div className="index">
        {/* 轮播图区域 */}
        {this.renderSwiper()}

        {/* 栏目导航区域 */}
        {this.renderNavs()}

        {/* 租房小组区域 */}
        <div className="group">
          {/* 标题部分 */}
          <Flex className="group-title" justify="between">
            <h3>租房小组</h3>
            <span>更多</span>
          </Flex>
          {/* 宫格部分 */}
          <Grid
            data={this.state.groups}
            columnNum={2}
            hasLine={false}
            square={false}
            renderItem={(item) => (
              // item结构
              <Flex className="grid-item" justify="between" key={item.id}>
                <div className="desc">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
                <img src={`${BASE_URL}${item.imgSrc}`} alt="" />
              </Flex>
            )}
          />
        </div>
        </div>
    );
  }
}

export default Index;
