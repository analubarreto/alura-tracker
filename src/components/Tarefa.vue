<template>
  <Box>
    <div class="columns">
      <section class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </section>
      <section class="is-3" v-if="tarefa.projeto">
        {{ tarefa.projeto?.nome }}
      </section>
      <section class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </section>
    </div>
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