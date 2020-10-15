import "normalize.css";
import "../scss/sdkdpurchase.scss";

import Request from "../utils/request";
import md5 from "blueimp-md5";
import { getQueryVariable } from "../utils/common";

const httpRequest1 = new Request(
  "http://interface.18183g.top/interface/user-pay/paypal"
); // 请求
const httpRequest2 = new Request(
  "http://interface.18183g.top/interface/user-pay/razer"
);// RizeGode
const httpRequestmyCard= new Request(
  "http://interface.18183g.top/interface/user-pay/mycard"
); // myCard
// const httpRequestmyCard= new Request(
//   "http://192.168.1.16:8091/interface/user-pay/mycard"
// )
const sign = "69a54ac4afafa44ec1ff5bae05a9010c";
let orderId: string; // 订单编号
let data: any = {
  btnLoading: false
};
let payMode = '2' // 支付方式
function initial() {
  // 初始化
  // 获取参数
  // 支付方式 1 paypel 2-雷蛇
  let payment:string = getQueryVariable('payment')
  // appId
  let appId: string = getQueryVariable('appId')
  // 用户id
  let userId:string = getQueryVariable('userId')
  // 渠道Id
  let channelId: string = getQueryVariable('channelId')
  // 角色id
  let consumerId: string = getQueryVariable('consumerId')
  // player 角色名
  let consumerName:string = decodeURIComponent(getQueryVariable('consumerName'))
  // 道具详情 
  let orderDetail: string = decodeURIComponent(getQueryVariable('orderDetail'))
  // 道具Id
  let productId: string = getQueryVariable('productId')
  // 币种
  let currencyCode: string = getQueryVariable('currencyCode')
  // 区服Id
  let serverId: string = getQueryVariable('serverId')
  // 区服名
  let serverName: string = decodeURIComponent(getQueryVariable('serverName'))
  payMode = payment
  if (payment === '1') {
    $('.paymentMethod').text('PayPal')
    $('#server').text(serverName)
    $('#gameCurrency').text(currencyCode)
    $('#characterName').text(consumerName)
    $('#amount').text(orderDetail)
    $('.paypal-box').css('display', 'block');
    $('.razerGold-box').css('display', 'none');
    let paypalOptions = {
      // Call your server to set up the transaction
      createOrder: function (data, actions) {
        let obj:any = {
          appId:  appId, // appId
          userId: userId, // userId
          channelId: channelId, // 渠道Id
          consumerId: consumerId, // playerId 角色编号
          consumerName: consumerName, // playerId 角色名
          orderDetail: orderDetail, // 道具详情 
          productId: productId, // 道具Id
          currencyCode: currencyCode, // 币种
          serverId: serverId, // 区服Id
          serverName: serverName // 区服名称
        };
        let hash:string = createncryption(obj);
        obj.sign = hash;
        orderId = "";
        return httpRequest1.getfetch("/create", obj).then(res => {
          console.log("创建订单", res)
          if (res.code === 200) {
            orderId = res.content.orderNo
            return orderId
          } else {
            alert(res.message)
          }
        });
      },
      onApprove: function (data, actions) {
        let obj:any = {
          orderId: orderId
        };
        let hash:string = createncryption(obj);
        obj.sign = hash
        return  httpRequest1.getfetch("/approve", obj).then(res => {
          if (res.code === 200) {
            location.href = "./success.html"
          } else {
            alert(res.code)
            location.href = "./error.html"
          }
        })
      }
    };
    // @ts-ignore
    paypal.Buttons(paypalOptions).render('#btn-box')
  } else if (payment === '3') {
    $('.paymentMethod').text('myCard')
    $('#server').text(serverName)
    $('#gameCurrency').text(currencyCode)
    $('#characterName').text(consumerName)
    $('#amount').text(orderDetail)
    $('.paypal-box').css('display', 'none');
    $('.razerGold-box').css('display', 'block');
  } else {
    $('.paymentMethod').text('Razer Gold')
    $('.paypal-box').css('display', 'none');
    $('.razerGold-box').css('display', 'block');
    $('#server').text(decodeURIComponent(getQueryVariable('serverName')))
    $('#gameCurrency').text(currencyCode)
    $('#characterName').text(decodeURIComponent(getQueryVariable('roleName')))
    $('#amount').text(decodeURIComponent(getQueryVariable('description')))
  }
}

