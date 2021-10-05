import DataService from "../Service/service";

class DataController {

  loginUser = (email,password) => {
   return DataService.loginValidar(email,password);
  }

 
  cadastrarUser = (email,password) => {
   return DataService.CadastrarValidar(email,password);
  }


  observadorUser = (user) => {
   return DataService.observadorValidar(user);
  }


  sairLogin = () => {
   return DataService.sairValidar();
  }


  getAll = (setListTarefas) => {
   return DataService.getAllValidar(setListTarefas);
  }

  
  cadastrarAtividade = (tarefa) => {
   return DataService.cadastrarAtividadeValidar(tarefa);
  }


  cadastrarGoogle = (event) => {
   return DataService.cadastrarGoogleValidar(event);
  }


  atualizarAtividade = (key,value) => {
   return DataService.atualizarAtividadeValidar(key,value);
  }


  deletarAtividade = (key) => {
   return DataService.deletarAtividadeValidar(key);
  }

}

export default new DataController();