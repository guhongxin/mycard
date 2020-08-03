import "normalize.css";
import "../scss/voucherall.scss";
import { ountryPaymentType, getQueryVariable } from "../utils/common"; 
import { removeClass } from "../utils/common";
import Request from "../utils/request";
const conts:HTMLElement = document.querySelector(".conts");
const modal:HTMLElement = document.querySelector(".modal");
const submitBtn:HTMLElement = document.querySelector("#submitBtn");
let token:string = sessionStorage.getItem("jwt"); // 用户token
let paymentMethod:string;
let channelId: string;

const httpRequest = new Request("http://192.168.1.16:8087");

function init() {
  // 初始化
  let country:string = getQueryVariable("country"); // 获取选中的国家
  let result:string = Object.keys(ountryPaymentType[country]).reduce((total, key) => {
    let str1:string = ""
    str1 = createPaymentType(key, ountryPaymentType[country][key]);
    total += str1
    return total
  }, "");
  conts.innerHTML = result;

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
    let userName = userNameDom.value.trim();
    let password = passwordDom.value.trim();
    login({
      username: userName,
      password: password
    });
  });
}
// 点击渠道绑定事件
(window as any).channelItemClick = function() {
  let dom = (window.event as any).path;
  for (let i = 0; i < dom.length; i++) {
    let tag = dom[i].dataset.tag
    if (tag === "channel") {
      if (token) {
        let _channelId = dom[i].dataset.channelid;
        let _channelName = dom[i].dataset.channelname;
        paymentMethod = _channelName
        channelId = _channelId
        location.href =  `dpurchase.html?paymentMethod=${_channelName}&channelId=${_channelId}`
      } else {
        modal.classList.add("show");
        let login:HTMLElement = document.querySelector(".login");
        let timer = setTimeout(() => {
          login.classList.add("login-scale");
          clearTimeout(timer)
        }, 2)
      }
      return false
    }
  }
}

interface LoginParam {
  username: string;
  password: string;
}
function login(param:LoginParam) {
  httpRequest.postfetch("/user/auth", param).then(res => {
    if (res.code === 0) {
      // 
      let data = res.data; 
      sessionStorage.setItem("jwt", data.token);
      sessionStorage.setItem("appId", data.appId);
      sessionStorage.setItem("userId", data.userId);
      location.href = `./dpurchase.html?paymentMethod=${paymentMethod}&channelId=${channelId}`
    } else {
      alert(res.code)
    }
  }).catch(err => {
    console.log("err", err)
    return false
  })
}
// 创建支付类型
function createPaymentType(key:string, channelData:Array<any>):string {
  console.log("channelData", channelData)
  let paymentTpe:string = `<div class="payment-type">
    <h3>${key}</h3>
    ${createPaymentChannelList(channelData)}
  </div>`
  return paymentTpe
}
// 创建渠道
function createPaymentChannelList(channel:Array<any>):string {
  let channelItem:string = channel.reduce((total, item) => {
    total +=  createPaymentChannelItem(item)
    return total
  }, "")
  let channelList:string = `<ul class="Allcz">${channelItem}</ul>`
  return channelList
}
// 创建单个支付渠道
function createPaymentChannelItem(channel):string {
  let paymentTpe:string = `<li class="li channelItem">
    <a href="javascript:void(0)" onclick="channelItemClick()" data-tag="channel" data-channelid=${channel.id} data-channelname=${channel.name}>
      <img src="${channel.icon}" />
      ${channel.name}
      <div class="sub">
        <img src="${channel.icon}" />
      </div>
    </a>
  </li>`
  return paymentTpe
}

init();
