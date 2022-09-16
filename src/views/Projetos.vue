<template>
  <section class="projetos">
    <h1>Projetos</h1>
    <form @submit.prevent="salvar" class="columns">
      <div class="field column is-four-fifths">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
      </div>
      <div class="field column is-one-fifth">
        <button class="button" type="submit">salvar</button>
      </div>
    </form>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Projeto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
.columns {
  display: flex;
}
.column:last-child {
  align-self: end;
  margin-bottom: .7rem;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import type IProjeto from '@/interfaces/Projeto';
import { idGenerator } from '@/utils/idGerenerator';

export default defineComponent({
  name: 'Projetos',
  data() {
    return {
      nomeDoProjeto: '',
      projetos: [] as IProjeto[]
    }
  },
  methods: {
    salvar() {
      const projeto: IProjeto = {
        id: idGenerator(),
        nome: this.nomeDoProjeto,
      }
      this.projetos.push(projeto);
      this.nomeDoProjeto = '';
    }
  }
});
</script>