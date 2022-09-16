<template>
  <header>
    <h1>
      <img src="../assets/logo.png" alt="">
    </h1>
    <button class="button" @click="alterarTema">{{ textoBotao }}</button>
    <nav class="menu mt-5" role="navigation" aria-label="main navigation">
      <ul class="menu-list">
        <li>
          <router-link to="/" class="link mb-2">
            <i class="fas fa-tasks"></i>
            tarefas
          </router-link>
          <router-link to="/projetos" class="link mb-2">
            <i class="fas fa-project-diagram"></i>
            projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
  header {
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    padding: 1rem;
    text-align: center;
  }

  @media only screen and (max-width: 768px) {
    header {
      padding: 2.5rem;
      height: auto;
    }
  }
  .panel li {
    margin: 8px 0;
  }
  .link {
    color: #f2f2f2;
  }
  .link:hover {
    color: #0d3b66;
    background-color: #2F5C85;
  }
  .link.router-link-active {
    color: #f2f2f2;
    background-color: #2F5C85;
  }
</style>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],
  data() {
    return {
      modoEscuroAtivo: false as boolean
    }
  },
  computed: {
    textoBotao() {
      return this.modoEscuroAtivo ? 'Desativar modo escuro' : 'Ativar modo escuro'
    }
  },
  methods: {
    alterarTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo;
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo);
    }
  }
});

</script>