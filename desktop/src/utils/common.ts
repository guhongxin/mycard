// 获取路径参数
export function getQueryVariable(variable:string):string {
  let query = window.location.search.substring(1);
  let vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){
      return pair[1];
    }
  }
  return '';
}
// 移除指定的class

export function removeClass(obj: HTMLElement, classname: string){
  //如果原来有class
  if(obj.className!=""){
      var arrClassName=obj.className.split(" ");
      var _index= arrClassName.indexOf(classname)
      //如果有需要移除的class
      if(_index!=-1){
        arrClassName.splice(_index, 1);  //删除存在的class值
        obj.className=arrClassName.join(" ");   //将数组以空格连接成字符串放到元素的class属性里
      }
  }
  //如果原来没有class无操作
}
// 国家
export const paymentCountry = [{
  country: "马拉西亚",
  nationalflag: "/static/img/ml.gif",
  payMentIcon: "/static/img/mls.png",
  dataloacle: "Malaysia"
}, {
  country: "新加坡",
  nationalflag: "/static/img/xjp.gif",
  payMentIcon: "/static/img/sgp.png",
  dataloacle: "Singapore"
}]
// 国家有哪几种支付种类
export const ountryPaymentType = {
  Malaysia: {
    "E-Wallet": [{
      name: "Razer Gold Wallet",
      icon: "/static/img/1.png",
      id: 1
    }, {
      name: "Boost",
      icon: "/static/img/164.png",
      id: 164
    }, {
      name: "Touch 'n Go",
      icon: "/static/img/165.png",
      id: 165
    }],
    "Online Banking": [{
      name: "FPX",
      icon:"static/img/12.png",
      id: 12
    }
    // {
    //   name: "CIMB Clicks",
    //   icon: "/static/img/21.png",
    //   id: 21
    // }, {
    //   name: "Hong Leong Connect",
    //   icon: "/static/img/22.png",
    //   id: 22
    // }, {
    //   name: "Public Bank",
    //   icon: "/static/img/24.png",
    //   id: 24
    // }, {
    //   name: "RHB Now",
    //   icon: "/static/img/25.png",
    //   id: 25
    // }
    ]
  },
  Singapore: {
    "E-Wallet": [{
      name: "Razer Gold Wallet",
      icon: "/static/img/1.png",
      id: 1
    }, {
      name: "Singtel Dash",
      icon: "/static/img/70.png",
      id: 70
    }, {
      name: "GrabPay",
      icon: "/static/img/124.png",
      id: 124
    }],
    "Online Banking": [{
      name: "eNETS",
      icon: "/static/img/40.png",
      id: 40
    }]
  }
}
// 币种
export const currency = {
  "0": [
    'USD', 'THB', 'PHP', 'SGD'    
  ],
  "1": [
    'AUD', 'BRL', 'EUR', 
    'HKD', 'IDR', 'INR', 
    'MYR', 'NZD', 'PHP', 
    'SGD', 'THB', 'TWD', 
    'USD', 'VND', 'CAD',
    'MXN', 'COP', 'MMK',
    'TRY'
  ],
  "12": ['MYR'],
  "21": ['MYR'],
  "22": ['MYR'],
  "24": ['MYR'],
  "25": ['MYR'],
  "147": ['MYR'],
  "164": ['MYR'],
  "165": ['MYR'],
  "40": ['SGD'],
  "70": ['SGD'],
  "124": ['SGD'],
}