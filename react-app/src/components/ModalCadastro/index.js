import React, { useState } from 'react';
import { Modal, Button,Row,Col,Form } from 'react-bootstrap';
import DataService from "../../services/service";


export default function ModalCadastro() {

  const [atividade, setAtividade] = useState(false);
  const [check, setCheck] = useState(false);


  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  var gapi = window.gapi;

  var CLIENT_ID = "546393215838-sp3qgd8fkb0vpo2834mp6uvtkabfbjdb.apps.googleusercontent.com"
  var API_KEY = "AIzaSyDWeI9YDiSVV23PmMPvCsESG-IB4D3__c0"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
  var SCOPES = "https://www.googleapis.com/auth/calendar.events"


  const handleClick = () => {
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn()
      .then(() => {
        
        var event = {
          'summary': title,
          'description': description,
          'start': {
            'dateTime': '2020-06-28T08:00:00-10:00'
          
          },
          'end': {
            'dateTime': '2020-06-28T08:00:00-10:00'
            
          },
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
        }

        var request = gapi.client.calendar.events.insert({
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


  const saveTutorial = () =>{

   if(check){
      gapi.load('client:auth2', () => {
        console.log('loaded client')
  
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
  
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
  
        gapi.auth2.getAuthInstance().signIn()
        .then(() => {
          
          var event = {
            'summary': title,
            'description': description,
            'start': {
              'dateTime':date + time,
              'timeZone': 'America/Brazil'
            },
            'end': {
              'dateTime': date + time,
              'timeZone': 'America/Brazil'
            },
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          }
  
          var request = gapi.client.calendar.events.insert({
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
    
    let data = {
      title: title,
      description: description,
      date: date,
      time: time,
    };

    DataService.create(data)
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
          <Button variant="success" onClick={() => saveTutorial()} >  Cadastrar </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}