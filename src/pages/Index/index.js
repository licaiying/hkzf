import React, { Component } from 'react';

// 导入自己封装的 axios
import { BASE_URL } from '../../utils/axios';

// 导入 走马灯(轮播图)组件
import { Carousel } from 'antd-mobile'
import { getSwiper } from '../../utils/api/Home/index.js'


class Index extends Component {

    state = {
        // 轮播图的数据
        swiper: [],
        // 设置轮播图的默认高度
        imgHeight: 176,
      }


      componentDidMount() {
        // 调用函数，获取轮播图数据，渲染页面
        this.getSwiper()
      }


      // 获取轮播图的数据
      getSwiper =  async () => {
        // const res = await axiosAPI.get('/home/swiper')
        const { status, data } = await getSwiper()
        // console.log('page',res)
        if (status === 200) {
            // 处理图片的路径
            // res.data.body.forEach((item)=>{
            //     item.imgSrc = `http://api-haoke-dev.itheima.net${item.imgSrc}`
            // })

            // 修改 swiper 状态数据
            this.setState({
                swiper: data
            })
        }
      }


      render() {
        return (
          <div className="index">
            <Carousel
              autoplay={true} // 轮播图的自动播放
              infinite // 无线循环播放
            >
              {this.state.swiper.map(val => (
                <a
                  key={val.id}
                  href="http://www.itheima.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`${BASE_URL}${val.imgSrc}`}
                    alt=""
                    style={{ width: '100%', verticalAlign: 'top' }}
                    onLoad={() => {
                      // fire window resize event to change height
                      // 窗口大小改变的时候=>让图片自适应=>是 移动端适配
                      window.dispatchEvent(new Event('resize'));
                      this.setState({ imgHeight: 'auto' });
                    }}
                  />
                </a>
              ))}
            </Carousel>
          </div>
        );
      }
}

export default Index;