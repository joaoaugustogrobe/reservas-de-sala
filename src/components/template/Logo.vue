<template>
  <aside class="logo">
    <a href="#/">
      <img src="./../../assets/utfpr-logo.png" alt="logo UTFPR">
    </a>
  </aside>
</template>


<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style scoped>
aside.logo{
  background-color: var(--color-background-light);
  display: flex;
  justify-content: center;
  align-items: center;
}

aside.logo img{
  padding: 0px 15px;
  width: 100%;
}

@media (max-width: 576px) {
  aside.logo a{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  aside.logo img{
    width: 50%;
    justify-content: center
    
  }
}
</style>
