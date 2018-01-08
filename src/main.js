// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'//IE打包样式丢失问题，可能是babel-polyfillnode模块装载的位置有关
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

//import {Promise} from "es6-promise"
import "es6-promise/auto" // 引入promise

import store from "./store"
import MyAjax from "./assets/js/MyAjax.js"

/*imageviewer*/
import "./assets/js/units/imageviewer/viewer.css"
import "./assets/js/units/imageviewer/viewer.js"
/*pagination分页*/
import "./assets/js/units/pagination/pagination.css"
/*corpbox*/

import {cookieTool} from "./assets/js/cookieTool.js"
/*自定义指令开始*/
import title from "./assets/js/directive/directive"
/*自定义指令结束*/

import './assets/scss/main.scss'

import './assets/js/common.js'
/*fine-uploader*/
import "./assets/js/units/fine-uploader/fine-uploader.css"
import "./assets/js/units/fine-uploader/fine-uploader.js"
import qq from "fine-uploader"
/*webuploader*/
//import "./assets/js/units/webuploader/webuploader.css"
//import "./assets/js/units/webuploader/webuploader.js"


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

