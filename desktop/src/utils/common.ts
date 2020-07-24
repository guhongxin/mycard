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