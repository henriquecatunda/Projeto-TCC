class DataFactory {

    userFactory(email,password,type){

      let factory = {};

      if(type === 'user'){
          factory.email = email;
          factory.password = password;
      }

      if(type === 'dev'){
          factory.email = email;
          factory.password = password;
      }

      return factory;
  }

}

export default new DataFactory();