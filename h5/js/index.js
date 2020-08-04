$(function() {
  let swiper;
  let data = {
    page: 1 // 当前页
  }
  function init() {
    // 初始化
    swiper = new Swiper('.swiper-container-h', {
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
            $(".hero-js").addClass("hero-js-move")
          } else {
            $(".hero-js").removeClass("hero-js-move")
          }
        }
      }
    });
  }
  // 充值
  $("#recharge").click(function() {
    location.href = "http://localhost:9000/payment.html"
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
  let tump = null;
  Object.defineProperty(data, "page", {
    get: function() {
      return tump
    },
    set: function(value) {
      console.log("--设置值-", value)
      if (value !==0 ) {
        $("#menuId").addClass("menu-no-head")
      } else {
        $("#menuId").removeClass("menu-no-head")
      }
      tump = value
    }
  })
})