import React,{useState, useEffect} from 'react';
import { Container, Navbar, Card, Form, Col} from "react-bootstrap";
import ModalCadastro from "../../components/ModalCadastro"
import ModalAtualizar from "../../components/ModalAtualizar"
import ModalExcluir from "../../components/ModalExcluir"

import "./style.css";

import { firebase } from '@firebase/app'
import "firebase/auth";
import firebasee from "../../firebase";

const db = firebasee.ref("/tarefas");

export default function List({history }) {

    const [listTarefas, setListTarefas] = useState([]);

    const getTarefas = async() =>  {

        var user = firebase.auth().currentUser;

        if(user){
        
        let listTarefas = [];

         const results = await db.get();
         
         results.forEach(result => {
             let key =  result.key;
             let data = result.val();;
             listTarefas.push({
                 key: key,
                 title: data.title,
                 description: data.description,
                 date: data.date,
                 time: data.time,
             });
         });
         return setListTarefas(listTarefas); 
        }
        console.log("sem usuario");
     }         
    
    useEffect(() => {
        
      getTarefas();
    // eslint-disable-next-line
    }, [listTarefas])


    const sair = () => {
        firebase.auth().signOut().then(() => {
            history.push(`/`);

            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          });
    }

    return (

        <Container fluid="as" className="Main">
            <div className="sairLogin" onClick={() => sair()}>Sair</div>
            <div className="boxTop">
                <div className="TituloEmpresa">Sistema de controle de atividades</div>
               

                <Navbar className="Navigation justify-content-between" >
                    <Navbar.Brand className="descricaoEmpresa"> Atividades cadastradas </Navbar.Brand>
                    <Form inline>
                       {/* <FormControl type="text" placeholder="Pesquisar" className=" mr-sm-2" /> */}
                        <ModalCadastro/>
                    </Form>
                </Navbar>
            </div>

            <div className="boxContainer">

            {listTarefas &&
              listTarefas.map((atividade, index) => (
                <Card style={{ width: '20rem', border: 'none', marginBottom: '10px' }} key={index}>
                    <Card.Body style={{ padding: '1.5rem' }}>
                        <Card.Title className="bodyTitle">{atividade.title}</Card.Title>
                        <Card.Text className="FormTitle">
                          {atividade.description}
                        </Card.Text>
                        <Card.Text>
                           <div className="FormDateTime">
                               <div>
                                     <i class="far fa-calendar"></i> {atividade.date}
                               </div>
                                <div>
                                    <i class="far fa-clock"></i> {atividade.time}
                                </div>
                           </div>
                        </Card.Text>
                        <Col xs={5} className="GroupBotaoStructure" >
                             <ModalAtualizar id={atividade.key} tarefa={atividade}/>
                             <ModalExcluir id={atividade.key} descricao={atividade.title}/>
                        </Col>
                    </Card.Body>
                </Card>
                 ))}
            </div>

        </Container>
    )
}

