import "normalize.css";
const promiseClick = () => {
  console.log("点击方法被调用");
  let p = new Promise(function (resolve, reject) {
    //做一些异步操作
    setTimeout(function () {
      console.log("执行完成Promise");
      resolve("要返回的数据可以任何数据例如接口返回数据");
    }, 2000);
  });
  return p;
};

function init() {
  let box:any = document.querySelector(".box")

  box.onclick = () => {
    console.log(1);
    promiseClick();
  }
}
init();