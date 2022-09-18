import type IProjetos from "@/interfaces/Projeto";
import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { idGenerator } from '@/utils/idGerenerator';
import { ADICIONA_PROJETO, ALTERA_PROJETO, EXCLUI_PROJETO, NOTIFICAR, DEFINIR_PROJETOS } from './tipo-mutacoes';
import type INotificacao from "@/interfaces/Notificacao";
import { OBTER_PROJETOS } from './tipo-acoes';
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
    }
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}