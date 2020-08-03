import "normalize.css";
import "../scss/dpurchase.scss";

import { getQueryVariable } from "../utils/common";
import Request from "../utils/request"
import md5 from "blueimp-md5"

// 全局变量
const server: HTMLSelectElement = document.getElementById(
  "server"
) as HTMLSelectElement;
const gameCurrency: HTMLSelectElement = document.getElementById(
  "gameCurrency"
) as HTMLSelectElement;
// const characterID: HTMLInputElement = document.getElementById(
//   "characterID"
// ) as HTMLInputElement;
const characterName: HTMLSelectElement = document.getElementById(
  "characterName"
) as HTMLSelectElement;
const amount: HTMLSelectElement = document.getElementById(
  "amount"
) as HTMLSelectElement;
const accept: HTMLInputElement = document.getElementById(
  "accept"
) as HTMLInputElement;
const paymentMethodDom: HTMLElement = document.querySelector(".paymentMethod");

const jwt = sessionStorage.getItem("jwt");
const sign = "69a54ac4afafa44ec1ff5bae05a9010c";
let orderId:string; // 订单编号
const httpRequest = new Request("http://192.168.1.16:8087/game", jwt) // 请求
const httpRequest1 = new Request("http://192.168.1.16:8093") // 请求
function init(): void {
  // 初始化
  let paymentMethod: string = getQueryVariable("paymentMethod");
  paymentMethodDom.innerHTML = paymentMethod;
  orderId = "";
  restForm(); // 复位
  submit(); // 提交
  getServerList().then((res:any) => {
    createOptionDom(server, res, "id", "name");
  }); // 服务器列表
  server.addEventListener("change", function() {
    // 监听服务器列表下拉change
    amount.innerHTML = ""; // 复位道具
    getCharacterList(this.value).then((res:any) => {
      createOptionDom(characterName, res, "playerId", "intro")
    })
  })
  // 币种 change 是否选中角色，如果选中请求充值道具未选中不请求
  gameCurrency.addEventListener("change", function() {
    let playerId:string = characterName.value;
    if (playerId) {
      let serverId:string = server.value;
      let obj = {
        serverId: serverId,
        playerId: playerId,
        currencyCode: this.value
      }
      getitemsList(obj).then((res:any) => {
        createAmountOptionDom(amount, res);
      })
    }
  })
  // 角色 change 是否选中币种，如果未选中提示，否则请求接口
  characterName.addEventListener("change", function() {
    let currencyCode = gameCurrency.value;
    if (!currencyCode) {
      alert("Please select Character Name!")
      return false
    }
    let serverId:string = server.value;
    let obj = {
      serverId: serverId,
      playerId: this.value,
      currencyCode: currencyCode
    }
    getitemsList(obj).then((res:any) => {
      createAmountOptionDom(amount, res);
    })
  })
}
init();

// 获取服务器列表
function getServerList() {
  return new Promise((resolve, reject) => {
    httpRequest.postfetch("/servers").then((res:any) => {
      if (res.code === 0) {
        resolve(res.data)
      } else {
        alert(res.message)
      }
    }).catch(error => reject(error))
  })
}
// 获取角色列表
function getCharacterList(serverId:string) {
  return new Promise((resolve, reject) => {
    httpRequest.fetch({
      url: "/characters" + `?serverId=${serverId}`,
      method: "POST"
    }).then((res:any) => {
      if (res.code === 0) {
        resolve(res.data)
      } else {
        alert(res.message)
      }
    }).catch(error => reject(error))
  })
}

interface ItemRequestParam {
  serverId:string | number;
  playerId:string | number;
  currencyCode:string |number
}
// 充值道具列表
function getitemsList(param: ItemRequestParam) {
  return new Promise((resolve, reject) => {
    httpRequest.fetch({
      url: "/items" + `?serverId=${param.serverId}&playerId=${param.playerId}&currencyCode=${param.currencyCode}`,
      method: "POST",
      data: {
        server_id: param.serverId,
        player_id: param.playerId,
        currency_code: param.currencyCode
      }
    }).then((res:any) => {
      if (res.code === 0) {
        resolve(res.data)
      } else {
        alert(res.message)
      }
    }).catch(error => reject(error))
  })
}
// 创建select option
function createOptionDom(dom:HTMLElement, options:Array<any>, valKey, textkey) {
  let result = options.reduce((total, itme) => {
    total += `<option value ="${itme[valKey]}">${itme[textkey]}</option>`
    return total
  }, "<option style='display: none'></option>");
  dom.innerHTML = result
}

