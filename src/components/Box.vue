<template>
  <article class="box has-text-weight-bold columns" :style="estilos" >
    <slot />
  </article>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'Box',
    data() {
      return {
        estilos: {
          backgroundColor: '#faf0ca'
        }
      }
    }
  });
</script>