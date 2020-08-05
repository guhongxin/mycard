import Cookies from 'js-cookie';
import md5 from "blueimp-md5";
import "normalize.css";
import "../scss/payment.scss";

import { paymentCountry, getQueryVariable } from "../utils/common";
import { removeClass } from "../utils/common";
import Request from "../utils/request";
let i18n:any = ($ as any).i18n;
let countryUl = document.querySelector(".country-ul");
let payPalClick:HTMLElement = document.getElementById("payPalClick");
const modal:HTMLElement = document.querySelector(".modal");
const submitBtn:HTMLElement = document.querySelector("#submitBtn");

const httpRequest = new Request("http://192.168.1.16:8091/interface/h5");

function init() {
  // 初始化
  let lang = navigator.language || (navigator as any).userLanguage;
  function loadProperties(lang) {
    i18n.properties({
          name: 'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
          path: '/static/i18n/',   //注意这里路径是你属性文件的所在文件夹
          mode: 'map',
          language: lang,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
          callback: function () {
            ($ as any)("[data-locale]").each(function () {
              ($ as any)(this).html(i18n.prop($(this).data("locale")));
            });
          }
      });
  }  
  loadProperties(lang);
  let countryStr = paymentCountry.reduce((total, item) => {
    total += createCountry(item)
    return total
  }, '')
  countryUl.innerHTML = countryStr
  // payPal支付
  payPalClick.addEventListener("click", function() {
    let jwt:string = sessionStorage.getItem("jwt")
    if (jwt) {
      let _channelId = sessionStorage.getItem("_channelId")
      setTimeout(() => {
        location.href = `./dpurchase.html?paymentMethod=PayPal&channelId=${_channelId}`;
      }, 2)
    } else {
      modal.classList.add("show");
      let login:HTMLElement = document.querySelector(".login");
      let timer = setTimeout(() => {
        login.classList.add("login-scale");
        clearTimeout(timer)
      }, 2)
    }
  })
  // 点击弹窗，隐藏
  modal.addEventListener("click", function(e:any) {
    let target = e.target;
    if (target.dataset.tag === "modal") {
      // 点击阴影部分
      let userNameDom = document.getElementById("userName") as HTMLInputElement;
      let passwordDom = document.getElementById("password") as HTMLInputElement;
      userNameDom.value = "";
      passwordDom.value = "";
      removeClass(this, "show");
      let login:HTMLElement = document.querySelector(".login");
      removeClass(this, "show");
      removeClass(login, "login-scale");
    }
  })
  submitBtn.addEventListener("click", function(e:any) {
    // 登录
    let userNameDom = document.getElementById("userName") as HTMLInputElement;
    let passwordDom = document.getElementById("password") as HTMLInputElement;
    let userName:string = userNameDom.value.trim();
    let password:string = passwordDom.value.trim();
    login({
      username: userName,
      password: password
    });
  });
  // 设置token
  // Cookies.set('name', 'value', { expires: 7 });
  // 路径获取token 存在获取用户信息
  let Urltoken: string = getQueryVariable("token");
  if (Urltoken) {
    getUser(Urltoken)
  }
}

function createCountry(param):string {
  let li:string = `<li class="li">
  <a href="voucherall.html?country=${param.dataloacle}">
    <img src="${param.payMentIcon}" />
    <span data-locale="${param.dataloacle}" style="vertical-align: middle;">${param.dataloacle}</span>
    <div class="sub">
      <img src="${param.nationalflag}" />
    </div>
  </a>
</li>`
  return li
}
interface LoginParam {
  username: string;
  password: string;
}
function login(param:LoginParam) {
  let passwordMd5 = md5(md5(param.password));
  httpRequest.postfetch(`/user/auth?username=${param.username}&password=${passwordMd5}`).then(res => {
    if (res.code === 0) {
      // 
      let data = res.data; 
      sessionStorage.setItem("jwt", data.token);
      sessionStorage.setItem("appId", data.appId);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("_channelId", data.channelId);
      location.href = `./dpurchase.html?paymentMethod=payPal&channelId=${data.channelId}`
    } else {
      alert(res.code)
    }
  }).catch(err => {
    console.log("err", err)
    return false
  })
}
// 获取用户信息
function getUser(param:string) {
  httpRequest.postfetch(`/user/detail?token=${param}`).then(res => {
    if (res.code === 0) {
      // 
      let data = res.data; 
      sessionStorage.setItem("jwt", data.token);
      sessionStorage.setItem("appId", data.appId);
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("_channelId", data.channelId);
    } else {
      alert(res.code)
    }
  }).catch(err => {
    console.log("err", err)
    return false
  })
}
init();