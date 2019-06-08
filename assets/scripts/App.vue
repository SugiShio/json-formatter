<template lang="pug">
section
  el-input(
  v-model='input'
  placeholder='Input text here!'
  )
  div.hoge
    | {{ formattedData }}
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  },
  computed: {
    formattedData() {
      if (!this.input) return
      try {
        const json = JSON.parse(this.input)
        return JSON.stringify(json, null, 4)
      } catch (e) {
        return 'Invalid format'
      }
    }
  }
}
</script>

<style>
.hoge {
  white-space: pre-wrap;
}
</style>
