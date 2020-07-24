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
const pageIndex = 0; // 当前页
function init() {
  // 初始化
  let swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    mousewheel: true,
    on: {
      slideChangeTransitionStart: function(){
        pagination(this.activeIndex);
      }
    }
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

