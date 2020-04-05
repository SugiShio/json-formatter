import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import lineGetter from '../scripts/json-line-getter'

export default new Vuex.Store({
  state: {
    input: '',
    json: null,
    options: {
      indent: 'space',
      space: 2,
      theme: 'dark',
    },
    modal: {
      title: '',
      contentName: '',
    },
  },

  actions: {
    updateInput({ commit, getters, dispatch, state }, { input }) {
      commit('updateInput', { input })
      if (getters.isValidJson) {
        const json = JSON.parse(state.input)
        commit('setJson', { json })
      } else {
        commit('clearJson')
      }
    },
    setModal({ commit }, { modalTitle, modalContentName }) {
      commit('setModalTitle', { modalTitle })
      commit('setModalContentName', { modalContentName })
    },
  },

  getters: {
    isValidJson: (state) => {
      try {
        return !!JSON.parse(state.input)
      } catch (e) {
        return false
      }
    },
    isEmpty: (state) => {
      return state.input === ''
    },
    theme: (state) => {
      return state.options.theme
    },
    jsonArray: (state) => {
      return lineGetter(state.json)
    },
    indent: (state) => {
      if (state.options.indent === 'tab') return '\t'
      return state.options.space
    },
    stringJson: (state, getters) => {
      if (!getters.isValidJson) return
      return JSON.stringify(state.json, null, getters.indent)
    },
    isModalOpen: (state) => {
      return !!(state.modal.title || state.modal.contentName)
    },
  },

  mutations: {
    updateInput(state, { input }) {
      state.input = input
    },
    setJson(state, { json }) {
      state.json = json
    },
    clearJson(state) {
      state.json = null
    },
    updateOptions(state, { options }) {
      state.options = options
    },
    setModal(state, { title, contentName }) {
      state.modal = { title, contentName }
    },
    resetModal(state) {
      state.modal = {
        title: '',
        contentName: '',
      }
    },
  },
})
