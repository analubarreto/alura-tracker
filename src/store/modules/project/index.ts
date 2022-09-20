import type { State } from '@/store/';
import type IProjetos from "@/interfaces/Projeto";
import type { Module } from "vuex";
import { ALTERA_PROJETO, EXCLUIR_PROJETO, DEFINIR_PROJETOS, ADICIONA_PROJETO } from '@/store/tipo-mutacoes';
import { ALTERAR_PROJETO, CADASTRAR_PROJETO, OBTER_PROJETOS, REMOVER_PROJETO } from '@/store/tipo-acoes';
import { idGenerator } from '@/utils/idGerenerator';
import http from '@/http';

export interface ProjectState {
  projetos: IProjetos[];
}

export const project: Module<ProjectState, State> = {
  state: {
    projetos: [],
  },
  mutations: {
    [DEFINIR_PROJETOS](state, projetos: IProjetos[]) {
      state.projetos = projetos;
    },
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
    [EXCLUIR_PROJETO](state, idDoProjeto: number) {
      state.projetos = state.projetos.filter(proj => proj.id != idDoProjeto);
    },
  },
  actions: {
    async [OBTER_PROJETOS]({ commit }) {
      try {
        const response = await http.get('projetos');
        commit(DEFINIR_PROJETOS, response.data);
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
  }
}