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
      name: "哪吒",
      type: require('../assets/img/ren.png'),
      introduce: "灼烧队辅助",
      img: require('../assets/img/nezha2.png'),
      className: "nezha"
    },
    {
      name: "杨戬",
      type: require('../assets/img/ren.png'),
      introduce: "灼烧队辅助",
      img: require('../assets/img/yangjian2.png'),
      className: "yangjian"
    },
    {
      name: "共工",
      type: require('../assets/img/yao.png'),
      introduce: "永动队辅助",
      img: require('../assets/img/gonggong2.png'),
      className: "gonggong"
    },
    {
      name: "燃灯",
      type: require('../assets/img/fo.png'),
      introduce: "暴力队辅助",
      img: require('../assets/img/randenɡ2.png'),
      className: "randenɡ"
    },
    {
      name: "孙悟空",
      type: require('../assets/img/fo.png'),
      introduce: "暴力队输出",
      img: require('../assets/img/suwukong2.png'),
      className: "suwukong"
    },
    {
      name: "姑获鸟",
      type: require('../assets/img/yao.png'),
      introduce: "永动队控制",
      img: require('../assets/img/guhongniao2.png'),
      className: "guhongniao"
    },
    {
      name: "妈祖",
      type: require('../assets/img/ren.png'),
      introduce: "灼烧队输出",
      img: require('../assets/img/mazu2.png'),
      className: "mazu"
    },
    {
      name: "九命猫",
      type: require('../assets/img/yao.png'),
      introduce: "永动队辅助",
      img: require('../assets/img/jiumaoming2.png'),
      className: "jiumaoming"
    }
  ]

  let data = {
    page: 1 // 当前页
  }
  function init() {
    // 初始化
    var vConsole = new VConsole();
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
    })
    createHeroInfor(0);
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
    // $("#herotype").attr("src", heroData[index].type);
    // $(".hero-name-txt").text(heroData[index].name);
    // $(".introduce").text(heroData[index].introduce);
    heroDispaly(heroData[index]);
  };

  // 英雄显示
  function heroDispaly(data) {
    // $(".hero-js").addClass("");
    let heroStr = '<div class="hero-js hero-js-move">'
      + '<div class="hero-name">'
      + '<img src="'+ data.type +'" id="herotype"/>'
      + '<p class="hero-name-txt">'+ data.name +'</p>'
      + '</div>'
      + '<div class="introduce">'
      + data.introduce
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

})

