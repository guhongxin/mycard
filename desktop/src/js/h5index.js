// @ts-ignore
import Swiper from "Swiper";
import "normalize.css";
import "../scss/h5index.css";
import "../scss/swiper-bundle.min.css";

$(function() {
  let swiper;
  const levelDescript = [{
    title: "荆棘流域·壹",
    text: ["樵村渔浦，毁于一旦", "渔夫村老，十不存一", "妖兽天灾，堪如灭顶", "昔日风光，何时再现"]
  }, {
    title: "疾行水路·贰",
    text: ["渔村江流，一叶扁舟", "青山绿水，无心留赏", "妖兽危机，愈演愈切", "心急如焚，船行似箭"]
  }, {
    title: "追踪原野·叁",
    text: ["蛛丝马迹，逐寻原野", "危机四伏，前路未知", "枯苗望雨，望眼欲穿", "重逢之时，指日可待"]
  }, {
    title: "观澜港口·肆",
    text: ["繁荣之港，危情千钧", "雾里看花，不明就里", "未雨绸缪，百姓得存", "厉兵秣马，御敌于外"]
  }, {
    title: "聚落废墟·伍",
    text: ["三途聚落，昔日繁华", "兽潮过处，草木不存", "毁灭之后，却待新生", "魑魅魍魉，我自迎上"]
  }, {
    title: "迷雾森林·陆",
    text: ["幽林迷境，冒险伊始", "密林深处，不知其名", "妖兽遍野，终焉将至", "偷天换日，背水一战"]
  }, {
    title: "锦绣河山·柒",
    text: ["秀山依旧，春风花草", "溪云初起，四月芳菲", "千鸟绝飞，万径无踪", "山河仍在，草木已深"]
  }, {
    title: "海岛遗境·捌",
    text: ["昔日伙伴，不知所踪", "寻踪觅迹，线索浮现", "水清木华，信念不弃", "塞翁失马，焉知非福"]
  }, {
    title: "黍秀宫庭·玖",
    text: ["曲径通幽，楼阁隐现", "山间鄙视，难免天灾", "悠游大地，齐人共难", "钟神造化，阴阳昏晓"]
  }, {
    title: "朝圣之路·拾",
    text: ["可堪回首，神呀涉谷", "佛性清净，何处尘埃", "禅祠山下，梦魂所归", "言遇劫火，千年怒潮"]
  }, {
    title: "上古遗阵·拾壹",
    text: ["人族纪元，几经磨炼", "四面妖声，侵掠如火", "上古遗阵，或为奇兵", "异妖之示，福泽困城"]
  }, {
    title: "混乱之城·拾贰",
    text: ["欲使其亡，先使其狂", "宵小之徒，逐一浮现", "大厦将倾，独力难挽", "人事已尽，各安天命"]
  }, {
    title: "御水宝涧·拾叁",
    text: ["古阵之启，尚需奇物", "珍稀灵石，少见于世", "城主府库，或有留存", "铤而走险，火中取栗"]
  }, {
    title: "黄泉酆都·拾肆",
    text: ["彼岸花炽，谁匿香里", "往歌如旧，离合知否", "起忆无人，万里惘然", "灯稀火寒，花叶不见"]
  }, {
    title: "危机之城·拾伍",
    text: ["妖临城下，御水之危", "人心惶惶，满城风雨", "阳城一笑，非我所念", "浪里孤舟，干城之将"]
  }]

  const heroData = [
    {
      name: "通天教主",
      type: require('../assets/img/dao.png'),
      introduce: "截教教主，居于碧游宫，称混元大罗金仙，是为圣人。被鸿钧老祖赐予诛仙四剑，掌杀伐之事，又得到混元金斗先天灵宝",
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
      introduce: "曾在灯佛那里听过大涅盘经，由此因缘释迦佛在世时生为净光天女。受持五戒，守护正法，摧伏外道各种邪见",
      img: require('../assets/img/hero3.png'),
      className: "gonggong"
    },
    {
      name: "金翅大鹏",
      type: require('../assets/img/fo.png'),
      introduce: "走兽以麒麟为之长，飞禽以凤凰为之长。交合之气，育生孔雀与大鹏。如来将其安置于灵山之上，修成六丈金身",
      img: require('../assets/img/hero4.png'),
      className: "randenɡ"
    },
    {
      name: "百花仙子",
      type: require('../assets/img/yao.png'),
      introduce: "传说中的神仙，担任最美丽的任务，管理天上人间花卉，并统领白花之王。负责百花的开放、衰败、香味等所有事务",
      img: require('../assets/img/hero5.png'),
      className: "suwukong"
    },
    {
      name: "精卫",
      type: require('../assets/img/yao.png'),
      introduce: "炎帝最小女儿，后化为精卫后住发鸠山。形状与乌鸦相似，但头部有花纹。常用嘴夹小碎石，去填东海。",
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
      introduce: "人身牛蹄，四目六手，耳鬓如剑戟，铜头铁额，刀枪不入。与诸神杀天昏地暗，黄帝不能力敌，后被尊为兵主，即战争之神。",
      img: require('../assets/img/hero8.png'),
      className: "jiumaoming"
    }
  ]

  let data = {
    page: 1 // 当前页
  }
  const hhero = [{
    img: 'http://material-mhtsdk.jingmakeji.top/2020-08-13/6699613236997791744.gif',
    name: "万龙甲：敖丙所属"
  }, {
    img: 'http://material-mhtsdk.jingmakeji.top/2020-08-17/6700952274354708480.gif',
    name: "火尖枪：哪吒所属"
  }, {
    img: 'http://material-mhtsdk.jingmakeji.top/2020-08-13/6699613605454815232.gif',
    name: "风雷翅：雷震子所属"
  }, {
    img: 'http://material-mhtsdk.jingmakeji.top/2020-08-17/6700952272953810944.gif',
    name: "纯阳剑：吕洞宾所属"
  }, {
    img: 'http://material-mhtsdk.jingmakeji.top/2020-08-13/6699614050650824704.gif',
    name: "金箍棒：孙悟空所属"
  }, {
    img: 'http://material-mhtsdk.jingmakeji.top/2020-08-17/6700952269468344320.gif',
    name: "锦襕袈裟：唐僧所属"
  }, {
    img: "http://material-mhtsdk.jingmakeji.top/2020-08-18/6701332076483977216.gif",
    name: "九齿钉耙：猪八戒所属"
  },]
  const closed = require('../assets/img/closed.png')
  function init() {
    var srcImg1 = new Image();
    srcImg1.src = "http://material-mhtsdk.jingmakeji.top/2020-08-13/6699613236997791744.gif";
    var srcImg2 = new Image();
    srcImg2.src = "http://material-mhtsdk.jingmakeji.top/2020-08-17/6700952274354708480.gif";
    var srcImg3 = new Image();
    srcImg3.src = "http://material-mhtsdk.jingmakeji.top/2020-08-13/6699613605454815232.gif";
    var srcImg4 = new Image();
    srcImg4.src = 'http://material-mhtsdk.jingmakeji.top/2020-08-17/6700952272953810944.gif';
    var srcImg5 = new Image();
    srcImg5.src = 'http://material-mhtsdk.jingmakeji.top/2020-08-13/6699614050650824704.gif';
    var srcImg6 = new Image();
    srcImg6.src = 'http://material-mhtsdk.jingmakeji.top/2020-08-17/6700952269468344320.gif';
    var srcImg7 = new Image();
    srcImg7.src = 'http://material-mhtsdk.jingmakeji.top/2020-08-18/6701332076483977216.gif';
    var srcImg8 = new Image();
    // 初始化
    // var vConsole = new VConsole();
    swiper = new Swiper('.swiper-container-h', {
      direction: 'vertical',
      mousewheel: true,
      on: {
        slideChangeTransitionStart: function(){
          // 第三部分的时候禁用外面滚动
          if (this.activeIndex === 3) {
            this.mousewheel.disable();
          } else {
            if (!this.mousewheel.enabled) {
              this.mousewheel.enable();
            }
          }
          pagination(this.activeIndex);
          if (this.activeIndex === 2) {
            createHeroInfor(0);
          } else {
            heroHidden();
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
      }
    });
    let swiper3 = new Swiper('.swiper-container-v1', {
      direction: 'horizontal',
      mousewheel: true,
      slidesPerView: 'auto',
      on: {
        slideChangeTransitionStart: function(){
          // 第三部分的时候禁用外面滚动
          $('#swiper2 img').css("visibility","visible");
          $(".hero-card").remove()
        }
      }
    });
    
    createHeroInfor(0);
    var srcImg = new Image();
    srcImg.src = require("../assets/img/gameMap.jpg");
    $(srcImg).on("load", function () {     //这里使用的jquery新建一个img对象进行添加attr属性,把src添加上去,然后进行载入事件
      var  mapImgWt = $('.map-img').width();
      $('.map-img').scrollLeft(mapImgWt/2);
    })
    loadfun()
  }
  // 充值
  $("#recharge").click(function() {
    location.href = "./payment.html"
  })
  function pagination(index) {
    // 分页指示器
    data.page = index
    $(".indicator-icon").removeClass("indicator-active").addClass("indicator-noActive")
    .eq(index).addClass("indicator-active").removeClass("indicator-noActive")
  }
  init()
  $(".indicator-icon").click(function(e) {
    let index = this.dataset.index
    swiper.slideTo(index);
  })

  // 点击地图上的图标
  $(".checkpoint").click(function() {
    let index = Number(this.dataset.levelIndex);
    $("#map-coordinates .wz-describe-title")[0].innerHTML = levelDescript[index].title;
    let txt = ""
    for (let i=0; i < levelDescript[index].text.length; i++) {
      txt += "<p>" +  levelDescript[index]['text'][i] + "</p>"
    }
    $("#map-coordinates .description-txt")[0].innerHTML = txt;
  })
  let tump = null;
  Object.defineProperty(data, "page", {
    get: function() {
      return tump
    },
    set: function(value) {
      if (value !== 0 ) {
        $("#menuId").addClass("menu-no-head")
      } else {
        $("#menuId").removeClass("menu-no-head")
      }
      tump = value
    }
  })

  $(".hero-gallery-item img").click(function() {
    if (this.dataset.lock === "1") {
      return false;
    }
    let index = Number(this.dataset.galleryIndex)
    createHeroInfor(index);
  })

  function createHeroInfor(index) {
    heroHidden();
    let heroGalleryImg = $(".hero-gallery-item img")
    for (let i = 0; i < heroGalleryImg.length; i++) {
      if (i === index) {
        heroGalleryImg[i].style = ""
      } else {
        heroGalleryImg[i].style = "filter: contrast(50%)"
      }
    }
    heroDispaly(heroData[index]);
  };

  // 英雄显示
  function heroDispaly(data) {
    let heroStr = '<div class="hero-js hero-js-move">'
      + '<div class="hero-name">'
      + '<img src="'+ data.type +'" id="herotype"/>'
      + '<p class="hero-name-txt">'+ data.name +'</p>'
      + '</div>'
    + '</div>'
    $("#heroParent").append(heroStr)
    $("#heroImgBox").append('<img src="'+ data.img + '" id="hero-img" class="hero-img-move '+data.className+'" />')
  };
  // 英雄隐藏
  function heroHidden() {
    // $(".hero-js").removeClass("hero-js-move");
    $("#heroParent").empty()
    $("#hero-img").remove()
  };
  $("#swiper2 img").click(function() {
    let index = Number($(this).attr("data-imgIndex") || 0);
    let htmlstr = `<div class="hero-card cardHero${index}">
      <div class="hearo-card-content cardHerott${index}">
        <img src="${hhero[index - 1]['img']}">
        <div class="card-js">${hhero[index - 1]['name']}</div>
        <div class="closed">
          <img src="${closed}" />
        </div>
      </div>
    </div>`
    let self = $(this)
    if ($(".hero-card")[0]) {
      $(".hero-card").remove();
      $(this).parent().append(htmlstr);
      self.css("visibility","hidden");
    }  else {
      $(this).parent().append(htmlstr);
      self.css("visibility","hidden");
    }
    
    $(".hero-card .closed").on("click", function() {
      self.parent().find(".hero-card").remove();
      $('#swiper2 img').css("visibility","visible");
    })
  })
})

function loadfun() {
  let imgArr = Array.from($('img'));
  let num = 0;
  let total = imgArr.length; // img 总数
  console.log(imgArr)
  imgArr.forEach(function(i) {
    let img = new Image(); // new 一个新对象
    img.onload = function () {
      img.onload = null;
      num++;
      let percentage = (num*100 / total).toFixed(2)+ '%';
      $('.load-percentage ').text(percentage);
      if (num >= total) {
        (document.querySelector('.load-box ')).style= "display: none";
        (document.querySelector('.app ')).style= "display: block";
      }
    }
    img.src = i.src
  });
}