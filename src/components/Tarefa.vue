<template>
  <main class="box has-text-weight-bold columns">
    <section class="column is-7">
      {{ tarefa.descricao || 'Tarefa sem descrição' }}
    </section>
    <section class="column">
      <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
    </section>
  </main>
</template>

<style scoped>
  .box {
    background: #faf0ca;
    margin-top: 1rem;
  }
</style>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import  Cronometro from './Cronometro.vue';
  import type ITarefa from '@/interfaces/Tarefa';
  
  export default defineComponent({
    name: 'Tarefa',
    props: {
      tarefa: {
        type: Object as PropType<ITarefa>,
        required: true
      }
    },
    components: { Cronometro }
  });
</script>