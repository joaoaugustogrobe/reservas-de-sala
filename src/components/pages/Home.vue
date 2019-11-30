<template>
  <content-app icon="home" title="Início" subtitle="Reserva de ambientes.">
    <div class="display-4">Bem Vindo!</div>
    <hr />
    <p
      class="mb-0"
    >Uma solução Web capaz de gerenciar as reservas de salas, desenvolvido como trabalho final da disciplina Web Cliente - UTFPR</p>
  </content-app>
</template>

<script>
import Content from "./../template/Content";

export default {
  components: {
    "content-app": Content
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
