<template>
  <section class="projetos">
    <router-view></router-view>
  </section>
</template>

<style>
  .projetos {
    padding: 1.25rem;
  }
</style>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Projetos',
});
</script>