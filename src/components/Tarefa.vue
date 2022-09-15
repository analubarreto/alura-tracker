<template>
  <Box>
    <section class="column is-7">
      {{ tarefa.descricao || 'Tarefa sem descrição' }}
    </section>
    <section class="column">
      <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
    </section>
  </Box>
</template>

<style scoped>
  .box {
    margin-top: 1rem;
  }
</style>

<script lang="ts">
  import { defineComponent } from 'vue';
  import type { PropType } from 'vue';
  import  Cronometro from './Cronometro.vue';
  import type ITarefa from '@/interfaces/Tarefa';
  import Box from './Box.vue';
  
  export default defineComponent({
    name: 'Tarefa',
    props: {
      tarefa: {
        type: Object as PropType<ITarefa>,
        required: true
      }
    },
    components: { Cronometro, Box }
  });
</script>