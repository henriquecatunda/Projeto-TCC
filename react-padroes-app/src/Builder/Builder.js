import DataController from "../Controller/Controller";

class DataBuilder {

    userBuilder(){

        function loginBuilder(email,password) {
            return DataController.loginUser(email,password) 
        }

        function CadastrarBuilder(email,password) {
            return DataController.cadastrarUser(email,password)
        }

        return {
            loginBuilder,
            CadastrarBuilder
        }
    }

}

export default new DataBuilder();