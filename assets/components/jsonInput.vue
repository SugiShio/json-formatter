<template lang="pug">
div
  input(
    type='textarea'
    :value='input'
    @change='updateInput')
</template>

<script>
export default {
  computed: {
    input() {
      return this.$store.state.input
    }
  },
  methods: {
    updateInput(e) {
      this.$store.dispatch('updateInput', { input: e.target.value })
    }
  }
}
</script>
