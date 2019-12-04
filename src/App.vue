<template>
  <div class="app">
    <logo-app></logo-app>
    <nav-app></nav-app>
    <footer-app></footer-app>
    <router-view></router-view>
  </div>
</template>


<script>
import Nav from "./components/template/Nav.vue";
import Logo from "./components/template/Logo.vue";
import Footer from "./components/template/Footer.vue";
import Home from "./components/pages/Home.vue";

export default {
  components: {
    "nav-app": Nav,
    "logo-app": Logo,
    "footer-app": Footer,
    "home-app": Home,
  },

  data() {
    return {};
  }
};
</script>

<style>
:root {
  --color-background-dark: #c4c4c4;
  --color-background-light: #dfdfdf;
  --logo-height: 100px;
  --header-height: 100px;
  --asside-width: 250px;
  --footer-height: 40px;
  --menu-top-height: 100px;
  --shadow: 0 2px 23px 0 rgba(0, 0, 0, 0.1), 0 2px 49px 0 rgba(0, 0, 0, 0.06);
}

* {
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  margin: 0;
}


.app {
  margin: 0px;
  display: grid;
  grid-template-columns: var(--asside-width) 1fr; /* Duas colunas, uma com largura do asside, e a outra com o que sobrar*/
  grid-template-rows:
    var(--header-height)
    1fr
    var(--footer-height); /* Tres colunas, altura do header no topo, altura do footer, e no meio vai o que sobrar */

  grid-template-areas:
    "logo  header"
    "menu  content"
    "menu  footer";
  height: 100vh;
}


aside.logo {
  grid-area: logo;
}

header.header {
  grid-area: header;
}

nav.menu-area {
  grid-area: menu;
}

main.content {
  grid-area: content;
}


footer.footer {
  grid-area: footer;
}

@media (max-width: 992px) {
  .app {
    grid-template-rows:
      var(--header-height)
      var(--menu-top-height)
      1fr
      var(--footer-height);
    grid-template-columns:
      var(--asside-width) 1fr;
    grid-template-areas: 
      "logo header"
      "menu menu"
      "content content"
      "footer footer" 
  }
}


@media (max-width: 576px) {
  .app {
    grid-template-rows:
      var(--logo-height)
      var(--menu-top-height)
      1fr
      var(--footer-height);
    grid-template-columns: 1fr;
    grid-template-areas: 
      "logo"
      "menu"
      "content"
      "footer" 
  }
}
</style>
