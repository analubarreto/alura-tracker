import type { TipoNotificacao } from "@/interfaces/Notificacao";
import { store } from "@/store";
import { NOTIFICAR } from "@/store/tipo-mutacoes";

export const notificarMixin = {
  methods: {
    notificar (tipo: TipoNotificacao, titulo: string, texto: string) {
      store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo
      });
    }
  }
}