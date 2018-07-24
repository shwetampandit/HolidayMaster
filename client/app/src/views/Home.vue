<template>
  <div class="home">
    <img src="../assets/logo.png">
    <h2>{{$t('home.homeTitle')}}</h2>

    <HelloWorld msg="Welcome to Golang Full Stack Vue App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
