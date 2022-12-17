import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Login(props) {

    let history = useHistory();
    const loginSuccess = (event) => {

        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        axios.post("/login",
            {
                email,
                password
            }).then(res => {
                if (res.data.token) {

                    alert("You have successfully login");
                    
                    history.push('/home');
                    window.location.reload();

                    let responseJson = res.data.token;
                    sessionStorage.setItem('userData', responseJson);

                }

            }).catch(err => alert("Wrong Username or Password"), history.push('/login'))
    }
    return (
        <>

            <h2 className="page-title">Login</h2>
            <div className="login-div">
                <div className="login-form">
                    <Form onSubmit={loginSuccess}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" name="email" required />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" required />
                        </Form.Group>

                        <Link className="nav-link" aria-current="page" to="/forgotpassword">
                            Forgot Password
                        </Link>

                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>
            </div>
        </>
    );
}
