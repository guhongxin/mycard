interface RequestParam {
  url:string;
  method: string;
  params?: any;
  data?: any;
}

class Request {
  private baseURL:string;
  constructor(url:string = "./") {
    this.baseURL = url
  }
  getfetch(url:string, params?):any {
    // get请求
    let urlParam:string = "";
    if (params) {
      urlParam = this.parseParam(params)
    }
    let _url = this.baseURL + url + urlParam

    return (window as any).fetch(_url, {mode: 'no-cors'}).then(response => {
      return  response.json()
    })
  }
  postfetch(url:string, data?):any {
    // post 请求
    let _url = this.baseURL + url
    return (window as any).fetch(_url, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
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
