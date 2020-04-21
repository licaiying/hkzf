import React, { Component } from 'react';

// 导入 走马灯(轮播图)组件
import { Carousel } from 'antd-mobile'

class Index extends Component {
    state = {
        // 轮播图的数据
        swiper: ['1', '2', '3'],
        // 设置轮播图的默认高度
        imgHeight: 176,
      }
      componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            swiper: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
          });
        }, 100);
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
                  key={val}
                  href="http://www.alipay.com"
                  style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                >
                  <img
                    src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
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