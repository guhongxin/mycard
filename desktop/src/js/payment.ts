import Cookies from 'js-cookie';

import "normalize.css";
import "../scss/payment.scss";

import { paymentCountry } from "../utils/common";
import { removeClass } from "../utils/common";
import Request from "../utils/request";
let i18n:any = ($ as any).i18n;
let countryUl = document.querySelector(".country-ul");
let payPalClick:HTMLElement = document.getElementById("payPalClick");
const modal:HTMLElement = document.querySelector(".modal");
const submitBtn:HTMLElement = document.querySelector("#submitBtn");

const httpRequest = new Request("http://192.168.1.16:8087");

let token; // 用户token
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
    if (token) {
      location.href = "dpurchase.html?paymentMethod=PayPal";
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
      removeClass(this, "show");
      let login:HTMLElement = document.querySelector(".login");
      removeClass(this, "show");
      removeClass(login, "login-scale");
      let userNameDom = document.getElementById("userName") as HTMLInputElement;
      let passwordDom = document.getElementById("password") as HTMLInputElement;
      userNameDom.value = "";
      passwordDom.value = "";
    }
  })
  submitBtn.addEventListener("click", function(e:any) {
    // 登录
    let userNameDom = document.getElementById("userName") as HTMLInputElement;
    let passwordDom = document.getElementById("password") as HTMLInputElement;
    let userName:string = userNameDom.value.trim();
    let password:string = passwordDom.value.trim();
    console.log("userName", userName)
    console.log("password", password)
    login({
      username: userName,
      password: password
    })
  });
  // 设置token
  // Cookies.set('name', 'value', { expires: 7 });
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
  httpRequest.postfetch("/user/auth", param).then(res => {
    console.log("----",res)
  }).catch(err => {
    console.log("err", err)
    return false
  })
}
init();