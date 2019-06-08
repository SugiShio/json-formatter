global.$ = require('jquery')
import Vue from 'vue'
import { Input, Main, Footer, Container, Row, Col } from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Input.name, Input)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
Vue.component(Container.name, Container)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
$(function() {
  var app = new Vue({
    el: '#json-formatter',
    render: h => h(App)
  })
})
