<template lang="pug">
section.j-container
  .j-container__col
    el-input(
    type='textarea'
    v-model='input'
    placeholder='Input text here!'
    :rows='10'
    )
    .j-panel.mt-20
      h2.j-panel__title Options
      el-form(label-width='150px')
        el-form-item(label='Indentation')
          el-radio-group(v-model='indent')
            el-radio(label='tab') Tab
            el-radio(label='space') Space
        el-form-item(label='Number of space' v-if='indent === "space"')
          el-input-number(v-model='space' controls-position='right' size='small' :min='0' :max='10')
        el-form-item(label='Theme')
          el-radio-group(v-model='theme')
            el-radio(label='dark') Dark
            el-radio(label='light') Light

  .j-container__arrow
    i.el-icon-caret-right
  .j-container__col
    .j-display(:class='theme')
      .j-display__code(v-if='isValid')
        row(
        v-for='(item, index) in linedData'
        :key='index'
        :item='item'
        :indent='indentation'
        )
      span.j-display__text(v-else-if='input === ""') Result here
      span.j-display__error(v-else) Invalid format
      textarea.j-display__hidden(ref='copyText') {{ formattedData }}
    el-button.j-button.mt-20(
    @click='copyData'
    size='small'
    type='primary'
    :disabled='!input || !isValid'
    :icon='icon'
    ) Copy
</template>

<script>
import lineGetter from './json-line-getter.js'
import Row from './row.vue'
export default {
  components: { Row },
  data() {
    return {
      input: '',
      indent: 'tab',
      space: 2,
      icon: 'el-icon-paperclip',
      theme: 'dark'
    }
  },
  computed: {
    formattedData() {
      if (!this.json) return
      return JSON.stringify(this.json, null, this.indentation)
    },
    indentation() {
      if (this.indent === 'tab') return '\t'
      return this.space
    },
    isValid() {
      return this.input && !!this.formattedData
    },
    json() {
      if (!this.input) return
      try {
        const json = JSON.parse(this.input)
        return json
      } catch (e) {
        return false
      }
    },
    linedData() {
      if (!this.json) return
      return lineGetter(this.json)
    }
  },
  methods: {
    copyData() {
      if (!this.isValid) return
      this.$refs.copyText.select()
      document.execCommand('copy')
      this.icon = 'el-icon-check'
      setTimeout(() => {
        this.icon = 'el-icon-paperclip'
      }, 3000)
    }
  }
}
</script>
