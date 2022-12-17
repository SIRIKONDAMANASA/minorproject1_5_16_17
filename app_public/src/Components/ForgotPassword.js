import React from "react";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import axios from "axios";

export default function Login(props) {


    const api = '/forgotPassword';
    const token = sessionStorage.getItem('userData');

    const forgotpassword = (event) => {

        var body = {
            email: event.target.forgotemail.value
        }

        event.preventDefault();

        axios({
            method: 'post',
            url: api,
            data: body,
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {

            alert("Password has been sent on registered email");

        }).catch((err) => {
            console.log(err)
        });
    }

    return (
        <>
            <div className="heroimage-div">
                <img src="../images/covers/contactus_main.jpg" alt="" />
                <div class="centered">Forgot Password</div>
            </div>

            <div className="login-div">
                <div className="login-form">
                    <Form onSubmit={forgotpassword}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter email to get password on email</Form.Label>
                            <Form.Control type="email" name="forgotemail" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    );
}
