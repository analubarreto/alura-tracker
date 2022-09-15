<template>
  <main class="box has-text-weight-bold columns">
    <slot />
  </main>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Box'
  });
</script>