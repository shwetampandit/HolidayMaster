<template>
  <div class="home">
    <img src="../assets/mkcl-logo.png"> 
    <!-- <h2>{{$t('home.homeTitle')}}</h2> -->

    <HelloWorld msg="Welcome to Golang Full Stack Vue App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style>
.home{
  text-align: center;
}
</style>
