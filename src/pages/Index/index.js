import React, { Component } from "react";

// 导入自己封装的 axios
import { BASE_URL } from "../../utils/axios";

// 导入 走马灯(轮播图)组件
import { Carousel, Flex, Grid, WingBlank, SearchBar } from "antd-mobile";
 
// 导入 获取 轮播图数据的接口请求方法
import { getSwiper, getGroups, getNews } from "../../utils/api/Home/index.js";

// 导入组件样式文件
import "./index.scss";
import Navs from "../../utils/navConfig";
import { getCurrCity } from '../../utils/index.js'

class Index extends Component {
   
  state = {
    // 轮播图的数据
    swiper: [],
    // 租房小组数据
    groups: [],
    // 最新资讯数据
    news: [],
    // 头部搜索的关键字
    keyword:'',
    // 设置轮播图的默认高度
    imgHeight: 176,
    // 是否自动播放
    isPlay: false,
    // 当前城市信息
    currCity:{
      label:'--', // 定位标志
      value:''  // 
    }
  };

  componentDidMount() {
    // 调用函数，获取轮播图数据，渲染页面
    // this.getSwiper();
    // this.getGroups();
    // this.getNews();
    this.getAllDatas();
    this.getCurrCity();
  }

  // 调用方法，获取定位信息
  getCurrCity = async () => {
    const res = await getCurrCity()
    // console.log(res)
    this.setState({
      currCity:res
    })
  }

  // 根据百度地图获取当前定位城市
  // getCurCity = () => {
  //   // 改造前写法：
  //   // callback回调函数
  //   // function myFun(result){
  //   //   let cityName = result.name;
  //   //   console.log("当前定位城市:"+cityName); // 当前定位城市:大同市
  //   // }
  //   // // 根据IP定位当前城市的类LocalCity =>是一个构造函数
  //   // let myCity = new window.BMap.LocalCity();
  //   // // 调用获取定位城市实例
  //   // myCity.get(myFun); 

  //   // 改造后写法：    
  //   // 根据IP定位当前城市的类LocalCity =>是一个构造函数
  //   let myCity = new window.BMap.LocalCity();
  //   // 调用获取定位城市实例
  //   myCity.get(async (result)=>{
  //     // console.log(result) // {center: J, level: 12, name: "大同市", code: 355}
  //     // let cityName = result.name;
  //     // console.log("当前定位城市:"+cityName); // 当前定位城市:大同市

  //     // 调用接口，获取城市的详细信息
  //     const {status,data} = await getCityInfo(result.name)
  //     // console.log(data) // {label: "上海", value: "AREA|dbf46d32-7e76-1196"}
  //     if (status === 200) {
  //       this.setState({
  //         currCity:data // 后台的数据只有：北京、上海、广州、深圳 四个城市
  //       })
  //     }
  //   }); 
  // }


  // 获取首页所有接口数据的方法
  // 使用Promise.all方法，传入一个包含多个Promise对象的数组，返回resolve结果数据
  // 目的: 简化发送请求的重复代码
  getAllDatas = async () => {
    // const p1 = Promise.resolve(1)  // 返回Promise对象 === new Promise()
    // const p2 = Promise.resolve([{a:1},{b:2}])
    // let res = await Promise.all([p1,p2])
    // console.log(res) // [1,[{a:1},{b:2}]]

   try {
      let [swiper,groups,news] = await Promise.all([getSwiper(),getGroups(),getNews()])
      // console.log(swiper,groups,news)  // 返回的是向后台请求的各个字段的接口数据
      if (swiper.status === 200 && groups.status === 200 && news.status === 200) {
        this.setState({
          swiper:swiper.data,
          groups:groups.data,
          news:news.data
        },()=>{
          this.setState({
            isPlay:true
          })
        })
      }
    } catch (error) {
      console.log(error)
    }
  }


  // // 获取轮播图的数据
  // getSwiper = async () => {
  //   // const res = await axiosAPI.get('/home/swiper')
  //   const { status, data } = await getSwiper();
  //   // console.log('page',res)
  //   if (status === 200) {
  //     // 处理图片的路径
  //     // res.data.body.forEach((item)=>{
  //     //     item.imgSrc = `http://api-haoke-dev.itheima.net${item.imgSrc}`
  //     // })

  //     // 修改 swiper 状态数据
  //     // setState()方法，是一个异步操作
  //     // 它的第二个参数(是一个函数)可以获取到更新后的数据，所有可通过第二个参数对数据状态做更新修改
  //     this.setState(
  //       {
  //         swiper: data,
  //       },
  //       () => {
  //         // 确保swiper有数据,然后再去更新状态数据
  //         this.setState({
  //           isPlay: true,
  //         });
  //       }
  //     );
  //   }
  // };

  // // 获取租房小组数据
  // getGroups = async () => {
  //   let { status, data } = await getGroups();
  //   // console.log(res)
  //   if (status === 200) {
  //     this.setState({
  //       groups: data,
  //     });
  //   }
  // };

  // // 获取最新资讯数据
  // getNews = async () => {
  //   const { status, data } = await getNews();
  //   // console.log(status,data)
  //   if (status === 200) {
  //     this.setState({
  //       news: data,
  //     });
  //   }
  // };

  // 渲染顶部导航
  renderTopNav = () => {
    const { push } = this.props.history
    return (
      <Flex justify="around" className="topNav">
        <div className="searchBox">
          <div className="city" onClick={()=>{
            push('/cityList')
          }}>
            {this.state.currCity.label}<i className="iconfont icon-arrow" />
          </div>
          <SearchBar
          // 受控组件(数据的双向绑定)
            value={this.state.keyword}
            onChange={(v) => this.setState({ keyword: v })}
            placeholder="请输入小区或地址"
          />
        </div>
        <div className="map" onClick={()=>{
          push('/map')
        }}>
          <i key="0" className="iconfont icon-map" />
        </div>
      </Flex>
    )
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

  // 渲染租房小组
  renderGroups = () => {
    return (
      // <></>:空标签，是一个占位符，相当于<div></div>
      <> 
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
      </>
    );
  };

  // 渲染最新资讯
  renderNews() {
    return this.state.news.map((item) => (
      <div className="news-item" key={item.id}>
        <div className="imgwrap">
          <img className="img" src={`${BASE_URL}${item.imgSrc}`} alt="" />
        </div>
        <Flex className="content" direction="column" justify="between">
          <h3 className="title">{item.title}</h3>
          <Flex className="info" justify="between">
            <span>{item.from}</span>
            <span>{item.date}</span>
          </Flex>
        </Flex>
      </div>
    ));
  }

  render() {
    return (
      <div className="index">
        {/* 头部搜索区域 */}
        {this.renderTopNav()}

        {/* 轮播图区域 */}
        {this.renderSwiper()}

        {/* 栏目导航区域 */}
        {this.renderNavs()}

        {/* 租房小组区域 */}
        <div className="group">
          {this.renderGroups()}
        </div>

        {/* 最新资讯区域 */}
        <div className="news">
          <h3 className="group-title">最新资讯</h3>
          <WingBlank size="md">{this.renderNews()}</WingBlank>
        </div>
        </div>
    );
  }
}

export default Index;
