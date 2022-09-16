import type IProjetos from "./Projeto";

export default interface ITarefa {
  duracaoEmSegundos: number;
  descricao: string;
  projeto: IProjetos
}