<template>
  <div class="Conteiner">
    <b-card
      title="Faça login em sua conta"
      style="width: 25rem"
      class="mb-2 cardTitle"
    >
      <b-form style="margin-bottom: 1.5rem;margin-top: 1.5rem">

        <b-form-group id="input-group-1" label="Email" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="email"
          required
        ></b-form-input>
      </b-form-group>
      <br/>

      <b-form-group id="input-group-2" label="Senha" label-for="input-2">
      <b-form-input
          id="input-2"
          v-model="password"
          required
        ></b-form-input>
      </b-form-group>


      </b-form>
      <div>
      <b-button class="Button2"   @click="loginUser()" >Login</b-button>
      <div class="opcao">OU</div>
      <b-button  class="Button2"   @click="CadastrarUser()" >Cadastrar</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import DataController from "../Controller/Controller";
import DataFactory from "../Factory/Factory";
import DataBuilder from "../Builder/Builder";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      factorys:[],
      builder: "",
    };
  },
  methods: {

   factory(){
      this.factorys = DataFactory.userFactory(this.email,this.password,"user");
   },

   Builder(){
      this.builder = DataBuilder.userBuilder();
   },

   loginUser() {
        this.factory();
        this.Builder();
        this.builder.loginBuilder(this.factorys.email,this.factorys.password)
        .then((user) => {
             this.$router.push("/list");
             console.log("login realizado com sucesso")
        }).catch(function (error) {
             console.log(error);
        });

   },


   CadastrarUser(){
        this.factory();
        this.Builder();
        this.builder.CadastrarBuilder(this.factorys.email,this.factorys.password)
        .then((user) => {
              this.history.push(`/list`);
              console.log("cadastro realizado com sucesso")
        }).catch((error) => {
              console.log(error.code);
              console.log(error.message);
               
            });
   },

  },
};
</script>


<style scoped>
.Conteiner {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #F6F7F8;
}

 h4, .h4 {
    font-size: 1rem !important;
    font-weight: 400 !important;
    text-align: center;
}

.cardTitle {
  margin-bottom: 2rem;
  color: #0d3c3f;
  padding: 1rem;
}

.opcao {
  text-align: center;
  margin: 6px;
  font-size: 12px;
}

.Button2 {
  background-color: #0d3c3f !important;
  width: 100%;
}
</style>>
