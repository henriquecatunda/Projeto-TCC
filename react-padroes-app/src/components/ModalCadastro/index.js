import React, { useState } from 'react';
import { Modal, Button,Row,Col,Form } from 'react-bootstrap';
import DataController from "../../Controller/Controller";

import { google } from "../../Config/config";


export default function ModalCadastro() {

  const [atividade, setAtividade] = useState(false);
  const [check, setCheck] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const cadastrarAtividadee = () =>{

    if(check){
    let event = {
      'summary': title,
      'description': description,
      'start': {
        'dateTime': `${date}T08:00:00-10:00`
      
      },
      'end': {
        'dateTime': `${date}T08:00:00-10:00`
        
      },
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    }

    DataController.cadastrarGoogle(event)
      .then(() => {
        console.log("criado com sucesso com google!");
      })
      .catch((e) => {
        console.log(e);
      });
    }

      let data = {
        title: title,
        description: description,
        date: date,
        time: time,
      };
  
      DataController.cadastrarAtividade(data)
        .then(() => {
          console.log("criado com sucesso!");
          setAtividade(false);
        })
        .catch((e) => {
          console.log(e);
        });
  }


  function atividadeFactory(title,description,date,time){

      let atividade = {};
      atividade.title = title;
      atividade.description = description;
      atividade.date = date;
      atividade.time = time;

      return atividade;
   }

  const data = atividadeFactory(title,description,date,time);

  const cadastrarAtividade = () =>{

   if(check){
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
          
          var event = {
            'summary': title,
            'description': description,
            'start': {
              'dateTime': `${date}T08:00:00-10:00`
            
            },
            'end': {
              'dateTime': `${date}T08:00:00-10:00`
              
            },
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
  
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

    DataController.cadastrarAtividade(data)
      .then(() => {
        console.log("criado com sucesso!");
        setAtividade(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  

  return (
    <>
      <Button className="Button" variant="success" onClick={(a) => setAtividade(true) }><i class="fas fa-plus"></i> Add atividade</Button>

      <Modal show={atividade} onHide={() => setAtividade(false)}>

        <Modal.Header>
          <Modal.Title>Cadastrar Atividade</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
              <Col>
                <Form.Row>
                  <Form.Group as={Col} controlId="tituloAtvId">
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
                  <Form.Group as={Col} controlId="dataAtvId">
                    <Form.Label>Data</Form.Label>
                    <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Data da atividade" required/>
                  </Form.Group>
                </Form.Row>
              </Col>
              <Col sm={6} >
                <Form.Row>
                  <Form.Group as={Col} controlId="horaAtvId">
                    <Form.Label>Hora</Form.Label>
                    <Form.Control type="time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Hora da atividade" required/>
                  </Form.Group>
                </Form.Row>
              </Col>
          </Row>
          <Row>
            <Col>
                <Form.Check inline label="Adicionar no google agenda" name="group1" type="checkbox" id="google" onClick={(a) => setCheck(true) } />
            </Col>
          </Row>
          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={() => setAtividade(false)}> Cancelar </Button>
          <Button variant="success" onClick={() => cadastrarAtividade()} >  Cadastrar </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}