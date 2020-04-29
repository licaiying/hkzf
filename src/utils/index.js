// 全局的公共方法

import { getCityInfo } from "./api/City";


// 根据百度地图的API获取定位城市的名字------------------------------
const getCityName = async () => {
  return new Promise((resolve, reject) => {
    let myCity = new window.BMap.LocalCity();
    myCity.get((res) => {
      // console.log(res) // {center: J, level: 12, name: "大同市", code: 355}
      resolve(res.name);
    });
  });
};

// 封装 定位当前城市 的方法，供全局组件使用-------------------------------------
// 思路：1.该方法返回Promise对象=>调用者可以通过async和await的方式，直接获取resolve的数据
//       2.将城市信息存储到本地=>localStorage

// 定义key
const CURR_CITY = "curr_city", HKZF_TOKEN = "hkzf_token";

// 封装本地存储方法
// 1.存储本地数据
export function setLocal(key,val) {
    localStorage.setItem(key,val)
}

// 2.获取本地数据
export function getLocal (key) {
    return localStorage.getItem(key)
}

// 3.删除本地数据
export function delLocal (key) {
    localStorage.removeItem(key)
}

export async function getCurrCity() {
  // 先从本地获取之前存储过的城市定位信息
  let currCity = JSON.parse(getLocal(CURR_CITY));

  // 获取到城市信息，做对比
  let res = await getCityName();
  // console.log(res)
  // 截取 城市名称 去掉‘市’字
  let realName = res.substr(0, 2);
  // console.log(realName)

  // 做判断
  if (!currCity) {
    // 如果本地没有
    // 调用 百度地图的API 获取定位信息，返回Promise对象=>resolve结果
    return new Promise(async (resolve, reject) => {
      // 根据IP定位当前城市的类LocalCity =>是一个构造函数
      // 调用获取定位城市实例
        // 调用接口，获取城市的详细信息
        const { status, data } = await getCityInfo(realName);
        // console.log(data) // {label: "上海", value: "AREA|dbf46d32-7e76-1196"}
        if (status === 200) {
          // 存储到本地
         setLocal(CURR_CITY, JSON.stringify(data));
          // 传递数据
          resolve(data);
        } else {
          reject("error");
        }     
    });
  } else {
    // 如果有，返回本地存储的定位信息
    return Promise.resolve(currCity);
  }
}

export { CURR_CITY, HKZF_TOKEN }
