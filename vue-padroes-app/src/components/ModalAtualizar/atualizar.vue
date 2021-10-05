<template>
  <div>

  <b-button variant="success" size="sm" id="show-btn" @click="$bvModal.show('modal-3')"><i class="fas fa-pen"></i></b-button>

  <b-modal id="modal-3"  title="BootstrapVue">

    <template #modal-title>
      Atualizar Atividade
    </template>

    <div class="d-block text-center">

      <b-form >

        <b-form-group id="input-group-1" label="Titulo da atividade" label-for="input-1" style="margin-top: 0.5rem">
        <b-form-input
          id="input-1"
          v-model="title"
          required
        ></b-form-input>
      </b-form-group>
   

       <b-form-group id="input-group-2" label="Descrição" label-for="input-2" style="margin-top: 0.5rem">
        <b-form-input
          id="input-2"
          v-model="description"
          required
        ></b-form-input>
      </b-form-group>

      <b-row>

      <b-col cols="6">
       <b-form-group id="input-group-3" label="Data" label-for="input-3" style="margin-top: 0.5rem">
        <b-form-input
          id="input-3"
          v-model="date"
          type="date"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>

      <b-col cols="6">
      <b-form-group id="input-group-4" label="Hora" label-for="input-4" style="margin-top: 0.5rem">
        <b-form-input
          id="input-3"
          v-model="time"
          type="time"
          required
        ></b-form-input>
      </b-form-group>
      </b-col>
  
      </b-row>

      </b-form>

    </div>
    <template #modal-footer>

        <b-button class="mt-3" variant="danger" block @click="$bvModal.hide('modal-3')">Cancelar</b-button>
        <b-button class="mt-3" variant="success" block @click="updateTutoria()">Atualizar</b-button>

   </template>
    
  </b-modal>

   
  </div>
</template>

<script>
import DataController from "../../Controller/Controller";

export default {
  name: "Lista",
  props: ['idprops','tarefa','id'],
  data() {
    return {
      title: "",
      description: "",
      date: "",
      time: "",
    };
  },
  methods: {

    updateTutoria(){
    const data = {
        title: this.title,
        description: this.description,
        date: this.date,
        time: this.time,
    };

    DataController.atualizarAtividade(this.idprops, data)
      .then(() => {
          console.log("Atualizado com sucesso!");
          hideModal();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  },
  mounted() {

      this.title = this.tarefa.title
      this.description = this.tarefa.description;
      this.date = this.tarefa.date;
      this.time = this.tarefa.time;
  
  },
};
</script>

<style  scoped>

.text-center {
    text-align: left !important;
}

</style>>
