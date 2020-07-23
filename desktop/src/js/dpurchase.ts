import "normalize.css";
import "../scss/dpurchase.scss";

import { getQueryVariable } from "../utils/common";
function init():void {
  // 初始化
  let paymentMethod:string  = getQueryVariable("paymentMethod");
  let paymentMethodDom:HTMLElement  = document.querySelector(".paymentMethod");
  paymentMethodDom.innerHTML = paymentMethod;
}

init();


