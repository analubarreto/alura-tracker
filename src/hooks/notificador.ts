import { store } from '@/store';
import type { TipoNotificacao } from '@/interfaces/Notificacao';
import { NOTIFICAR } from '@/store/tipo-mutacoes';

type Notificador = {
  notificar: (tipo: TipoNotificacao, titulo: string, texto: string) => void;
}

export default (): Notificador => {
  const notificar = (tipo: TipoNotificacao, titulo: string, texto: string) => {
    store.commit(NOTIFICAR, {
      titulo,
      texto,
      tipo
    });
  }
  return {
    notificar
  }
}