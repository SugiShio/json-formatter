<template lang="pug">
  .j-display(:class='theme')
    .j-copy(
      v-if='isValidJson'
      @click='copyData')
      i.el-icon-document-copy
    .j-display__code(v-if='isValidJson')
      row(
      v-for='(item, index) in jsonArray'
      :key='index'
      :item='item'
      :indent='indent'
      )
    span.j-display__text(v-else-if='isEmpty') Result here
    span.j-display__error(v-else) Invalid format
    textarea.j-display__hidden(ref='copyText') {{ stringJson }}
</template>

<script>
import Row from './row.vue'
import { mapGetters } from 'vuex'
export default {
  components: { Row },
  computed: {
    ...mapGetters([
      'isValidJson',
      'jsonArray',
      'indent',
      'stringJson',
      'isEmpty',
      'theme'
    ])
  },
  methods: {
    copyData() {
      if (!this.isValidJson) return
      this.$refs.copyText.select()
      document.execCommand('copy')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';
.j-display {
  position: relative;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #eee;
  border-radius: 4px;

  &__code {
    width: 100%;
    height: 100%;
    padding: 9px 15px;

    * {
      font-family: $font-monospace;
    }
  }

  &__row {
    white-space: pre-wrap;
    word-break: break-all;
  }

  &__hidden {
    width: 0;
    height: 0;
    opacity: 0;
  }

  &__text {
    font-size: $font-lg;
    color: $color-weak;
  }

  &__error {
    font-size: $font-lg;
    color: $color-error;
  }
}

.j-copy {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px 15px;
  opacity: 0.5;
  cursor: pointer;
  transition: 0.3s;

  i {
    font-size: 18px;
  }

  &:hover {
    opacity: 0.8;
  }
}
</style>
