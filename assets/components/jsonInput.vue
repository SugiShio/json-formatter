<template lang="pug">
.j-input
  textarea.textarea(
    :value='input'
    :class='{ expanded: isOpen }'
    @input='updateInput'
    @focus='isOpen = true'
    @blur='isOpen = false')
</template>

<script>
export default {
  data() {
    return { isOpen: false }
  },
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

<style lang="scss" scoped>
@import '../styles/variables';
.j-input {
  margin: 20px 0;

  .textarea {
    width: 100%;
    height: 50px;
    display: block;
    appearance: none;
    outline: none;
    border: 1px solid $color-border;
    border-radius: 3px;
    padding: 10px;
    transition: height 0.3s;

    &.expanded {
      height: 150px;
    }
  }
}
</style>
