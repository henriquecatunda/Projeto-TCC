<template>
  <div>

  <b-button class="Button" variant="success" id="show-btn" @click="showModal()"><i class="fas fa-plus"></i> Add atividade</b-button>

  <b-modal id="modal-1" title="BootstrapVue">

    <template #modal-title>
      Cadastrar Atividade 
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

    <div style="margin-top: 0.8rem">
        <b-form-checkbox
              id="checkbox-1"
              v-model="check"
              name="checkbox-1"
              value= true
              unchecked-value= false
        >
             Adicionar no google agenda
        </b-form-checkbox>
    </div>

    <template #modal-footer>

        <b-button class="mt-3" variant="danger" block @click="hideModal()">Cancelar</b-button>
        <b-button class="mt-3" variant="success" block  @click="saveTutorial()">Cadastrar</b-button>

   </template>
    
  </b-modal>

   
  </div>
</template>

<script>
import DataService from "../../services/service";

var gapi = window.gapi;

var CLIENT_ID = "546393215838-sp3qgd8fkb0vpo2834mp6uvtkabfbjdb.apps.googleusercontent.com"
var API_KEY = "AIzaSyDWeI9YDiSVV23PmMPvCsESG-IB4D3__c0"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
var SCOPES = "https://www.googleapis.com/auth/calendar.events"

export default {
  name: "Lista",
  data() {
    return {
      check: false,
      title: "",
      description: "",
      date: "",
      time: "",
    };
  },
  methods: {

   showModal() {
        this.$bvModal.show('modal-1');
    },
    hideModal() {
        this.$bvModal.hide('modal-1');
    },

    saveTutorial() {

       if(this.check){
        gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          
          var event = {
            'summary': title,
            'description': description,
            'start': {
              'dateTime': `${this.date}T08:00:00-10:00`
            
            },
            'end': {
              'dateTime': `${this.date}T08:00:00-10:00`
              
            },
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
  
          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })
  
          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })
        })
      })
      }

        var data = {
            title: this.title,
            description: this.description,
            date: this.date,
            time: this.time,
        };

        DataService.create(data)
            .then(() => {
              console.log("Created new item successfully!");
              hideModal();
            })
            .catch(e => {
              console.log(e);
        });
    },

   


  },
};
</script>

<style  scoped>

.text-center {
    text-align: left !important;
}

</style>>
