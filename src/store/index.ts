import type IProjetos from "@/interfaces/Projeto";
import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { idGenerator } from '@/utils/idGerenerator';
import { ALTERA_PROJETO, EXCLUI_PROJETO, NOTIFICAR, DEFINIR_PROJETOS, DEFINIR_TAREFAS, ADICIONAR_TAREFAS, ADICIONA_PROJETO, ALTERA_TAREFA } from './tipo-mutacoes';
import type INotificacao from "@/interfaces/Notificacao";
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS, REMOVER_PROJETO, ALTERAR_TAREFA } from './tipo-acoes';
import http from '@/http';
import type ITarefa from "@/interfaces/Tarefa";

interface State {
  projetos: IProjetos[],
  notificacoes: INotificacao[],
  tarefas: ITarefa[],
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: [],
    notificacoes: [],
    tarefas: [],
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
    },
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
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}