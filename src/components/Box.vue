<template>
  <article class="box has-text-weight-bold columns">
    <slot />
  </article>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Box'
  });
</script>