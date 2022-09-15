<template>
  <article class="box formulario">
    <section class="columns">
      <aside
        class="column is-8"
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
      <div class="column">
        <Temporizador @aoTemporizadorFinalizado="finalizarTarefa"/>
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
import { defineComponent } from "vue";
import Temporizador from './Temporizador.vue';
import Tarefa from './Tarefa.vue';
export default defineComponent({
  name: "Formulário",
  emits: ['aoSalvarTarefa'],
  components: {
    Temporizador, Tarefa
  },
  data () {
    return {
      descricao: ''
    }
  },
  methods: {
    finalizarTarefa (tempoDecorrido: number) : void {
      this.$emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: this.descricao
      })
      this.descricao = ''
    }
  }
});
</script>