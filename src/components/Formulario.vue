<template>
  <article class="box formulario">
    <section class="columns">
      <aside
        class="column is-5"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
          v-model="descricao"
        />
      </aside>
      <aside class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </aside>
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="salvarTarefa"/>
      </div>
    </section>
  </article>
</template>

<style>
  .formulario {
    color: var(--texto-primario) !important;
    background-color: var(--bg-primario) !important;
  }
</style>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import Temporizador from './Temporizador.vue';
import Tarefa from './Tarefa.vue';
import { useStore } from "@/store";

export default defineComponent({
  name: "Formulário",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador, Tarefa
  },
  // This second value is the context (which has emit)
  setup(props, { emit }) {
    const store = useStore();
    const descricao = ref('');
    const idProjeto = ref('');
    const projetos = computed(() => store.state.projeto.projetos)

    const salvarTarefa = (tempoDecorrido: number) : void => {
      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(proj => proj.id.toString() == idProjeto.value)
      })
      descricao.value = ''
    }
    return {
      descricao,
      idProjeto,
      salvarTarefa,
      projetos
    }
  },
});
</script>