// 导入导航图片(图片是base64格式的)
import Nav1 from "../assets/images/nav-1.png";
import Nav2 from "../assets/images/nav-2.png";
import Nav3 from "../assets/images/nav-3.png";
import Nav4 from "../assets/images/nav-4.png";

// 设置栏目导航的本地数据
const Navs = [
  {
    id: 1,
    name: "整租",
    img: Nav1,
    path: "/home/house"
  },
  {
    id: 2,
    name: "合租",
    img: Nav2,
    path: "/home/house"
  },
  {
    id: 3,
    name: "地图找房",
    img: Nav3,
    path: "/map"
  },
  {
    id: 4,
    name: "去出租",
    img: Nav4,
    path: "/rent/add"
  },
];

export default Navs
