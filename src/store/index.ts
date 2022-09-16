import type IProjetos from "@/interfaces/Projeto";
import type { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { idGenerator } from '@/utils/idGerenerator';

interface State {
  projetos: IProjetos[]
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    projetos: []
  },
  mutations: {
    'ADICIONA_PROJETO'(state, nomeDoProjeto: string) {
      const projeto: IProjetos = {
        id: idGenerator(),
        nome: nomeDoProjeto
      }
      state.projetos.push(projeto);
    },
    'ALTERA_PROJETO'(state, projeto: IProjetos) { 
      const index = state.projetos.findIndex(proj => proj.id == projeto.id);
      state.projetos[index] = projeto;
    } 
  }
});

export function useStore(): Store<State> {
  return vuexUseStore(key);
}