// @ts-ignore
import Swiper from "Swiper";
import "normalize.css";
import "../scss/index.scss";
import "../scss/swiper-bundle.min.css";
import { removeClass } from "../utils/common";

const recharge:HTMLElement = document.getElementById("recharge");
const downApple:HTMLElement = document.getElementById("downApple");
const downGoogle:HTMLElement = document.getElementById("downGoogle");
const indicator:HTMLElement = document.querySelector(".indicator");
const heroName:HTMLElement = document.querySelector(".hero-name");
const heroGallery:HTMLElement = document.querySelector(".hero-gallery");
const checkpointDom:any = document.querySelectorAll(".page2 .checkpoint")
const heroData = [
  {
    name: "东陵圣母",
    introduce: "可以针对不同的媒体类型定义不同的样式"
  },
  {
    name: "李白",
    introduce: "可以针对不同的媒体类型定义不同的样式"
  },
  {
    name: "李白1",
    introduce: "可以针对不同的媒体类型定义不同的样式"
  },
  {
    name: "李白2",
    introduce: "可以针对不同的媒体类型定义不同的样式"
  },
  {
    name: "李白3",
    introduce: "可以针对不同的媒体类型定义不同的样式"
  },
  {
    name: "李白4",
    introduce: "可以针对不同的媒体类型定义不同的样式"
  }
]
const levelDescript = [{
  title: "荆棘流域·壹",
  text: ["樵村渔浦，毁于一旦。", "渔夫村老，十不存一。", "妖兽天灾，堪如灭顶。", "昔日风光，何时再现。"]
}, {
  title: "疾行水路·贰",
  text: ["渔村江流，一叶扁舟。", "青山绿水，无心留赏。", "妖兽危机，愈演愈切。", "心急如焚，船行似箭。"]
}, {
  title: "追踪原野·叁",
  text: ["蛛丝马迹，逐寻原野。", "危机四伏，前路未知。", "枯苗望雨，望眼欲穿。", "重逢之时，指日可待。"]
}, {
  title: "观澜港口·肆",
  text: ["繁荣之港，危情千钧。", "雾里看花，不明就里。", "未雨绸缪，百姓得存。", "厉兵秣马，御敌于外。"]
}, {
  title: "聚落废墟·伍",
  text: ["三途聚落，昔日繁华。", "兽潮过处，草木不存。", "毁灭之后，却待新生。", "魑魅魍魉，我自迎上。"]
}, {
  title: "迷雾森林·陆",
  text: ["幽林迷境，冒险伊始。", "密林深处，不知其名。", "妖兽遍野，终焉将至。", "偷天换日，背水一战。"]
}, {
  title: "锦绣河山·柒",
  text: ["秀山依旧，春风花草。", "溪云初起，四月芳菲。", "千鸟绝飞，万径无踪。", "山河仍在，草木已深。"]
}, {
  title: "海岛遗境·捌",
  text: ["昔日伙伴，不知所踪。", "寻踪觅迹，线索浮现。", "水清木华，信念不弃。", "塞翁失马，焉知非福。"]
}, {
  title: "黍秀宫庭·玖",
  text: ["曲径通幽，楼阁隐现。", "山间鄙视，难免天灾。", "悠游大地，齐人共难。", "钟神造化，阴阳昏晓。"]
}, {
  title: "朝圣之路·拾",
  text: ["可堪回首，神呀涉谷。", "佛性清净，何处尘埃。", "禅祠山下，梦魂所归。", "言遇劫火，千年怒潮。"]
}, {
  title: "上古遗阵·拾壹",
  text: ["人族纪元，几经磨炼。", "四面妖声，侵掠如火。", "上古遗阵，或为奇兵。", "异妖之示，福泽困城。"]
}, {
  title: "混乱之城·拾贰",
  text: ["欲使其亡，先使其狂。", "宵小之徒，逐一浮现。", "大厦将倾，独力难挽。", "人事已尽，各安天命。"]
}, {
  title: "御水宝涧·拾叁",
  text: ["古阵之启，尚需奇物。", "珍稀灵石，少见于世。", "城主府库，或有留存。", "铤而走险，火中取栗。"]
}, {
  title: "黄泉酆都·拾肆",
  text: ["彼岸花炽，谁匿香里。", "往歌如旧，离合知否。", "起忆无人，万里惘然。", "灯稀火寒，花叶不见。"]
}, {
  title: "危机之城·拾伍",
  text: ["妖临城下，御水之危。", "人心惶惶，满城风雨。", "阳城一笑，非我所念。", "浪里孤舟，干城之将。"]
}]
const pageIndex = 0; // 当前页
function init() {
  // 初始化
  removeClass(heroName, "hero-name-move");
  let swiper = new Swiper('.swiper-container-h', {
    direction: 'vertical',
    mousewheel: true,
    on: {
      slideChangeTransitionStart: function(){
        // 第三部分的时候禁用外面滚动
        if (this.activeIndex === 3) {
          this.mousewheel.disable()
        } else {
          if (!this.mousewheel.enabled) {
            this.mousewheel.enable()
          }
        }
        pagination(this.activeIndex);
        if (this.activeIndex === 2) {
          heroName.classList.add("hero-name-move")
        } else {
          removeClass(heroName, "hero-name-move");
        }
      }
    }
  });

  
  let swiper1 = new Swiper('.swiper-container-v', {
    direction: 'horizontal',
    mousewheel: true,
    initialSlide: 0,
    updateOnImagesReady : true,
    slidesPerView: 'auto'
  });

  // 支付点击事件
  recharge.addEventListener("click", function(e:any) {
    location.href = "./payment.html";
  })
  // 下载apple官网
  downApple.addEventListener("click", function(e:any) {
    console.log("下载apple");
  })
  // 下载Google官网
  downGoogle.addEventListener("click", function(e:any) {
    console.log("下载Google官网");
  })
  // 切换下标
  indicator.addEventListener("click", function (e:any) {
    let target = e.target;
    if (target.dataset.swiper === 'switchSwiper') {
      // 点击指示器上
      let index:number = Number(target.dataset.index);
      pagination(index);
      swiper.slideTo(index);
    }
  })
  // 第三部分
  heroGallery.addEventListener("click", function(e:any) {
    let target:any  = e.target;
    if (target.dataset.galleryImg === "img") {
      removeClass(heroName, "hero-name-move");
      let _galleryIndex:number = Number(target.dataset.galleryIndex);
      let index:number = _galleryIndex;
      if (index === 5 || index === 6) {
        return false;
      }
      (document.querySelector(".hero-name .hero-name-txt") as any).innerHTML = heroData[index]["name"];
      (document.querySelector(".hero-name .introduce") as HTMLElement).innerHTML = heroData[index]["introduce"];
      let timer = setTimeout(() => {
        heroName.classList.add("hero-name-move");
        clearTimeout(timer)
      }, 50)
    }
  })
  checkpointDom.forEach(element => {
    let index:number = Number(element.dataset.levelIndex);
    element.addEventListener("mouseover", function(e) {
      document.querySelector(".description-wz .title").innerHTML = levelDescript[index].title;
      let txt = levelDescript[index].text.reduce((total, item:any) => {
        total += "<p>" +  item + "</p>"
        return total;
      }, "");
      document.querySelector(".description-wz .description-txt").innerHTML = txt;
    })
  });
}

// 指示器
function pagination(index:number) {
  let indicatorIcon = document.querySelectorAll(".indicator-icon");
  for (let i = 0; i < indicatorIcon.length; i++) {
    if (i === index) {
      indicatorIcon[i].classList.add("indicator-active");
      removeClass(indicatorIcon[i] as HTMLElement, "indicator-noActive");
    } else {
      removeClass(indicatorIcon[i] as HTMLElement, "indicator-active");
      indicatorIcon[i].classList.add("indicator-noActive");
    }
  }
}

init();

