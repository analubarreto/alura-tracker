<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <section class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </section>
    <section class="column is-three-quarter conteudo">
      <Notificacoes />
      <router-view></router-view>
    </section>
  </main>
</template>

<style>
  .list {
    padding: 0 2rem;
  }
  .conteudo {
    background-color: var(--bg-primario);
  }
</style>

<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from '@/components/BarraLateral.vue';
  import Notificacoes from '@/components/Notificacoes.vue';

  export default defineComponent({
    name: 'App',
    data() {
      return {
        modoEscuroAtivo: false as boolean,
      }
    },
    methods: {
      trocarTema(modoEscuroAtivo: boolean) {
        console.log(modoEscuroAtivo)
        this.modoEscuroAtivo = modoEscuroAtivo;
      }
    },
    components: { BarraLateral, Notificacoes }
  });
</script>  