import React, { useState } from "react";
import Router from "next/router"
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import styes from "./Login.module.css";


export default function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")


    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();


        const url = "localhost:8000/auth/signup/"

        const reactData = { "username": username, "email": email, "password": password }




        fetch('http://localhost:8000/user/signup', {
            //mode: "no-cors",
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": '*'
            },
            body: JSON.stringify(reactData)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                if (json.message === "Signup Successful!") {
                    console.log("Result Here")
                    console.log(json)
                    localStorage.setItem('user-id', json.id)
                    localStorage.setItem('username', json.username)
                    Router.push("../homePage/homePage")
                }



            })






    }
    return (
        <div>
            <style jsx global>{`
					body {
                        backgroundImage: url("sports.jpg");
						align: auto;
						text-align: center;
					}
					
				`}</style>
            <br />
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="userName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            autoFocus
                            type="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            autoFocus
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()}>
                        Sign Up
                    </Button>
                </Form>
            </Container>
        </div>
    );

}