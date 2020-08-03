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
const httpRequest = new Request("http://192.168.1.16:8087/game") // 请求
function init(): void {
  // 初始化
  let paymentMethod: string = getQueryVariable("paymentMethod");
  paymentMethodDom.innerHTML = paymentMethod;
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
      url: "/characters",
      method: "POST",
      data: {
        server_id: serverId
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

interface ItemRequestParam {
  serverId:string | number;
  playerId:string | number;
  currencyCode:string |number
}
// 充值道具列表
function getitemsList(param: ItemRequestParam) {
  return new Promise((resolve, reject) => {
    httpRequest.fetch({
      url: "/items",
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
    console.log("服务值:", server.value);
    console.log("游戏:", gameCurrency.value);
    console.log("characterName:", characterName.value);
    console.log("amount:", amount.value);
    console.log("accept:", accept.checked);
    let _characterNameIndex = characterName.selectedIndex;
    let _amountIndex = amount.selectedIndex;

    let obj = {
      appId: 12312,
      channelId: 12312,
      userId: 1,
      consumerId: characterName.value, // playerId
      consumerName: characterName.options[_characterNameIndex].text, // playerId
      orderDetail: amount.options[_amountIndex].text, // amount id
      productId: amount.value
    };
    var hash = createncryption(obj);
    console.log("--hash--", hash)
  };
}

function createncryption(param:any):string {
  let objKey = Object.keys(param).sort();
  let result = objKey.reduce((total, item) => {
    total.push(item + "=" + param[item])
    return total
  }, []);
  return md5(result.join("&"))
}

// @ts-ignore
paypal.Buttons().render("#paypal-button-container");
// 复位表单
function restForm() {
  server.value = "";
  gameCurrency.value = "";
  characterName.value = "";
  amount.value = "";
  accept.checked = false;
}
