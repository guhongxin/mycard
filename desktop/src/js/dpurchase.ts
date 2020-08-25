import "normalize.css";
import "../scss/dpurchase.scss";

import { getQueryVariable, currency } from "../utils/common";
import Request from "../utils/request";
import md5 from "blueimp-md5";

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
// const accept: HTMLInputElement = document.getElementById(
//   "accept"
// ) as HTMLInputElement;
const paymentMethodDom: HTMLElement = document.querySelector(".paymentMethod");
const btnBox: HTMLElement = document.getElementById("btn-box");

const jwt = sessionStorage.getItem("jwt");
const sign = "69a54ac4afafa44ec1ff5bae05a9010c";

let isPayPal:boolean = true;

let data: any = {
  btnLoading: false
};
let orderId: string; // 订单编号
let channelId: string; //

(window as any).paypalOptions = {
  // Call your server to set up the transaction
  createOrder: function (data, actions) {
    let _characterNameIndex = characterName.selectedIndex;
    let _amountIndex = amount.selectedIndex;
    let _character = characterName.value.split("-");
    let obj:any = {
      appId:  _character[1],
      userId: sessionStorage.getItem('userId'),
      channelId: channelId,
      consumerId: _character[0], // playerId
      consumerName: characterName.options[_characterNameIndex].text, // playerId
      orderDetail: amount.options[_amountIndex].text, // amount id
      productId: amount.value,
      currencyCode: gameCurrency.value, // 币种
      serverId: server.value,
      serverName: server.options[server.selectedIndex].text
    };
    let hash:string = createncryption(obj);
    obj.sign = hash
    orderId = "";
    return httpRequest1.getfetch("/create", obj).then(res => {
      console.log("创建订单", res)
      if (res.code === 200) {
        orderId = res.content.orderNo
        console.log("---", orderId);
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
const httpRequest = new Request(
  "http://interface.18183g.top/interface/h5/game",
  // "http://192.168.1.16:8091/interface/h5/game",
  jwt
); // 请求
const httpRequest1 = new Request(
  // "http://192.168.1.16:8091/interface/user-pay/paypal"
  "http://interface.18183g.top/interface/user-pay/paypal"
); // 请求
const httpRequest2 = new Request(
  "http://interface.18183g.top/interface/user-pay/razer"
); // 请求俊忠
function init(): void {
  // 初始化
  if (!jwt) {
    // 如果token 不存在返回到支付页面
    location.href = "./payment.html";
  }
  let paymentMethod: string = getQueryVariable("paymentMethod");
  channelId = getQueryVariable("channelId");
  let country = getQueryVariable("country");
  // 国际是否存在，存在走俊忠支付，否则走payPa来支付
  
  let _currency: any = country ? currency[channelId] : currency["0"];

  // 生成币种下拉
  let currencyString = _currency.reduce((total, itme) => {
    total += `<option value ="${itme}">${itme}</option>`;
    return total;
  }, "<option style='display: none'></option>");
  gameCurrency.innerHTML = currencyString;
  setTimeout(function() {
    gameCurrency.options[1].selected = true;
  }, 5)
  
  // 是否是PayPal支付 true 为是
  isPayPal = country ? false : true;
  if (!isPayPal) {
    let divDom: any = document.createElement("div");
    divDom.classList.add("button");
    divDom.id = "submintBtn";
    divDom.innerHTML = "Recharge Now";
    btnBox.appendChild(divDom);
    // _currency = currency[channelId];
  } else {
    let divDom: any = document.createElement("div");
    divDom.id = "paypal-button-container";
    // divDom.classList.add("button");
    // divDom.innerHTML = "Recharge Now";
    btnBox.appendChild(divDom);
    replacePalpayScript("USD")
    // 获取币种
    // divDom.addEventListener("click", function () {
    //   if (!data.btnLoading) {
    //     data.btnLoading = true;
    //     let _characterNameIndex = characterName.selectedIndex;
    //     let _amountIndex = amount.selectedIndex;
    //     let obj: any = {
    //       appId: sessionStorage.getItem("appId"),
    //       userId: sessionStorage.getItem("userId"),
    //       channelId: channelId,
    //       consumerId: characterName.value, // playerId
    //       consumerName: characterName.options[_characterNameIndex].text, // playerId
    //       orderDetail: amount.options[_amountIndex].text, // amount id
    //       productId: amount.value,
    //       currencyCode: gameCurrency.value, // 币种
    //       serverId: server.value,
    //       serverName: server.options[server.selectedIndex].text
    //     };
    //     let hash: string = createncryption(obj);
    //     obj.sign = hash;
    //     orderId = "";
    //     httpRequest1
    //       .getfetch("/create", obj)
    //       .then(res => {
    //         console.log("创建订单", res);
    //         data.btnLoading = false;
    //         if (res.code === 200) {
    //           location.href = res.content;
    //         } else {
    //           alert(res.message);
    //         }
    //       })
    //       .catch(() => {
    //         data.btnLoading = false;
    //       });
    //   }
    // });
  }
  paymentMethodDom.innerHTML = paymentMethod;
  orderId = "";
  restForm(); // 复位
  submit(); // 提交
  getServerList().then((res: any) => {
    createOptionDom(server, res, "id", "name");
  }); // 服务器列表
  server.addEventListener("change", function () {
    // 监听服务器列表下拉change
    amount.innerHTML = ""; // 复位道具
    getCharacterList(this.value).then((res: any) => {
      createOptionDom1(characterName, res, "playerId", "intro");
    });
  });
  // 币种 change 是否选中角色，如果选中请求充值道具未选中不请求
  gameCurrency.addEventListener("change", function () {
    let playerId: string = characterName.value.split("-")[0];
    if (playerId) {
      let serverId: string = server.value;
      let obj = {
        serverId: serverId,
        playerId: playerId,
        currencyCode: this.value
      };
      getitemsList(obj).then((res: any) => {
        createAmountOptionDom(amount, res);
      });
    }
    if (isPayPal) {
      replacePalpayScript(this.value)
    }
  });
  // 角色 change 是否选中币种，如果未选中提示，否则请求接口
  characterName.addEventListener("change", function () {
    let currencyCode = gameCurrency.value;
    if (!currencyCode) {
      alert("Please select Character Name!");
      return false;
    }
    let serverId: string = server.value;
    let obj = {
      serverId: serverId,
      playerId: this.value,
      currencyCode: currencyCode
    };
    getitemsList(obj).then((res: any) => {
      createAmountOptionDom(amount, res);
    });
  });
}
init();

// 获取服务器列表
function getServerList() {
  return new Promise((resolve, reject) => {
    httpRequest
      .postfetch("/servers")
      .then((res: any) => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          alert(res.message);
        }
      })
      .catch(error => reject(error));
  });
}
// 获取角色列表
function getCharacterList(serverId: string) {
  return new Promise((resolve, reject) => {
    httpRequest
      .fetch({
        url: "/characters" + `?serverId=${serverId}`,
        method: "POST"
      })
      .then((res: any) => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          alert(res.message);
        }
      })
      .catch(error => reject(error));
  });
}

interface ItemRequestParam {
  serverId: string | number;
  playerId: string | number;
  currencyCode: string | number;
}
// 充值道具列表
function getitemsList(param: ItemRequestParam) {
  return new Promise((resolve, reject) => {
    httpRequest
      .fetch({
        url:
          "/items" +
          `?serverId=${param.serverId}&playerId=${param.playerId}&currencyCode=${param.currencyCode}`,
        method: "POST",
        data: {
          server_id: param.serverId,
          player_id: param.playerId,
          currency_code: param.currencyCode
        }
      })
      .then((res: any) => {
        if (res.code === 0) {
          resolve(res.data);
        } else {
          alert(res.message);
        }
      })
      .catch(error => reject(error));
  });
}
// 创建select option
function createOptionDom(
  dom: HTMLElement,
  options: Array<any>,
  valKey,
  textkey
) {
  let result = options.reduce((total, itme) => {
    total += `<option value ="${itme[valKey]}">${itme[textkey]}</option>`;
    return total;
  }, "<option style='display: none'></option>");
  dom.innerHTML = result;
}
// 创建select option
function createOptionDom1(
  dom: HTMLElement,
  options: Array<any>,
  valKey,
  textkey
) {
  let result = options.reduce((total, itme) => {
    total += `<option value ="${itme[valKey]}-${itme['appId']}">${itme[textkey]}</option>`;
    return total;
  }, "<option style='display: none'></option>");
  dom.innerHTML = result;
}

// 创建amount option
function createAmountOptionDom(dom: HTMLElement, options: Array<any>) {
  let result = options.reduce((total, itme) => {
    total += `<option value ="${itme.id}">${itme.name}-${itme.intro}</option>`;
    return total;
  }, "<option style='display: none'></option>");
  dom.innerHTML = result;
}

// 提交
function submit() {
  let button: HTMLElement | undefined = document.getElementById("submintBtn");
  if (button) {
    button.onclick = () => {
      if (!data.btnLoading) {
        let _characterNameIndex = characterName.selectedIndex;
        let _amountIndex = amount.selectedIndex;
        let _character = characterName.value.split("-");
        let obj: any = {
          appId: _character[1],
          channelId: channelId,
          userId: sessionStorage.getItem("userId"),
          serverId: server.value,
          playerId: _character[0], // playerId
          currencyCode: gameCurrency.value, // 币种
          roleName: characterName.options[_characterNameIndex].text, // playerId
          description: amount.options[_amountIndex].text, // amount id
          productId: amount.value,
          serverName: server.options[server.selectedIndex].text
        };
        let hash: string = createncryption(obj);
        obj.sign = hash;
        jzPayment(obj);
      }
    };
  }
}

function createncryption(param: any): string {
  let objKey = Object.keys(param).sort();
  let result = objKey.reduce((total, item) => {
    total.push(item + "=" + param[item]);
    return total;
  }, []);
  return md5(result.join("&") + md5(sign));
}

// 复位表单
function restForm() {
  server.value = "";
  gameCurrency.value = "";
  characterName.value = "";
  amount.value = "";
  // accept.checked = false;
}
// 请求俊忠接口
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
// 监听
let temp = null;
Object.defineProperty(data, "btnLoading", {
  get: function () {
    return temp;
  },
  // @ts-ignore
  set: function (key, value) {
    let submintBtnDom: HTMLElement = document.getElementById("submintBtn");
    let paypalbuttoncontainer: HTMLElement = document.getElementById(
      "paypal-button-container"
    );
    if (key) {
      submintBtnDom && submintBtnDom.classList.add("buttonLoading");
      paypalbuttoncontainer &&
        paypalbuttoncontainer.classList.add("buttonLoading");
    } else {
      submintBtnDom && submintBtnDom.classList.remove("buttonLoading");
      paypalbuttoncontainer &&
        paypalbuttoncontainer.classList.remove("buttonLoading");
    }
    temp = key;
  }
});

function replacePalpayScript(currency) {
  let paypalScript = document.getElementById("paypalScript");
  if (paypalScript) {
    let paypalbuttoncontainer: HTMLElement = document.getElementById(
      "paypal-button-container"
    );
    document.body.removeChild(paypalScript);
    btnBox.removeChild(paypalbuttoncontainer);
  }
  let paypalScriptUrl = paypalUrl(
    "AQQb0039GJAgHsqzTX1QCC_waO7_eBHk5RIHWBVVM2i2eQU3mothZPId8-V_tm4cLJGxfwriAfoJhces",
    // "ARUZtMVLoboHDijPhH-Rye-vdtd8R5ddNmaRQMMrquVECB_vxQq1VDUzATuB3auuD3W5rxaPkBrzT2kU",
    currency
  );
  let script = document.createElement("script");
  script.setAttribute("src", paypalScriptUrl);
  script.setAttribute("id", "paypalScript");
  document.body.appendChild(script);
  script.onload = function () {
    console.log("加载完成", this)
    // @ts-ignore
    if (!document.getElementById("paypal-button-container")) {
      let divDom: any = document.createElement("div");
      divDom.id = "paypal-button-container";
      btnBox.appendChild(divDom);
    }
    setTimeout(function() {
      // @ts-ignore
      paypal.Buttons(paypalOptions).render('#paypal-button-container')
    }, 5)
  }
  // script.onload = function() {
  //   console.log("加载完成")
  //   if (!document.getElementById("paypal-button-container")) {
  //     let divDom: any = document.createElement("div");
  //     divDom.id = "paypal-button-container";
  //     btnBox.appendChild(divDom);
  //   }
  //   // divDom.classList.add("button");
  //   // divDom.innerHTML = "Recharge Now";
  //   setTimeout(function() {
  //     // @ts-ignore
  //     paypal.Buttons(paypalOptions).render('#paypal-button-container')
  //   }, 5)
  // }
  // divDom.classList.add("button");
  // divDom.innerHTML = "Recharge Now";
  
}

function paypalUrl(clientId, currency) {
  let url = new URL("https://www.paypal.com/sdk/js");
  if (clientId) url.searchParams.append("client-id", clientId);
  if (currency) url.searchParams.append("currency", currency);
  url.searchParams.append("disable-funding", "card")
  console.log(url.href);
  return url.href;
}