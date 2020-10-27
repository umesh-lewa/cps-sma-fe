import React, { useContext, useState } from 'react';
import { Button, Form, Segment, Divider } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

import { AuthContext } from '../context/auth';

function Login(props) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const context = useContext(AuthContext);

    const loginUser = async () => {

        const userData = {
            email, password
        }

        setEmail("");
        setPassword("");

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/login", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json()
        if (response.stat === "200") {
            localStorage.setItem("jwtToken", response.token);
            localStorage.setItem("currentUserEmail", userData.email);
            let userForContext = {
                createdAt: response.createdAt,
                email: userData.email,
                id: response.id,
                token: response.token,
                username: response.username,
            };
            context.login(userForContext);
            history.push("/home");
            return;
        }else{
            setLoading(false);
        }

        setLoginMessage(response.message)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        loginUser();
    }

    const handleForgotPassword = () => {
        history.push("/forgotPassword")
    }

    //var loading = null;

    return (
        <div className="form-container">
            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Login</h1>
                <Form.Input
                    icon='user'
                    iconPosition='left'
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Form.Input
                    icon='lock'
                    iconPosition='left'
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                {loginMessage ? <h3>{loginMessage}</h3> : null}
                
                <Segment basic textAlign='center'>
                    <Button type="submit" primary>
                        Login
                    </Button>

                    <Divider horizontal>Or</Divider>

                    <Button
                        type="text"
                        primary
                        onClick={handleForgotPassword}>
                        Forgot Password ?
                    </Button>
                </Segment>

            </Form>

            
        </div>
    );
}


export default Login;
