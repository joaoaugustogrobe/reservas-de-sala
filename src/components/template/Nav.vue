<template>
  <nav class="menu-area">
    <a href="#/booking">
      <i class="fas fa-calendar-day"></i> Gestão de Reservas
    </a>
    <a href="#/users">
      <i class="fas fa-users"></i> Gestão de Usuários
    </a>
    <a href="#/roons">
      <i class="fas fa-door-open"></i> Gestão de Ambientes
    </a>
  </nav>
</template>


<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
nav.menu-area{
    background-color: var(--color-background-light);
    box-shadow: var(--shadow)
}

.menu-area a{
    display: block;
    text-decoration: none;
    color: #000;
    padding: 20px 15px;
    font-weight: 300;
}
.menu-area a:hover{
    background: linear-gradient(135deg,#CCA300 0%,#FECC00 100%)
}

.menu-area a.active {
    background-color: var(--color-background-dark)
}

</style>
