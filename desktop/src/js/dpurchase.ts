import "normalize.css";
import "../scss/dpurchase.scss";

import { getQueryVariable } from "../utils/common";

// 全局变量
const server: HTMLSelectElement = document.getElementById(
  "server"
) as HTMLSelectElement;
const game: HTMLSelectElement = document.getElementById(
  "game"
) as HTMLSelectElement;
const characterID: HTMLInputElement = document.getElementById(
  "characterID"
) as HTMLInputElement;
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

function init(): void {
  // 初始化
  let paymentMethod: string = getQueryVariable("paymentMethod");
  paymentMethodDom.innerHTML = paymentMethod;
  restForm(); // 复位
  submit(); // 提交
}

init();

// 提交
function submit() {
  let button: HTMLElement = document.querySelector(".button");
  button.onclick = () => {
    // console.log("服务值:", server.value);
    // console.log("游戏:", game.value);
    // console.log("characterID:", characterID.value);
    // console.log("characterName:", characterName.value);
    // console.log("amount:", amount.value);
    // console.log("accept:", accept.checked);
  };
}
// @ts-ignore
paypal.Buttons().render("#paypal-button-container");
// 复位表单
function restForm() {
  server.value = "";
  game.value = "";
  characterID.value = "";
  characterName.value = "";
  amount.value = "";
  accept.checked = false;
}
