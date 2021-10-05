<template>
  <div class="Conteiner">
    <div class="sairLogin" @click="sair">Sair</div>

    <div class="boxTop">
      <div class="TituloEmpresa">Sistema de controle de atividades</div>

      <b-navbar class="Navigation justify-content-between">
        <b-navbar-brand class="descricaoEmpresa"
          >Atividades cadastradas</b-navbar-brand
        >
        <b-form inline>
          <Cadastro />
        </b-form>
      </b-navbar>
    </div>

    <div class="boxContainer">
    
      <b-card class="mb-2 cardWidth"   
      v-for="(atividade, index) in tutorials"
      :key="index">
        <b-card-text class="FormTitle">  {{atividade.title}} </b-card-text>
        <b-card-text class="Formdescripton">  {{atividade.description}} </b-card-text>

        <b-card-text>
          <div class="FormDateTime">
            <div><i class="far fa-calendar"></i> {{atividade.date}}</div>
            <div><i class="far fa-clock"></i>{{atividade.time}}</div>
          </div>
        </b-card-text>

        <b-col cols="5" class="GroupBotaoStructure">
          <Excluir :idprops="atividade.key" :descricao="atividade.description" />
          <Atualizar :idprops="atividade.key" :tarefa="atividade" />
        </b-col>
      </b-card>
    </div>
  </div>
</template>

<script>

import { firebase } from '@firebase/app'
import DataService from "../services/service";

import Cadastro from "../components/ModalCadastro/cadastro.vue"
import Excluir from "../components/ModalExcluir/Excluir.vue"
import Atualizar from "../components/ModalAtualizar/atualizar.vue"

export default {
  name: "Lista",
  data() {
    return {
      id: 0,
      nome: "",
      cargo: "",
      tutorials: [],
      currentTutorial: null,
      currentIndex: -1,
      idprops: '',
      descricao: '',
      tarefa: '',

    };
  },
   components: {
   Cadastro,
   Excluir,
   Atualizar,
  },
  methods: {

      onDataChange(items) {
          let _tutorials = [];

          items.forEach((item) => {
            let key = item.key;
            let data = item.val();
            _tutorials.push({
              key: key,
              title: data.title,
              description: data.description,
              date: data.date,
              time:data.time,
            });
          });

          this.tutorials = _tutorials;
      },

      

     sair(){
        firebase.auth().signOut().then(() => {
            this.$router.push("/");
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

  },
  mounted() {
    DataService.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    DataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style  scoped>
.Conteiner {
  width: 100%;
  background: #f6f7f8;
  height: 100vh;
}

.boxTop {
  width: 100%;
  height: 200px;
  left: 0px;
  top: 0px;
  background: #0d3c3f;
}

.TituloEmpresa {
  font-family: "Righteous", cursive;
  font-size: 19px;
  line-height: 25px;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
  color: #f8f8f8;
  padding: 20px;
}

.card-body {
  padding: 0 !important;
}

.descricaoEmpresa {
  font-family: "Righteous", cursive;
  font-size: 17px !important;
  line-height: 25px;
  text-transform: capitalize;
  color: #2fe95a !important;
}

.boxContainer {
  padding: 0 8rem;
  margin-top: -25px;
  display: grid;
  grid-template-columns: repeat(3, 20rem);
  grid-gap: 15px;
  justify-content: space-between;
}

.bodyTitle {
  font-weight: bold;
  font-size: 19px;
  color: #000000;
  font-family: "Roboto", sans-serif;
}

.GroupBotaoStructure {
  display: flex;
  justify-content: space-around;
  width: 115px;
  margin: auto;
  float: right;
}

.FormDateTime {
  width: 70%;
  display: flex;
  justify-content: space-between;
  color: grey;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 400;
}

.FormTitle {
  font-weight: 400;
  color: #000000;
  font-family: "Roboto", sans-serif;
  font-size: 1.25rem !important;
}

.Formdescripton{
  color: grey;
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  font-weight: 400;
}

.sairLogin {
  position: fixed;
  margin-top: 18px;
  margin-left: 96%;
  text-align: right;
  color: rgb(248, 232, 0);
  cursor: pointer;
}

.cardWidth {
  width: 20rem;
  border: none;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 19px;
  color: #000000;
  font-family: "Roboto", sans-serif;
  padding: 1.5rem;
  font-size: 1.25rem !important;
}

h4,
.h4 {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}
</style>>
