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
  import { NOTIFICAR } from '@/store/tipo-mutacoes';
  import { TipoNotificacao } from '@/interfaces/Notificacao';

  export default defineComponent({
    name: 'App',
    data() {
      return {
        tarefas: [] as ITarefa[],
        modoEscuroAtivo: false as boolean,
      }
    },
    setup() {
      const store = useStore();
      return {
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
          this.store.commit(NOTIFICAR, {
            titulo: 'Falha ao salvar tarefa',
            texto: 'Sua tarefa tem que conter um projeto',
            tipo: TipoNotificacao.FALHA
          });
        } else {
          this.store.commit(NOTIFICAR, {
            titulo: 'Aviso',
            texto: 'Sua tarefa foi salva sem um projeto',
            tipo: TipoNotificacao.ATENCAO
          });
          this.tarefas.push(tarefa);
        }
      },
      trocarTema(modoEscuroAtivo: boolean) {
        this.modoEscuroAtivo = modoEscuroAtivo;
      }
    },
    components: { Formulario, Tarefa, Box }
  });
</script>  