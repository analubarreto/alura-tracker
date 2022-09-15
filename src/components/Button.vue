<template>
  <button class="button" @click="clicarButton()" :disabled="isDisabled">
    <span class="icon"><slot name="buttonIcon"></slot></span>
    <span><slot name="buttonText"></slot></span>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Button',
    emits: ['aoClicar'],
    props: {
      isDisabled: {
        type: Boolean,
        default: false
      },

    },
    methods: {
      clicarButton() {
        this.$emit('aoClicar');
      }
    }
  })
</script>