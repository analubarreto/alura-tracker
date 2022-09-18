import type IProjetos from "@/interfaces/Projeto";
import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { idGenerator } from '@/utils/idGerenerator';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO, NOTIFICAR, DEFINIR_PROJETOS } from './tipo-mutacoes';
import type INotificacao from "@/interfaces/Notificacao";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from './tipo-acoes';
import http from '@/http';

interface State {
  projetos: IProjetos[],
  notificacoes: INotificacao[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [],
  },
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto: IProjetos = {
        id: idGenerator(state.projetos),
        nome: nomeDoProjeto
      }
      state.projetos.push(projeto);
    },
    [ALTERA_PROJETO](state, projeto: IProjetos) { 
      const index = state.projetos.findIndex(proj => proj.id == projeto.id);
      state.projetos[index] = projeto;
    },
    [EXCLUI_PROJETO](state, idDoProjeto: number) {
      state.projetos = state.projetos.filter(proj => proj.id != idDoProjeto);
    },
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = idGenerator(state.notificacoes);
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
      }, 3000);
    },
    [DEFINIR_PROJETOS](state, projetos: IProjetos[]) {
      state.projetos = projetos;
    }
  },
  actions: {
    async [OBTER_PROJETOS]({ commit }) {
      try {
        const resposta = await http.get('projetos');
        commit(DEFINIR_PROJETOS, resposta.data);
      } catch (err: any) {
        const error = new Error(err.message);
        return error;
      }
    },
    async [CADASTRAR_PROJETO](_, nomeDoProjeto: string) {
      try {
        const response = await http.post('/projetos', {
          nome: nomeDoProjeto
        });
        if (response.status === 201) {
          return response;
        }
      } catch (err: any) {
        const error = new Error(err.message);
        return error;
      }
    },
    async [ALTERAR_PROJETO](_, projeto: IProjetos) {
      try {
        const response = await http.put(`/projetos/${projeto.id}`, projeto);
        if (response.status === 200) {
          return response;
        }
      } catch (err: any) {
        const error = new Error(err.message);
        return error;
      }
    },
    async [REMOVER_PROJETO](_, idProjeto: number) {
      try {
        const response = await http.delete(`/projetos/${idProjeto}`);
        if (response.status === 200) {
          return response;
        }
      } catch (err: any) {
        const error = new Error(err.message);
        return error;
      }
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}