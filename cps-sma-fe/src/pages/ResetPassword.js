import React, { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";

function ResetPassword(props) {

    const { userid, reset_token } = useParams();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [resetPasswordMessage, setResetPasswordMessage] = useState("");
    const [email, setEmail] = useState("");
    const [isvalid, setIsvalid] = useState(false);
    const history = useHistory();

    useEffect(() => {

        fetch("https://cps-sma-umesh.herokuapp.com/users/reset/" + userid + "/" + reset_token)
            .then(async (res) => {
                let data = await res.json();
                //console.log(data)
                if (data.message === "Valid RESET URL") {
                    setEmail(data.email);
                    setIsvalid(true);
                } else {
                    alert(data.message);
                    setResetPasswordMessage(data.message);
                }
            })
            .catch((err) => {
                console.log(err);
            })

    }, [reset_token, userid]);

    const setNePassword = (e) => {
        setNewPassword(e.target.value);
    }

    const setConPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const resetPassword = async () => {

        const userData = {
            "email": email,
            "password": newPassword
        }

        setNewPassword("");
        setConfirmPassword("");

        if (!userData.password) {
            return setResetPasswordMessage('Password is required');
        }

        if (userData.password != confirmPassword) {
            return setResetPasswordMessage('Passwords do not match');
        }

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/reset/", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json()
        if (response.stat === "200") {
            history.push("/login");
        }

        setResetPasswordMessage(response.message)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        resetPassword();
    }

    var loading = null;

    if (isvalid) {
        return (
            <div className="form-container">
                <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                    <h1>Enter Your New Password</h1>
                    <Form.Input
                        label="Password"
                        placeholder="Password.."
                        name="password"
                        type="password"
                        value={newPassword}
                        onChange={setNePassword}
                    />
                    <Form.Input
                        label="Confirm Password"
                        placeholder="Confirm Password.."
                        name="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={setConPassword}
                    />
                    <Button type="submit" primary>
                        Reset Password
                    </Button>
                </Form>
                {resetPasswordMessage ? <h3>{resetPasswordMessage}</h3> : null}
            </div>
        );
    } else {
        return (
            <h2>Invalid Url</h2>
        )
    }

}

export default ResetPassword;