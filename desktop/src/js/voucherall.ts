import "normalize.css";
import "../scss/payment.scss";
import { ountryPaymentType, getQueryVariable } from "../utils/common"; 

const conts:HTMLElement = document.querySelector(".conts");
function init() {
  // 初始化
  let country:string = getQueryVariable("country"); // 获取选中的国家
  let result:string = Object.keys(ountryPaymentType[country]).reduce((total, key) => {
    console.log("key", key);
    let str1:string = ""
    str1 = createPaymentType(key, ountryPaymentType[country][key]);
    total += str1
    return total
  }, "")
  conts.innerHTML = result
  
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
  let paymentTpe:string = `<li class="li" data-channelId=${channel.id}>
    <a href="javascript:void(0)">
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
