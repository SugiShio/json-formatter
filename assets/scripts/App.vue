<template lang="pug">
section.j-container
  .j-container__col
    el-input(
    v-model='input'
    placeholder='Input text here!'
    )
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
      isValid: true
    }
  },
  computed: {
    formattedData() {
      if (!this.input) return
      try {
        const json = JSON.parse(this.input)
        return JSON.stringify(json, null, 4)
      } catch (e) {
        return false
      }
    }
  },
  watch: {
    input(value) {
      this.isValid = !value || !!this.formattedData
    }
  }
}
</script>
