import taskDAO from "../DAO/dao";

class DataService {

  loginValidar(email,password){
    if (email.length === 0 || password.length === 0) {
      alert('Informar todos os campos!');
    }
    
    if(typeof email !== "undefined"){
        let lastAtPos = email.lastIndexOf('@');
        let lastDotPos = email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
           alert('Email não valido.');
         }
    }  
    return taskDAO.login(email,password);
  }


  CadastrarValidar(email,password){
    if (email.length === 0 || password.length === 0) {
      alert('Informar todos os campos!');
    }
    
    if(typeof email !== "undefined"){
        let lastAtPos = email.lastIndexOf('@');
        let lastDotPos = email.lastIndexOf('.');

        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') == -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
           alert('Email não valido.');
         }
    }  
    return taskDAO.inserir(email,password);
  
  }


  observadorValidar(user){
    if (typeof user !== "undefined" ) {
      alert('usuário invalido');
    }
    return taskDAO.observador(user);
  }


  sairValidar(){
    return taskDAO.sair();
  }


  getAllValidar(setListTarefas){
    return taskDAO.get(setListTarefas);
  }


  cadastrarAtividadeValidar(tarefa){
    if (typeof tarefa !== "object" ) {
      alert('cadastro não efetuado, atividade invalida');
    }

    return taskDAO.create(tarefa);
  }


  cadastrarGoogleValidar(event){
    if (typeof event !== "undefined" ) {
      alert('cadastro não efetuado, evento invalido');
    }

    return taskDAO.createGoogle(event);

  }


  atualizarAtividadeValidar(key,value){
    if (typeof value !== "undefined" ) {
      alert('Atualização não efetuada, campos invalidos');
    }

    return taskDAO.update(key,value);
  }


  deletarAtividadeValidar(key){
    return taskDAO.delete(key);
  }


}

export default new DataService();