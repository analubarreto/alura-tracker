import type IProjetos from "./Projeto";

export default interface ITarefa {
  id: number;
  duracaoEmSegundos: number;
  descricao: string;
  projeto: IProjetos
}