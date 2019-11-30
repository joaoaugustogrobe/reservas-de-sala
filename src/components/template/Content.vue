<template>
  <fragment>
    <header-app v-bind:icon="icon" v-bind:title="title" v-bind:subtitle="subtitle"></header-app>
    <main class="content container-fluid">
      <div class="p-3 mt-3">
        <slot></slot>
      </div>
    </main>
  </fragment>
</template>

<script>
import Header from "../template/Header";
export default {
  props: ["icon", "title", "subtitle"],
  components: {
    "header-app": Header
  },
  data() {
    return {};
  }
};
</script>

<style>
main.content{
  background-color: var(--color-background-dark);
}
main > div{
  background-color: #fff;
  box-shadow: var(--shadow) 
}
</style>
