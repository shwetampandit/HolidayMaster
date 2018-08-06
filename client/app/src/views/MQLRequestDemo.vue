<template>
    <section id="masterAxios">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4 offset-md-4">
                    <div class="login-card">

                        <button @click="GetAllPosts" class="btn btn-info px-4">MQL Request</button> {{result}}
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    data () {
        return {
            result: null
        }
    },
    methods: {

        GetAllPosts () {
            this.$MQLFetch('c.ServiceName').then(res => {
                this.result = res
            }).catch(error => {
                this.$log.error(error)
            })

        }
    }
}
</script>

<style lang="scss">
#login {
  .login-card {
    box-shadow: 0 0 10px #ccc;
    padding: 30px;
  }
}
</style>
