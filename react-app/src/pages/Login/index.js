import React, { useState } from "react";
import { Container, Button, Card, Form } from "react-bootstrap";

import { firebase } from '@firebase/app'
import "firebase/auth";

import "./style.css"
<script src="https://www.gstatic.com/firebasejs/7.15.5/firebase-auth.js"></script>


export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = () => {

        firebase.auth().signInWithEmailAndPassword(email, password).then(function (userCredential) {
            var user = userCredential.user;
            history.push(`/list`);

        }).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
        });

    }

    const CadastrarUser = () => {

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
            
                var user = userCredential.user;
                history.push(`/list`);
             
            })
            .catch((error) => {
                 console.log(error.code);
                 console.log(error.message);
               
            });
    }

    return (

        <Container fluid="as" className="MainHeader">

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
                    <Button className="Button2" block  onClick={() => loginUser()}  >Login</Button>

                    <div className="opcao">  OU  </div>

                    <Button className="Button2" block onClick={() => CadastrarUser()}>Cadastrar</Button>

                </Card.Body>
            </Card>

        </Container>
    )
}

