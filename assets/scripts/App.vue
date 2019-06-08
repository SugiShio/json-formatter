<template lang="pug">
section.j-container
  .j-container__col
    el-input(
    v-model='input'
    placeholder='Input text here!'
    )
  .j-container__col
    .j-display
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
