<template>
  <main class="columns is-gapless is-multiline">
    <section class="column is-one-quarter">
      <BarraLateral />
    </section>
    <section class="column is-three-quarter">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <article class="list">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaEstaVazia">
          <p>Você ainda não executou uma tarefa</p>
        </Box>
      </article>
    </section>
  </main>
</template>

<style scoped>
  .list {
    padding: 0 2rem;
  }
</style>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from './components/BarraLateral.vue';
  import Formulario from './components/Formulario.vue';
  import Tarefa from './components/Tarefa.vue';
  import type ITarefa from './interfaces/Tarefa';
  import Box from './components/Box.vue';

  export default defineComponent({
    name: 'App',
    data() {
      return {
        tarefas: [] as ITarefa[]
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
      }
    },
    components: { BarraLateral, Formulario, Tarefa, Box }
  });
</script>  