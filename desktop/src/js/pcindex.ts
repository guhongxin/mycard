// @ts-ignore
import Swiper from "Swiper";
import "normalize.css";
import "../scss/pcindex.scss";
import "../scss/swiper-bundle.min.css";
import { removeClass } from "../utils/common";
const indicator:HTMLElement = document.querySelector(".indicator");
const heroName:HTMLElement = document.querySelector(".hero-name");
const heroGallery:HTMLElement = document.querySelector(".hero-gallery");
const arrowUp:HTMLElement = document.querySelector(".arrow-up");
const arrowDown:HTMLElement = document.querySelector(".arrow-down");
const checkpointDom:any = document.querySelectorAll(".page2 .checkpoint");
// @ts-ignore
const heroData = [
  {
    name: "通天教主",
    type: require('../assets/img/dao.png'),
    introduce: "截教教主，居于碧游宫，称混元大罗金仙，是为圣人。被鸿钧老祖赐予诛仙四剑，掌杀伐之事，又得到混元金斗先天灵宝。",
    img: require('../assets/img/hero1.png'),
    className: "nezha"
  },
  {
    name: "太阴星君",
    type: require('../assets/img/dao.png'),
    introduce: "月之女神。上古时期三皇五帝之一帝喾的女儿，美貌非凡。与后羿结为夫妻，后升天住于月宫，成为月宫之母。",
    img: require('../assets/img/hero2.png'),
    className: "yangjian"
  },
  {
    name: "净光天女",
    type: require('../assets/img/fo.png'),
    introduce: "曾在灯佛那里听过大涅盘经，由此因缘释迦佛在世时生为净光天女。受持五戒，守护正法，摧伏外道各种邪见。",
    img: require('../assets/img/hero3.png'),
    className: "gonggong"
  },
  {
    name: "金翅大鹏",
    type: require('../assets/img/fo.png'),
    introduce: "走兽以麒麟为之长，飞禽以凤凰为之长。交合之气，育生孔雀与大鹏。如来将其安置于灵山之上，修成六丈金身。",
    img: require('../assets/img/hero4.png'),
    className: "randenɡ"
  },
  {
    name: "百花仙子",
    type: require('../assets/img/yao.png'),
    introduce: "传说中的神仙，担任最美丽的任务，管理天上人间花卉，并统领百花之王。负责百花的开放、衰败、香味等所有事务。",
    img: require('../assets/img/hero5.png'),
    className: "suwukong"
  },
  {
    name: "精卫",
    type: require('../assets/img/yao.png'),
    introduce: "炎帝最小女儿，化为精卫后住发鸠山。形状与乌鸦相似，但头部有花纹。常用嘴夹小碎石，去填东海。",
    img: require('../assets/img/hero6.png'),
    className: "guhongniao"
  },
  {
    name: "慈航道人",
    type: require('../assets/img/ren.png'),
    introduce: "天生至孝纯真，后被女娲娘娘安置于玄都洞八景宫太上老君之处，并传她千手千眼之术，被封为十二金仙之一。",
    img: require('../assets/img/hero7.png'),
    className: "mazu"
  },
  {
    name: "蚩尤",
    type: require('../assets/img/ren.png'),
    introduce: "人系神将，人身牛蹄，四目六手，耳鬓如剑戟，铜头铁额，刀枪不入。天界之战中，与诸神杀的天昏地暗，黄帝不能力敌，后黄帝被尊为兵主，即战争之神。",
    img: require('../assets/img/hero8.png'),
    className: "jiumaoming"
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
    threshold: 20,
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
          createHeroInfor(0)
        } else {
          removeClass(heroName, "hero-name-move");
          let heropictures:any = document.getElementById("heropictures");
          heropictures.innerHTML = ""
          // heroImg.className = "";
        }
      }
    }
  });

  
  let swiper1 = new Swiper('.swiper-container-v', {
    direction: 'horizontal',
    mousewheel: true,
    slidesPerView: 'auto',
    freeMode: true
  });
  // let swiper2 = new Swiper('.swiper-container-v2', {
  //   direction: 'horizontal',
  //   mousewheel: true,
  //   slidesPerView : "auto",
  //   spaceBetween: 10,
  //   initialSlide: 1,
  //   centeredSlides: true,
  //   grabCursor: true,
  //   centeredSlidesBounds: true
  // });
  let swiper2 = new Swiper('.swiper-container-v2', {
    effect: 'coverflow',
    slidesPerView: "auto",
    centeredSlides: true,
    loop: true,
    observer: true,
    observeParents:true,
    coverflowEffect: {
      rotate: 0,
      stretch: 10,
      depth: 130,
      modifier: 4,
      slideShadows: false
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // 切换下标
  indicator.addEventListener("click", function (e:any) {
    let target = e.target;
    if (target.dataset.swiper === 'switchSwiper') {
      // 点击指示器上
      let index:number = Number(target.dataset.index);
      swiper.slideTo(index);
    }
  })
  // 第三部分
  heroGallery.addEventListener("click", function(e:any) {
    let target:any  = e.target;
    if (target.dataset.galleryImg === "img") {
      // 是否是锁的状态
      if (target.dataset.lock === "1") {
        return false
      }
      removeClass(heroName, "hero-name-move");
      let _galleryIndex:number = Number(target.dataset.galleryIndex);
      let index:number = _galleryIndex;
      // (document.querySelector(".hero-name .hero-name-txt") as any).innerHTML = heroData[index]["name"];
      // (document.querySelector(".hero-name .introduce") as HTMLElement).innerHTML = heroData[index]["introduce"];
      // let timer = setTimeout(() => {
      //   heroName.classList.add("hero-name-move");
      //   clearTimeout(timer)
      // }, 50)
      createHeroInfor(index)
    }
  })
  checkpointDom.forEach(element => {
    // 鼠标移动到地图上面执行动画
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
  // 第四屏向上翻页
  arrowUp.addEventListener("click", function() {
    swiper.slideTo(2);
  })
  // 第四屏向下翻页
  arrowDown.addEventListener("click", function() {
    swiper.slideTo(4);
  })
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
// 创建英雄说明
function createHeroInfor(index:number) {
  (document.querySelector(".hero-name .hero-name-txt") as any).innerHTML = heroData[index]["name"];
  (document.querySelector(".hero-name .introduce") as HTMLElement).innerHTML = heroData[index]["introduce"];
  let herotype:any = document.getElementById("herotype");
  // let heroImg:any = document.getElementById("hero-img");
  let heropictures:any = document.getElementById("heropictures");
  let herogalleryItem:any = document.querySelectorAll(".hero-gallery-item img")
  for (let i = 0; i < herogalleryItem.length; i++) {
    if (i === index) {
      herogalleryItem[i].style = ""
    } else {
      herogalleryItem[i].style = "filter: contrast(50%)"
    }
  }
  herotype.src = heroData[index].type;
  heropictures.className = "";
  heropictures.innerHTML = "";
  let timer1 = setTimeout(() => {
    heropictures.className = "hero-pictures";
    heropictures.innerHTML = "";
    let timer = setTimeout(() => {
      heroName.classList.add("hero-name-move");
      heropictures.innerHTML = '<img src="'+ heroData[index].img +'"/>'
      heropictures.classList.add(heroData[index].className)
      clearTimeout(timer)
    }, 50)
    clearTimeout(timer1)
  })

  
}

init();

