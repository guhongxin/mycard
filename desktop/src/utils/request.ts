interface RequestParam {
  url:string;
  method: string;
  params?: any;
  data?: any;
}

class Request {
  private baseURL:string;
  private jwt: string | undefined;
  constructor(url:string = "./", jwt?) {
    this.baseURL = url;
    this.jwt = jwt;
  }
  getfetch(url:string, params?):any {
    // get请求
    let urlParam:string = "";
    if (params) {
      urlParam = this.parseParam(params)
    }
    let _url = this.baseURL + url + urlParam
    return (window as any).fetch(_url).then(response => {
      return  response.json()
    })
  }
  postfetch(url:string, data?):any {
    // post 请求
    let _url = this.baseURL + url;
    let self = this;
    
    let myHeaders:any = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");
    if (self.jwt) {
      myHeaders.append("jwt", self.jwt);
    }
    return (window as any).fetch(_url, {
      body: JSON.stringify(data),
      method: "POST",
      headers: myHeaders
    }).then(response => {
      return  response.json()
    })
  }
  fetch(param:RequestParam):any {
    let method= param.method.toUpperCase()
    let result:any
    switch(method) {
      case "GET":
        result = this.getfetch(param.url, param.params)
        break
      case "POST":
        result = this.postfetch(param.url, param.data)
        break
    }
    return result
  }
  parseParam(param:any) {
    // js对象转成用&拼接的请求参数（转）
    let result:Array<any> = Object.keys(param).reduce((total, key) => {
      if (param[key]) {
        total.push(key + "=" + param[key])
      }
      return total
    }, [])
    return "?" + result.join("&")
  }
}
export default Request
