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
import { TipoNotificacao } from "@/interfaces/Notificacao";
import useNotificador from '@/hooks/notificador';
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from "@/store/tipo-acoes";

export default defineComponent({
  name: 'Formulario',
  props: ['id'],
  data() {
    return {
      nomeDoProjeto: ''
    }
  },
  setup() {
    const store = useStore();
    const { notificar } = useNotificador();
    return {
      store,
      notificar
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id);
      this.nomeDoProjeto = projeto?.nome || '';
    }
  },
  methods: {
    async salvar(): Promise<void> {
      let response;
      try {
        if (this.id) {
          response = await this.store.dispatch(ALTERAR_PROJETO, {
            id: this.id,
            nome: this.nomeDoProjeto
          });
        } else {
          response = await this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto);
        }
        if (response.status.toString().includes(2)) {
          this.lidarComSucesso();
        }
      } catch (err: any) {
        const error = new Error(err.message);
        console.log(error);
      }
    },
    lidarComSucesso() {
      this.nomeDoProjeto = '';
      this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado / alterado com sucesso')
      this.$router.push('/projetos');
    }
  }
});
</script>