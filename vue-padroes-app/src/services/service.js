import firebase from "../firebase";

const db = firebase;

class DataService {
  getAll() {
    return db;
  }

  create(tarefa) {
    return db.push(tarefa);
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

}

export default new DataService();