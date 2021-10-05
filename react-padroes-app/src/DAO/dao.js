import { firebase } from '@firebase/app'
import "firebase/auth";
import database from "../firebase";
import { google } from "../Config/config";

const db = database;


class DataDAO {

  login = (email,password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }


  inserir = (email,password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
  }


  observador = (user) => {
    return  firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
      } else {
      }
    });
  }


  sair = () => {
    return  firebase.auth().signOut().then(() => {
       console.log("logout com sucesso!");
    }).catch((e) => {
      console.log(e);
    });
  }


  get = async (setListTarefas) => {
    var user = firebase.auth().currentUser;
    if (user) {
      let listTarefa = [];

      const results = await db.get();
        results.forEach(result => {
          let key = result.key;
          let data = result.val();;
          listTarefa.push({
            key: key,
            title: data.title,
            description: data.description,
            date: data.date,
            time: data.time,
          });
      });
      return setListTarefas(listTarefa);
    }
    console.log("sem usuario");
  }


  create(tarefa) {
    return db.push(tarefa);
  }


  createGoogle(event) {
    google.gapi.load('client:auth2', () => {
    console.log('loaded client')

    google.gapi.client.init({
        apiKey: google.API_KEY,
        clientId: google.CLIENT_ID,
        discoveryDocs: google.DISCOVERY_DOCS,
        scope: google.SCOPES,
      })

      google.gapi.client.load('calendar', 'v3', () => console.log('bam!'))
      google.gapi.auth2.getAuthInstance().signIn()
      .then(() => {

        var request = google.gapi.client.calendar.events.insert({
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


  update(key, value) {
    return db.child(key).update(value);
  }


  delete(key) {
    return db.child(key).remove();
  }


}

export default new DataDAO();