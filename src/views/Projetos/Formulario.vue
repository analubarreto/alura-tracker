<template>
  <section class="projetos">
    <h1 class="is-size-2">Projetos</h1>
    <form @submit.prevent="salvar" class="columns">
      <div class="field column is-four-fifths">
        <label for="nomeDoProjeto" class="label">Nome do Projeto</label>
        <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto" />
      </div>
      <div class="field column is-one-fifth">
        <button class="button" type="submit">salvar</button>
      </div>
    </form>
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
import { useStore } from "@/store";

export default defineComponent({
  name: 'Formulario',
  data() {
    return {
      nomeDoProjeto: ''
    }
  },
  setup() {
    const store = useStore();
    return {
      store
    }
  },
  methods: {
    salvar() {
      this.store.commit('ADICIONA_PROJETO', this.nomeDoProjeto);
      this.nomeDoProjeto = '';
      this.$router.push('/projetos');
    }
  }
});
</script>