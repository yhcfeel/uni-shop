
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import store from '@/store/store.js'

import {$http} from '@escook/request-miniprogram'

uni.$http = $http

uni.$showMsg = function (title = '数据请求失败',duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

$http.baseUrl = 'https://www.uinav.com'

$http.beforeRequest = function(options) {
	uni.showLoading({
		title:'加载中...'
	})
}
$http.afterRequest = function() {
	uni.hideLoading()
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif