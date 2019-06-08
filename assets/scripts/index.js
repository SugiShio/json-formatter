global.$ = require('jquery')
import Vue from 'vue'
$(function() {
  var app = new Vue({
    el: '#json-formatter',
    data: {
      message: 'Hello Vue!'
    }
  })
})
