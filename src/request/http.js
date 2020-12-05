import Vue from "vue"
import axios from "axios"
// import QS from 'qs';
// import store from "../store/index"
import router from "@/router/index"
// import layer from "layui-layer"
// 环境的切换
if (process.env.NODE_ENV == "development") {
  axios.defaults.baseURL = process.env.VUE_APP_baseUrl || ''
} else if (process.env.NODE_ENV == "debug") {
  axios.defaults.baseURL = process.env.VUE_APP_baseUrl || ''
} else if (process.env.NODE_ENV == "production") {
  axios.defaults.baseURL = process.env.VUE_APP_baseUrl || ''
}

//设置请求超时
axios.defaults.timeout = 50000

// axios.defaults.withCredentials = true;

//post请求头的设置
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8"

var index = null

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    if (index == null) {
      // index = Vue.prototype.$myLayer.shade()
    }
    // const token = store.state.token
    // token && (config.headers.Authorization = token)
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // layer.close(index)
    // index = null
    if (response.status === 200) {
      //当前后端已拦截了401、403、500等错误信息，返回的是类似{"code":401,"msg":"请登录以后操作","data":null,"success":false}
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response.status) {
      // interceptHttpCodeAndBusinessCode(
      //   error.response.status,
      //   error.response.data.message
      // )
      return Promise.reject(error.response)
    }
  }
)
/**
 * 处理错误码业务
 * @param {Integer} code [http status or 业务中返回的code]
 * @param {String} msg [消息提示文本]
 */
function interceptHttpCodeAndBusinessCode(code, msg) {
  switch (code) {
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      // 清除token
      // store.commit("clearLogin")
      break
    case 403:
      router.replace({
        path: "/no-auth",
      })
      break
    // 404请求不存在
    case 404:
      break
    case 500:
      if (
        msg == "SHORTCIRCUIT" ||
        msg == "GENERAL" ||
        msg == "服务器错误" ||
        msg == "服务器异常" ||
        msg == "服务错误" ||
        msg == "" ||
        msg == "undefined" ||
        msg == "ERROR!" ||
        msg == "null"
      ) {
        console.log(msg)
      } else {
        Vue.prototype.$myLayer.errorLayer(msg)
      }
      break
    // 其他错误，直接抛出错误提示
    default:
      if (
        msg == "SHORTCIRCUIT" ||
        msg == "GENERAL" ||
        msg == "服务器错误" ||
        msg == "服务器异常" ||
        msg == "服务错误" ||
        msg == "" ||
        msg == "undefined" ||
        msg == "ERROR!" ||
        msg == "null"
      ) {
        console.log(msg)
      } else {
        Vue.prototype.$myLayer.errorLayer(msg)
      }
  }
}

function interceptHttpCode200Business(res) {
  if (res.data.code !== 0) {
    interceptHttpCodeAndBusinessCode(res.data.code, res.data.msg)
  }
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * delete方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params,
        headers: {
          Authorization: localStorage.getItem("Authorization"),
        },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
