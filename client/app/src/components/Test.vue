<template>
  <div>
     <b-modal id="modal-scoped" v-model="modalShow" hide-header>
        <p class="mt-3">{{$t('punezp.ConfirmMessage')}}</p>
          <template #modal-footer>
            <button @click="cancel()" type="button" class="btn btn-danger" data-toggle="modal" data-target="#IdRef" size="sm">कॅन्सल</button>
            <button @click="ok()" type="button" class="btn btn-success" data-toggle="modal" data-target="#IdRef" size="sm">पुन्हा अभिप्राय नोंदवू शकतात</button>    
          </template> 
     </b-modal>

</div>

</template>

<script>
  export default{
     
    data() {
      return {
        modalShow: false,
        open:true
      }
    },
    methods:
{
    // hideModal() {
    //         this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    // },
    ok(){

    },
    cancel(){
    
        
    },
     showModal() {
      this.$root.$emit('bv::show::modal', 'modal-1', '#btnShow')
    },
    hideModal() {
      this.$root.$emit('bv::hide::modal', 'modal-1', '#btnShow')
    },
    toggleModal() {
      this.$root.$emit('bv::toggle::modal', 'modal-1', '#btnToggle')
    }
}
  }
</script>
<script>
export default {
    name:"Test"
}
</script>