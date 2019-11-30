<template>
  <header class="header d-none d-sm-flex flex-column">
    <h1 class="mt-3">
      <i v-bind:class="iconName"></i> {{title}}
    </h1>
    <p class="lead text-muted">{{subtitle}}</p>
  </header>
</template>


<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title:{
      required: true
    }, 
    subtitle: {}
  },
  data() {
    return {};
  },
  computed: {
    iconName() {
      console.log("Foi!");
      return `fa fa-${this.icon}`;
    }
  }
};
</script>

<style>
header.header{
  padding: 0px 15px;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: var(--shadow)
}

header.header h1{
  font-size: 1.8em;
}
</style>
