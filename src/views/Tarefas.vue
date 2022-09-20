<template>
  <section class="column is-three-quarter conteudo">
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <article class="list">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <input class="input" type="text" placeholder="Digite para filtrar" v-model="filtro">
          <span class="icon is-small is-left">
            <i class="fas fa-search"></i>
          </span>
        </p>
      </div>
      <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoClicarTarefa="selecionarTarefa" />
      <Box v-if="listaEstaVazia">
        <p>Você ainda não executou uma tarefa</p>
      </Box>
    </article>
  </section>
  <Modal :mostrar="tarefaSelecionada != null" v-if="tarefaSelecionada">
    <template v-slot:header>
       <button class="delete" aria-label="close" @click="fecharModal" ></button>
    </template>
    <template v-slot:content>
      <label for="descricaoDaTarefa" class="label">Descrição</label>
      <input id="descricaoDaTarefa" type="text" class="input" v-model="tarefaSelecionada.descricao">
    </template>
    <template v-slot:footer>
      <button class="button is-success" @click="alterarTarefa">Salvar</button>
      <button class="button" @click="fecharModal">Cancelar</button>
    </template>
  </Modal>
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
import { computed, defineComponent, ref, watchEffect } from 'vue';
import type ITarefa from '@/interfaces/Tarefa';
import Formulario from '@/components/Formulario.vue';
import Tarefa from '@/components/Tarefa.vue';
import Box from '@/components/Box.vue';
import Modal from '@/components/Modal.vue';
import { useStore } from '@/store';
import { TipoNotificacao } from '@/interfaces/Notificacao';
import { notificarMixin } from '@/mixins/notificar';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipo-acoes';

export default defineComponent({
  name: 'App',
  data() {
    return {
      modoEscuroAtivo: false as boolean,
      tarefaSelecionada: null as ITarefa | null
    }
  },
  mixins: [notificarMixin],
  setup() {
    const store = useStore();
    store.dispatch(OBTER_TAREFAS);
    store.dispatch(OBTER_PROJETOS);

    const filtro = ref('');

    // const tarefas = computed(() => store.state.tarefas.filter((tarefa: ITarefa) => !filtro.value || tarefa.descricao.includes(filtro.value)));

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value);
    });

    return {
      tarefas: computed(() => store.state.tarefas),
      projetos: computed(() => store.state.projeto.projetos),
      store,
      filtro
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
    },
    selecionarTarefa(tarefa: ITarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    async alterarTarefa() {
      if (this.tarefaSelecionada) {
        await this.store.dispatch(ALTERAR_TAREFA, {
          id: this.tarefaSelecionada.id,
          descricao: this.tarefaSelecionada.descricao
        });
        this.fecharModal();
      }
    }
  },
  components: { Formulario, Tarefa, Box, Modal }
});
</script>  