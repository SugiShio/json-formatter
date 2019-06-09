<template lang="pug">
.j-display__row
  | {{ indent_ }}
  template(v-if='item.key')
    span(:class='"depth-"+item.depth') {{ item.key }}
    | :&nbsp;
  span(:class='item.value') {{ item.value }}

</template>

<script>
export default {
  props: {
    item: Object,
    indent: [String, Number]
  },
  computed: {
    indent_() {
      let block = this.indent
      if (Number.isInteger(block)) {
        block = new Array(block).fill(' ').join('')
      }
      return new Array(this.item.depth).fill(block).join('')
    }
  }
}
</script>
