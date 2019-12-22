<template lang="pug">
div
  el-form(label-width='150px')
    el-form-item(label='Indentation')
      el-radio-group(
        v-model='indent'
        @change='updateOptions')
        el-radio(label='space') Space
        el-radio(label='tab') Tab
    el-form-item(
      v-if='indent === "space"'
      label='Number of space')
      el-input-number(
        v-model='space'
        controls-position='right'
        size='small'
        :min='0'
        :max='10'
        @change='updateOptions')
    el-form-item(label='Theme')
      el-radio-group(
        v-model='theme'
        @change='updateOptions')
        el-radio(label='dark') Dark
        el-radio(label='light') Light
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['options'])
  },
  data() {
    return {
      indent: null,
      space: null,
      theme: 'dark'
    }
  },
  created() {
    this.indent = this.options.indent
    this.space = this.options.space
    this.theme = this.options.theme
  },
  methods: {
    updateOptions() {
      this.$store.commit('updateOptions', {
        options: {
          indent: this.indent,
          space: this.space,
          theme: this.theme
        }
      })
    }
  }
}
</script>
