<template>
  <div class="about">
    <h1>This is an about page {{result}}</h1>
  </div>
</template>
<script>

export default {
  
data() {
  return {
  result: this.$route.params.pId
  }
}  
}
</script>