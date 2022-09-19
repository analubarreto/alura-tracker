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
import { defineComponent, ref } from "vue";
import { useStore } from "@/store";
import { TipoNotificacao } from "@/interfaces/Notificacao";
import useNotificador from '@/hooks/notificador';
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from "@/store/tipo-acoes";
import { useRouter } from "vue-router";

export default defineComponent({
  name: 'Formulario',
  props: ['id'],
  data() {
    return {
      nomeDoProjeto: ''
    }
  },
  setup(props) {
    const router = useRouter();

    const store = useStore();
    const { notificar } = useNotificador();
    let nomeDoProjeto = ref('');

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(proj => proj.id == props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = '';
      notificar(TipoNotificacao.SUCESSO, 'Excelente', 'O projeto foi cadastrado / alterado com sucesso')
      router.push('/projetos');
    }

    const salvar = async() : Promise<void> => {
      let response;
      try {
        if (props.id) {
          response = await store.dispatch(ALTERAR_PROJETO, {
            id: props.id,
            nome: nomeDoProjeto
          });
        } else {
          response = await store.dispatch(CADASTRAR_PROJETO, nomeDoProjeto);
        }
        if (response.status.toString().includes(2)) {
          lidarComSucesso();
        }
      } catch (err: any) {
        const error = new Error(err.message);
        console.log(error);
      }
    }

    return {
      nomeDoProjeto,
      salvar
    }
  },
});
</script>