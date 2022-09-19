import type { ProjectState } from './modules/project/index';
import { project } from './modules/project/index';
import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { idGenerator } from '@/utils/idGerenerator';
import { NOTIFICAR, DEFINIR_TAREFAS, ADICIONAR_TAREFAS, ALTERA_TAREFA } from './tipo-mutacoes';
import type INotificacao from "@/interfaces/Notificacao";
import { CADASTRAR_TAREFA, OBTER_TAREFAS, ALTERAR_TAREFA } from './tipo-acoes';
import http from '@/http';
import type ITarefa from "@/interfaces/Tarefa";

export interface State {
  notificacoes: INotificacao[],
  tarefas: ITarefa[],
  projeto: ProjectState
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: []
    }
  },
  mutations: {
    [NOTIFICAR](state, novaNotificacao: INotificacao) {
      novaNotificacao.id = idGenerator(state.notificacoes);
      state.notificacoes.push(novaNotificacao);

      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
      }, 3000);
    },
    [DEFINIR_TAREFAS](state, tarefas: ITarefa[]) {
      state.tarefas = tarefas ;
    },
    [ADICIONAR_TAREFAS](state, tarefa: ITarefa) {
      state.tarefas.push(tarefa);
    },
    [ALTERA_TAREFA](state, tarefa: ITarefa) {
      const index = state.tarefas.findIndex(t => t.id == tarefa.id);
      state.tarefas[index] = tarefa;
    }
  },
  actions: {
    async [OBTER_TAREFAS]({ commit }) {
      try {
        const resposta = await http.get('tarefas');
        commit(DEFINIR_TAREFAS, resposta.data);
      } catch (err: any) {
        const error = new Error(err.message);
        return error;
      }
    },
    async [CADASTRAR_TAREFA]({ commit }, tarefa: ITarefa) {
      try {
        const response = await http.post('/tarefas', tarefa);
        if (response.status === 201) {
          commit(ADICIONAR_TAREFAS, response.data);
        }
      } catch (err: any) {
        const error = new Error(err.message);
        return error;
      }
    },
    async [ALTERAR_TAREFA]({ commit }, tarefa: ITarefa) {
      try {
        const response = await http.put(`/tarefas/${tarefa.id}`, tarefa);
        if (response.status === 200) {
          commit(ALTERA_TAREFA, tarefa)
        }
      } catch (err: any) {
        const error = new Error(err.message);
        return error;
      }
    },
  },
  modules: {
    project
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}