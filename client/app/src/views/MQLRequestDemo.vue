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
import Vue from 'vue'
export default {
    data () {
        return {
            result: null
        }
    },
    methods: {

        GetAllPosts () {
            // for(let i=1; i <=100; i++) {
            //  this.$MQL.setActivity(`r.[Activity${i}, Activity${i}${i}]`)
            //           .setHeader({'my-header': 'jjjj'})
            //           .setData(`Activity${i}`,{'param1': `${i}`})
            //           .setData('Data 3')
            //           .fetch()
            //           .then(res => {
            //                 console.log(res)
            //             })
            //           .catch(error=> {
            //                 console.log(error)
            //             });
            // }
            
            // for(let i=0; i <=100; i++) {
            //     this.$MQL.setActivity(i+' -Activity', ).setData(i+' - Data').fetch(i+' - Fetch').then(res => {
            //         console.log(res)
            //     });
            // }

             
               this.$MQL.setActivity('o.[Act1, Act2]').setData('Act1', 'Act1 data').setData({'data1': 'hello'}).fetch().then(res => {
                  console.log(res)
              }).catch(error => {
                  console.log(error)
              })
               this.$MQL.setActivity('o.[tempo, mars]').fetch().then(res => {
                  console.log(res)
              }).catch(error => {
                  console.log(error)
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
