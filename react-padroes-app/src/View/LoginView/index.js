import React, { useState } from "react";
import { Container, Button, Card, Form } from "react-bootstrap";
import DataFactory from "../../Factory/Factory";
import DataBuilder from "../../Builder/Builder";
import "./style.css"

export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const factorys = DataFactory.userFactory(email,password,"user");
    const Builder =  DataBuilder.userBuilder();


    const login = () =>{
        Builder.loginBuilder(factorys.email,factorys.password)
        .then(() => {
            history.push(`/list`);
            console.log("login com sucesso!");
        })
        .catch((e) => {
        console.log(e);
        });
    }

    const CadastrarUser = () =>{
        Builder.CadastrarBuilder(factorys.email,factorys.password)
        .then(() => {
            history.push(`/list`);
            console.log("cadastrado com sucesso!");
        })
        .catch((e) => {
        console.log(e);
        });
    }


    return (

        <Container fluid="as" className="mainHeader">

            <Card className="text mx-auto " style={{ width: '25rem' }}>
                <Card.Body style={{ padding: '1.7rem' }}>
                    <Card.Title style={{ marginBottom: '2rem', textAlign: 'center', color: '#0d3c3f' }} > <h6> Faça login em sua conta</h6></Card.Title>

                    <Form style={{ marginBottom: '25px' }}>

                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email}
                                maxLength="30"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label> Senha </Form.Label>
                            <Form.Control type="number"
                                maxLength="30"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                    </Form>
                    <Button className="button2" block  onClick={() => login()}  >Login</Button>
                    <div className="opcao">  OU  </div>
                    <Button className="button2" block onClick={() => CadastrarUser()}>Cadastrar</Button>

                </Card.Body>
            </Card>

        </Container>
    )
}

