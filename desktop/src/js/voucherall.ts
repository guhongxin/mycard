import "normalize.css";
import "../scss/payment.scss";
import { ountryPaymentType, getQueryVariable } from "../utils/common"; 

const conts:HTMLElement = document.querySelector(".conts");
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
}
// 点击渠道绑定事件
(window as any).channelItemClick = function() {
  let dom = (window.event as any).path;
  for (let i = 0; i < dom.length; i++) {
    let tag = dom[i].dataset.tag
    if (tag === "channel") {
      let channelId = dom[i].dataset.channelid;
      let channelName = dom[i].dataset.channelname;
      location.href =  `dpurchase.html?paymentMethod=${channelName}&channelId=${channelId}`
      return false
    }
  }
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
      <img src="/static/img/Razer Pin.png" />
      ${channel.name}
      <div class="sub">
        <img src="/static/img/ico-04.png" />
      </div>
    </a>
  </li>`
  return paymentTpe
}

init();
