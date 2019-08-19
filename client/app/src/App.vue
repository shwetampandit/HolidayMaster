<template>
  <div id="app">
    <div
      id="app-loader"
      v-if="$store.getters.isPageBlocked"
    >
      <img
        src="../public/assets/tail-spin.svg"
        alt="loader"
      >
    </div>
    <div id="nav">
      <router-link to="/">
        <i class="mdi mdi-home" /> Home {{ $store.getters.isPageBlocked }}
      </router-link> |
      <router-link to="/about">
        About
      </router-link> |
      <router-link
        name="loginlink"
        to="/login"
      >
        Login
      </router-link> |
      <router-link to="/registration">
        Register
      </router-link> |
      <router-link to="/i18Demo">
        Languages
      </router-link> |
      <router-link to="/mqlRequestDemo">
        MQL Request
      </router-link> |
      <router-link to="/validator">
        Validator
      </router-link> |
      <router-link to="/encryption">
        Encryption
      </router-link> |
      <router-link to="/cdnUpload">
        Cdn Upload
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app-loader {
  position: absolute; top: 0; right: 0; bottom: 0; left: 0; background: rgba(255,255,255,0.8); z-index: 2000; display: flex; align-items: center; justify-content: center;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
