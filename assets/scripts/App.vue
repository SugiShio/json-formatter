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
          el-input-number(v-model='space' controls-position='right' size='small')
  .j-container__col
    .j-display(:class='{ error: !isValid }')
      template(v-if='isValid') {{ formattedData }}
      span(v-else) Invalid format
</template>

<script>
export default {
  data() {
    return {
      input: '',
      isValid: true,
      indent: 'tab',
      space: 2
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
  watch: {
    input(value) {
      this.isValid = !value || !!this.formattedData
    }
  }
}
</script>