function createncryption(param: any): string {
  let objKey = Object.keys(param).sort();
  let result = objKey.reduce((total, item) => {
    total.push(item + "=" + param[item]);
    return total;
  }, []);
  let _result = result.join("&").replace(/\+/g, ' ')
  return md5(_result + md5(sign));
}
$(function() {
  initial()
  $('#btn-razerGold').on('click', function() {
    if (payMode === '2') {
      let obj: any = {
        appId: getQueryVariable('appId'), // appId
        channelId: getQueryVariable('channelId'), // 渠道Id
        userId: getQueryVariable('userId'), // 用户Id
        serverId: getQueryVariable('serverId'), // 区服Id
        playerId: getQueryVariable('playerId'), // playerId 角色id
        currencyCode: getQueryVariable('currencyCode'), // 币种  
        roleName: decodeURIComponent(getQueryVariable('roleName')), // 角色名
        description: decodeURIComponent(getQueryVariable('description')), // 道具详情
        productId: decodeURIComponent(getQueryVariable('productId')), // 道具Id
        serverName: decodeURIComponent(getQueryVariable('serverName')) // 区服名称
      };
      let hash: string = createncryption(obj);
      obj.sign = hash;
      jzPayment(obj);
    } else {
      let obj:any = {
        appId:  getQueryVariable('appId'), // appId
        userId: getQueryVariable('userId'), // userId
        channelId: getQueryVariable('channelId'), // 渠道Id
        consumerId: getQueryVariable('consumerId'), // playerId 角色编号
        consumerName: decodeURIComponent(getQueryVariable('consumerName')), // playerId 角色名
        orderDetail: decodeURIComponent(getQueryVariable('orderDetail')), // 道具详情 
        productId: getQueryVariable('productId'), // 道具Id
        currencyCode: getQueryVariable('currencyCode'), // 币种
        serverId: getQueryVariable('serverId'), // 区服Id
        serverName: decodeURIComponent(getQueryVariable('serverName')) // 区服名称
      };
      let hash:string = createncryption(obj);
      obj.sign = hash;
      jzMyCard(obj)
    }
   
  })
})

function jzPayment(params: any) {
  data.btnLoading = true;
  httpRequest2
    .getfetch("/getOrderNo", params)
    .then(res => {
      console.log("res", res);
      if (res.code === 200) {
        window.location.href = res.content;
      } else {
        data.btnLoading = false;
        alert(res.content);
        window.location.href = "./error.html"
      }
    })
    .catch(() => {
      data.btnLoading = false;
    });
}
function jzMyCard(params: any) {
  data.btnLoading = true;
  httpRequestmyCard
    .getfetch("/create", params)
    .then(res => {
      console.log("res", res);
      if (res.code === 200) {
        window.location.href = res.content;
      } else {
        data.btnLoading = false;
        alert(res.content);
        window.location.href = "./error.html"
      }
    })
    .catch(() => {
      data.btnLoading = false;
    });
}
// 监听
let temp = null;
Object.defineProperty(data, "btnLoading", {
  get: function () {
    return temp;
  },
  // @ts-ignore
  set: function (key, value) {
    let paypalbuttoncontainer: HTMLElement = document.getElementById("btn-razerGold");
    if (key) {
      paypalbuttoncontainer && paypalbuttoncontainer.classList.add("buttonLoading");
    } else {
      paypalbuttoncontainer && paypalbuttoncontainer.classList.remove("buttonLoading");
    }
    temp = key;
  }
});
