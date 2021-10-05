import React,{useState, useEffect} from 'react';
import { Container, Navbar, Card, Form, Col} from "react-bootstrap";
import ModalCadastro from "../../components/ModalCadastro";
import ModalAtualizar from "../../components/ModalAtualizar";
import ModalExcluir from "../../components/ModalExcluir";
import DataController from "../../Controller/Controller";
import "./style.css";


export default function List({history }) {

    const [listTarefas, setListTarefas] = useState([]);

    const getTarefass = () =>{
        DataController.getAll(setListTarefas)
        .then(() => {
            console.log("listagem com sucesso!");
        })
        .catch((e) => {
        console.log(e);
        });
    }

    useEffect(() => {
        getTarefass();
    // eslint-disable-next-line
    }, [listTarefas])


    const SairUserr = () =>{
        DataController.sairLogin()
        .then(() => {
            history.push(`/`);
            console.log("logout com sucesso!");
        })
        .catch((e) => {
        console.log(e);
        });
    }

    return (

        <Container fluid="as" className="main">
            <div className="sairLogin" onClick={() => SairUserr()}>Sair</div>
            <div className="boxTop">
                <div className="tituloEmpresa">Sistema de controle de atividades</div>
               
                <Navbar className="navigation justify-content-between" >
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
                        <Card.Text className="formTitle">
                          {atividade.description}
                        </Card.Text>
                        <Card.Text>
                           <div className="formDateTime">
                               <div>
                                     <i class="far fa-calendar"></i> {atividade.date}
                               </div>
                                <div>
                                    <i class="far fa-clock"></i> {atividade.time}
                                </div>
                           </div>
                        </Card.Text>
                        <Col xs={5} className="groupBotaoStructure" >
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

