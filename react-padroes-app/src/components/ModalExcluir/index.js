import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DataController from "../../Controller/Controller";

export default function ModalExcluir(props) {

  const {id, descricao} = props;
  const [deleteAtivity, setDeleteAtivity] = useState(false);

  const deleteTutorial = () => {
    DataController.deletarAtividade(id)
        .then(() => {
          console.log("Deletado com sucesso!");
          setDeleteAtivity(false);
          
        })
        .catch((e) => {
          console.log(e);
        });
  }

  return (
    <>
      <Button variant="success" size="sm" onClick={(a) => setDeleteAtivity(true) }> <i className="far fa-trash-alt"></i></Button>

      <Modal show={deleteAtivity} onHide={() => setDeleteAtivity(false)}>

        <Modal.Header>
          <Modal.Title>Deletar atividade? </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Descrição: {descricao}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => setDeleteAtivity(false)}> Cancelar </Button>
          <Button variant="success" onClick={() => deleteTutorial()}>  Excluir </Button>
        </Modal.Footer>
      </Modal>
    </>
  );


}