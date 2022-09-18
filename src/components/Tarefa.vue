<template>
  <Box>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3" v-if="tarefa.projeto">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos"/>
      </div>
    </div>
  </Box>
</template>

<style scoped>
  .box {
    margin-top: 1rem;
  }
  .columns {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type { PropType } from 'vue';
import  Cronometro from './Cronometro.vue';
import type ITarefa from '@/interfaces/Tarefa';
import Box from './Box.vue';
import { useStore } from '@/store';
import { OBTER_TAREFAS } from '@/store/tipo-acoes';
  
export default defineComponent({
  name: 'Tarefa',
  props: {
    tarefa: {
      type: Object as PropType<ITarefa>,
      required: true
    }
  },
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS)
    return {
      tarefas: computed(() => store.state.tarefas),
      store
    }
  },
  components: { Cronometro, Box }
});
</script>