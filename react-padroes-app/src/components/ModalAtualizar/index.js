import React, { useState,useEffect } from 'react';
import { Modal, Button,Row,Col,Form } from 'react-bootstrap';
import DataController from "../../Controller/Controller";

export default function ModalAtualizar(props){

  const {id, tarefa} = props;
  const [atividade, setAtividade] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
      setTitle(tarefa.title);
      setDescription(tarefa.description);
      setDate(tarefa.date);
      setTime(tarefa.time);

  }, []);

  const updateTutorial = () =>{
    const data = {
      title: title,
      description: description,
      date: date,
      time: time,
    };

    DataController.atualizarAtividade(id, data)
      .then(() => {
          console.log("Atualizado com sucesso!");
          setAtividade(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
  return (
    <>
      <Button variant="success" size="sm" onClick={(a) => setAtividade(true) }> <i className="fas fa-pen"></i></Button>

      <Modal show={atividade} onHide={() => setAtividade(false)}>

        <Modal.Header>
          <Modal.Title>Atualizar Atividade</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
              <Col>
                <Form.Row>
                  <Form.Group as={Col} controlId="descriçãoAtvId">
                    <Form.Label>Titulo da atividade</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titulo da atividade" required/>
                  </Form.Group>
                </Form.Row>
              </Col>
          </Row>
          <Row>
              <Col>
                <Form.Row>
                  <Form.Group as={Col} controlId="descriçãoAtvId">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição da atividade" required/>
                  </Form.Group>
                </Form.Row>
              </Col>
          </Row>
          <Row>
              <Col sm={6} >
                <Form.Row>
                  <Form.Group as={Col} controlId="descriçãoAtvId">
                    <Form.Label>Data</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Data da atividade" required/>
                  </Form.Group>
                </Form.Row>
              </Col>
              <Col sm={6} >
                <Form.Row>
                  <Form.Group as={Col} controlId="descriçãoAtvId">
                    <Form.Label>Hora</Form.Label>
                    <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Hora da atividade" required/>
                  </Form.Group>
                </Form.Row>
              </Col>
          </Row>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => setAtividade(false)}> Cancelar </Button>
          <Button variant="success" onClick={() => updateTutorial()}>  Atualizar </Button>
        </Modal.Footer>
      </Modal>
    </>
  );


}