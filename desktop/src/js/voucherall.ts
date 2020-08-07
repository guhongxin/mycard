import md5 from "blueimp-md5";
import "normalize.css";
import "../scss/voucherall.scss";
import { ountryPaymentType, getQueryVariable } from "../utils/common"; 
import { removeClass } from "../utils/common";
import Request from "../utils/request";
const conts:HTMLElement = document.querySelector(".conts");
const modal:HTMLElement = document.querySelector(".modal");
const submitBtn:HTMLElement = document.querySelector("#submitBtn");

let paymentMethod:string;
let channelId: string;

const httpRequest = new Request("http://interface.18183g.top/interface/h5");

function init() {
  // 初始化
  // var vConsole = new VConsole();
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
  // 获取
  let channelItemButton = document.querySelectorAll(".channelItemButton");
  for (let i = 0; i < channelItemButton.length; i++) {
    channelItemButton[i].addEventListener("click", function() {
      let token:string = sessionStorage.getItem("jwt"); // 用户token
      let _channelId = this.dataset.channelid;
      let _channelName = this.dataset.channelname;
      paymentMethod = _channelName
      channelId = _channelId
      if (token) {
        let country:string = getQueryVariable("country"); // 获取选中的国家
        setTimeout(() => {
          location.href =  `./dpurchase.html?country=${country}&paymentMethod=${_channelName}&channelId=${_channelId}`
        }, 1)
      } else {
        modal.classList.add("show");
        let login:HTMLElement = document.querySelector(".login");
        let timer = setTimeout(() => {
          login.classList.add("login-scale");
          clearTimeout(timer)
        }, 2)
      }
    });
  }
}
// 点击渠道绑定事件
// (window as any).channelItemClick = function() {
//   console.log(this);
//   console.log(window.event);
//   let dom = (window.event as any).path;
//   for (let i = 0; i < dom.length; i++) {
//     let tag = dom[i].dataset.tag
//     if (tag === "channel") {
//       let token:string = sessionStorage.getItem("jwt"); // 用户token
//       let _channelId = dom[i].dataset.channelid;
//       let _channelName = dom[i].dataset.channelname;
//       paymentMethod = _channelName
//       channelId = _channelId
//       if (token) {
//         let country:string = getQueryVariable("country"); // 获取选中的国家
//         setTimeout(() => {
//           location.href =  `./dpurchase.html?country=${country}&paymentMethod=${_channelName}&channelId=${_channelId}`
//         }, 1)
//       } else {
//         modal.classList.add("show");
//         let login:HTMLElement = document.querySelector(".login");
//         let timer = setTimeout(() => {
//           login.classList.add("login-scale");
//           clearTimeout(timer)
//         }, 2)
//       }
//       return false
//     }
//   }
// }

interface LoginParam {
  username: string;
  password: string;
}
function login(param:LoginParam) {
  let passwordMd5 = md5(md5(param.password));
  httpRequest.postfetch(`/user/auth?username=${param.username}&password=${passwordMd5}`).then(res => {
    if (res.code === 0) {
      //
      let country:string = getQueryVariable("country"); // 获取选中的国家
      let data = res.data; 
      sessionStorage.setItem("jwt", data.token);
      sessionStorage.setItem("appId", data.appId);
      sessionStorage.setItem("userId", data.userId);
      location.href = `./dpurchase.html?country=${country}&paymentMethod=${paymentMethod}&channelId=${channelId}`
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
    <a href="javascript:void(0)"
      class="channelItemButton" data-tag="channel" data-channelid=${channel.id} data-channelname=${channel.name} style="cursor:pointer">
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
