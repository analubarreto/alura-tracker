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
  import { defineComponent } from 'vue';
  import type ITarefa from '@/interfaces/Tarefa';
  import Formulario from '@/components/Formulario.vue';
  import Tarefa from '@/components/Tarefa.vue';
  import Box from '@/components/Box.vue';

  export default defineComponent({
    name: 'App',
    data() {
      return {
        tarefas: [] as ITarefa[],
        modoEscuroAtivo: false as boolean,
      }
    },
    computed: {
      listaEstaVazia(): boolean {
        return this.tarefas.length === 0
      }
    },
    methods: {
      salvarTarefa(tarefa: ITarefa) {
        this.tarefas.push(tarefa);
      },
      trocarTema(modoEscuroAtivo: boolean) {
        console.log(modoEscuroAtivo)
        this.modoEscuroAtivo = modoEscuroAtivo;
      }
    },
    components: { Formulario, Tarefa, Box }
  });
</script>  