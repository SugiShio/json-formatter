<template lang="pug">
div
  | {{ indent }}
  template(v-if='item.key')
    span(:class='"depth-"+item.indent') {{ item.key }}
    | :&nbsp;
  span(:class='item.value') {{ item.value }}

</template>

<script>
export default {
  props: {
    item: Object,
    required: true
  },
  computed: {
    indent() {
      return new Array(this.item.indent).fill('----').join('')
    }
  }
}
</script>
