<template lang="pug">
section.j-container
  .j-container__col
    el-input(
    v-model='input'
    placeholder='Input text here!'
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
  .j-container__col
    .j-display(:class='{ error: !isValid }')
      template(v-if='isValid') {{ formattedData }}
      span(v-else) Invalid format
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
export default {
  data() {
    return {
      input: '',
      isValid: true,
      indent: 'tab',
      space: 2,
      icon: 'el-icon-paperclip'
    }
  },
  computed: {
    formattedData() {
      if (!this.input) return
      try {
        const json = JSON.parse(this.input)
        return JSON.stringify(json, null, this.indentation)
      } catch (e) {
        return false
      }
    },
    indentation() {
      if (this.indent === 'tab') return '\t'
      return this.space
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
  },
  watch: {
    input(value) {
      this.isValid = !value || !!this.formattedData
    }
  }
}
</script>
