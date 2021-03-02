import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Router from "next/router"
import styes from "./Login.module.css";


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        const reactData = { "username": username, "password": password }




        fetch('http://localhost:8000/user/signin', {
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
                if (json.message === "Signin successful") {
                    console.log("Result Here")
                    console.log(json)
                    localStorage.setItem('user-id', json.id)
                    localStorage.setItem('username', json.username)
                    Router.push("../homePage/homePage")
                }



            })
    }


    return (
        <div style={{
            backgroundImage: `url("sports.jpg")`
        }}>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    Login
        </Button>
            </Form>
        </div>
    );

}