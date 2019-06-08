global.$ = require('jquery')
import Vue from 'vue'
import {
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup
} from 'element-ui'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
$(function() {
  var app = new Vue({
    el: '#json-formatter',
    render: h => h(App)
  })
})
