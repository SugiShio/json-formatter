import 'babel-polyfill'
import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  Radio,
  RadioGroup
} from 'element-ui'
import jsonInput from './components/jsonInput.vue'
import jsonModal from './components/jsonModal.vue'
import jsonOptionPanel from './components/jsonOptionPanel.vue'
import jsonOutput from './components/jsonOutput.vue'

import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component('jsonInput', jsonInput)
Vue.component('jsonModal', jsonModal)
Vue.component('jsonOptionPanel', jsonOptionPanel)
Vue.component('jsonOutput', jsonOutput)

window.addEventListener('DOMContentLoaded', () => {
  new Vue({
    el: '#json-formatter',
    store
  })
})
