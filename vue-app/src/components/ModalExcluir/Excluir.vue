<template>
  <div>

  <b-button  variant="success" size="sm" id="show-btn" @click="showModal()"><i class="far fa-trash-alt"></i></b-button>

  <b-modal id="modal-2"  title="BootstrapVue">

    <template #modal-title>
      Deletar atividade? 
    </template>

    <div class="d-block text-center">
      Descrição: {{descricao}}
    </div>

    <template #modal-footer>
        <b-button class="mt-3" variant="danger" block @click="hideModal()">Cancelar</b-button>
        <b-button class="mt-3" variant="success" block @click="deleteTutorial()">Excluir</b-button>
   </template>
    
  </b-modal>

   
  </div>
</template>

<script>
import DataService from "../../services/service";

export default {
  name: "Lista",
  props: ['idprops','descricao'],
  data() {
    return {
     
    };
  },
  methods: {

    showModal() {
        this.$bvModal.show('modal-2');
    },
    hideModal() {
        this.$bvModal.hide('modal-2');
    },

    deleteTutorial(){
          DataService.delete(this.idprops)
            .then(() => {
               console.log("Deletado com sucesso!");
               hideModal();

            })
            .catch((e) => {
              console.log(e);
            });
      }
  },
};
</script>

<style  scoped>

.text-center {
    text-align: left !important;
}

</style>>
