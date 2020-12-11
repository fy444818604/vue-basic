/**
 * api接口统一管理
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
import Vue from "vue"
import { get, post, del } from "./http"

export const noteSearch = (params) => get('/note/noteSearch',params)
export const componentSearch = (params) => get('/component/search',params)
export const photoSearch = (params) => get('/photos/search',params)
export const labelSearch = () => get('/label/search')