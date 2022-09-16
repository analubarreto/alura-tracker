<template>
  <section class="projetos">
    <header class="projetos__header">
      <h1 class="is-size-2 mr-4">Projetos</h1>
      <router-link to="/projetos/novo" class="button">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
        <p>Adicionar novo projeto</p>
      </router-link>
    </header>
    <!-- Formulário -->
    <Formulario />
    <!-- Listagem -->
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
          <td>
            <router-link :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
.projetos {
  padding: 1.25rem;
}
.projetos__header {
  display: flex;
  align-items: center;
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
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import Formulario from '@/views/Projetos/Formulario.vue';

export default defineComponent({
  name: 'Projetos',
  setup() {
    const store = useStore();
    return {
      projetos: computed(() => store.state.projetos)
    }
  },
  components: { Formulario }
});
</script>