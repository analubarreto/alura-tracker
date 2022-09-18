<template>
  <section class="column is-three-quarter conteudo">
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <article class="list">
      <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
      <Box v-if="listaEstaVazia">
        <p>Você ainda não executou uma tarefa</p>
      </Box>
    </article>
  </section>
</template>

<style>
  .list {
    padding: 0 2rem;
  }
  .conteudo {
    background-color: var(--bg-primario);
  }
</style>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import type ITarefa from '@/interfaces/Tarefa';
import Formulario from '@/components/Formulario.vue';
import Tarefa from '@/components/Tarefa.vue';
import Box from '@/components/Box.vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/Notificacao';
import { notificarMixin } from '@/mixins/notificar';
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'App',
  data() {
    return {
      tarefas: [] as ITarefa[],
      modoEscuroAtivo: false as boolean,
    }
  },
  mixins: [notificarMixin],
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);
    return {
      tarefas: computed(() => store.state.tarefas),
      projetos: computed(() => store.state.projetos),
      store
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: ITarefa) {
      if (this.projetos.length && !tarefa.projeto) {
        this.notificar(TipoNotificacao.FALHA, 'Falha ao salvar tarefa', 'Sua tarefa tem que conter um projeto');
      } else {
        this.store.dispatch(CADASTRAR_TAREFA, tarefa);
      }
    },
    trocarTema(modoEscuroAtivo: boolean) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  },
  components: { Formulario, Tarefa, Box }
});
</script>  