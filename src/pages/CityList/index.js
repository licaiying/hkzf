import React, { Component } from "react";
import { getCityList } from "../../utils/api/City";


class CltyList extends Component {

    componentDidMount(){
        this.getCityList()
    }


  // 获取所有城市的列表数据
  getCityList = async () => {
    const res = await getCityList();
    console.log(res); // {status: 200, data: Array(92), description: "请求成功"}
  };



  render() {
    return <div>CltyList</div>;
  }

}

export default CltyList;
