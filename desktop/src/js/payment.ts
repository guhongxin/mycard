import "normalize.css";
import "../scss/voucherall.scss";
let i18n:any = ($ as any).i18n
function init() {
  // 初始化
  let lang = navigator.language || (navigator as any).userLanguage;
  console.log("lang", lang);
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
}

init();