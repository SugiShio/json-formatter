global.$ = require('jquery')
import Vue from 'vue'
import { Input } from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Input.name, Input)
$(function() {
  var app = new Vue({
    el: '#json-formatter',
    render: h => h(App)
  })
})
