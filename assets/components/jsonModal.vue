<template lang="pug">
.j-modal(:class='{ show: isOpen }')
  .j-modal__content
    .j-modal__title {{ title }}
    .j-modal__body
      slot
  .j-modal__closeTrigger(@click='resetModal')
    i.el-icon-arrow-left

</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.state.modal.title
    },
    isOpen() {
      return this.$store.getters.isModalOpen
    }
  },
  methods: {
    resetModal() {
      this.$store.commit('resetModal')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../styles/variables';
.j-modal {
  position: fixed;
  top: 0;
  right: 100%;
  bottom: 0;
  z-index: $z-index-modal;
  display: flex;
  width: 500px;
  background-color: #ffffff;
  transition: transform 0.3s;

  &.show {
    transform: translateX(500px);
    box-shadow: 2px 0 3px rgba(#000, 0.2);
  }

  &__content {
    flex-grow: 1;
    padding: 0 20px;
  }

  &__title {
    font-size: 20px;
    margin: 30px 0;
  }

  &__body {
    margin: 30px 0;
  }

  &__closeTrigger {
    align-self: flex-start;
    padding: 20px;
    cursor: pointer;
    transition: opacity 0.3s;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