// 创建amount option
function createAmountOptionDom(dom:HTMLElement, options:Array<any>) {
  let result = options.reduce((total, itme) => {
    total += `<option value ="${itme.id}">${itme.name}-${itme.intro}</option>`
    return total
  }, "<option style='display: none'></option>");
  dom.innerHTML = result
}

// 提交
function submit() {
  let button: HTMLElement = document.querySelector(".button");
  button.onclick = () => {
    let _characterNameIndex = characterName.selectedIndex;
    let _amountIndex = amount.selectedIndex;
    let obj = {
      appId: sessionStorage.getItem('appId'),
      channelId: sessionStorage.getItem('channelId'),
      userId: sessionStorage.getItem('userId'),
      consumerId: characterName.value, // playerId
      consumerName: characterName.options[_characterNameIndex].text, // playerId
      orderDetail: amount.options[_amountIndex].text, // amount id
      productId: amount.value
    };
    var hash = createncryption(obj);
  };
}

function createncryption(param:any):string {
  let objKey = Object.keys(param).sort();
  let result = objKey.reduce((total, item) => {
    total.push(item + "=" + param[item])
    return total
  }, []);
  console.log(result.join("&") )
  return md5(result.join("&") + sign)
}

// @ts-ignore
paypal.Buttons({
  style: {
    size: 'small',
    color: 'blue',
    shape: 'pill'
  },
  // Call your server to set up the transaction
  createOrder: function (data, actions) {
    let _characterNameIndex = characterName.selectedIndex;
    let _amountIndex = amount.selectedIndex;
    let obj:any = {
      appId: sessionStorage.getItem('appId'),
      channelId: sessionStorage.getItem('channelId'),
      userId: sessionStorage.getItem('userId'),
      consumerId: characterName.value, // playerId
      consumerName: characterName.options[_characterNameIndex].text, // playerId
      orderDetail: amount.options[_amountIndex].text, // amount id
      productId: amount.value
    };
    let hash:string = createncryption(obj);
    obj.sign = hash
    orderId = "";
    console.log("---", obj);
    return httpRequest1.getfetch("/paypal/create", obj).then(res => {
      console.log("创建订单", res)
    });
  },

  // Call your server to finalize the transaction
  onApprove: function (data, actions) {
      console.trace(data);
      return fetch('http://192.168.1.16:8093/paypal/approve', {
          method: 'post',
          body: JSON.stringify({orderId: data.orderID})
      }).then(function (res) {
          return res.json();
      }).then(function (orderData) {
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show a success / thank you message

          // Your server defines the structure of 'orderData', which may differ
          var errorDetail = Array.isArray(orderData.details) && orderData.details[0];

          if (errorDetail && errorDetail.issue === 'INSTRUMENT_DECLINED') {
              // Recoverable state, see: "Handle Funding Failures"
              // https://developer.paypal.com/docs/checkout/integration-features/funding-failure/
              return actions.restart();
          }

          if (errorDetail) {
              var msg = 'Sorry, your transaction could not be processed.';
              if (errorDetail.description) msg += '\n\n' + errorDetail.description;
              if (orderData.debug_id) msg += ' (' + orderData.debug_id + ')';
              // Show a failure message
              return alert(msg);
          }

          // Show a success message to the buyer
          alert('Transaction completed by ' + orderData.payer.name.given_name);
      });
  }
}).render("#paypal-button-container")

// 复位表单
function restForm() {
  server.value = "";
  gameCurrency.value = "";
  characterName.value = "";
  amount.value = "";
  accept.checked = false;
}
