import React, { useContext, useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import {useHistory} from "react-router-dom";

function ForgotPassword(props) {

    const [email, setEmail] = useState("");
    const [forgotPasswordMessage, setForgotPasswordMessage] = useState("");
    const history = useHistory();

    const verifyForgotUser = async () => {

        const userData = {
            "useremail": email
        }

        setEmail("");

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/forgotPassword", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type" : "application/json"
            }
        });

        response = await response.json();
        if(response.stat === "200"){

        }

        setForgotPasswordMessage(response.message)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        verifyForgotUser()
    }

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Enter Your Registered Email ID</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Button type="submit" primary>
                    Send Reset Mail
                </Button>
            </Form>
            {forgotPasswordMessage ? <h3>{forgotPasswordMessage}</h3> : null}
        </div>
    );
}


export default ForgotPassword;