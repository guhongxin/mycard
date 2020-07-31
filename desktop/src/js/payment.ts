import "normalize.css";
import "../scss/voucherall.scss";
import { paymentCountry } from "../utils/common";

let i18n:any = ($ as any).i18n;
let countryUl = document.querySelector(".country-ul");

function init() {
  // 初始化
  let lang = navigator.language || (navigator as any).userLanguage;
  function loadProperties(lang) {
    i18n.properties({
          name: 'strings',    //属性文件名     命名格式： 文件名_国家代号.properties
          path: '/static/i18n/',   //注意这里路径是你属性文件的所在文件夹
          mode: 'map',
          language: lang,     //这就是国家代号 name+language刚好组成属性文件名：strings+zh -> strings_zh.properties
          callback: function () {
            ($ as any)("[data-locale]").each(function () {
              ($ as any)(this).html(i18n.prop($(this).data("locale")));
            });
          }
      });
  }  
  loadProperties(lang);
  let countryStr = paymentCountry.reduce((total, item) => {
    total += createCountry(item)
    return total
  }, '')
  countryUl.innerHTML = countryStr
}

function createCountry(param):string {
  let li:string = `<li class="li">
  <a href="voucherall.html?country=${param.dataloacle}">
    <img src="/static/img/th-all.jpg" />
    <span data-locale="${param.dataloacle}" style="vertical-align: middle;">${param.dataloacle}</span>
    <div class="sub">
      <img src="${param.nationalflag}" />
    </div>
  </a>
</li>`
  return li
}

init();