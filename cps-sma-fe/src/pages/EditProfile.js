import React, { useContext, useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";

function EditProfile(props) {

    const [loading, setLoading] = useState(true);
    const [editMessage, setEditMessage] = useState("");

    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [intro, setIntro] = useState("");

    const history = useHistory();

    const getUserDetails = async () => {

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/getUser/" + localStorage.getItem("currentUserEmail"));

        response = await response.json();
        if (response.stat === "200") {
            setLoading(false);
            console.log("response : " + response);
            setUsername(response.username);
            setFirstname(response.firstname);
            setLastname(response.lastname);
            setAddress(response.address);
            setIntro(response.intro);
        } else {
            setLoading(false);
        }

    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        
        console.log("username : " + username);
        console.log("firstname : " + firstname);
        console.log("lastname : " + lastname);
        console.log("address : " + address);
        console.log("intro : " + intro);

        let strUsername;
        let strFirstname;
        let strLastname;
        let strAddress;
        let strIntro;

        if (username) {
            strUsername = username;
        } else {
            strUsername = "";
        }
        if (firstname) {
            strFirstname = firstname;
        } else {
            strFirstname = "";
        }
        if (lastname) {
            strLastname = lastname;
        } else {
            strLastname = "";
        }
        if (address) {
            strAddress = address;
        } else {
            strAddress = "";
        }
        if (intro) {
            strIntro = intro;
        } else {
            strIntro = "";
        }

        console.log("strUsername : " + strUsername);
        console.log("strFirstname : " + strFirstname);
        console.log("strLastname : " + strLastname);
        console.log("strAddress : " + strAddress);
        console.log("strIntro : " + strIntro);

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/editUserDetails", {
            method: "PATCH",
            body: JSON.stringify({
                "usermail": localStorage.getItem("currentUserEmail"),
                "username": strUsername,
                "firstname": strFirstname,
                "lastname": strLastname,
                "address": strAddress,
                "intro": strIntro,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json()
        if (response.stat === "200") {
            history.push("/profile");
            setEditMessage("Successfuly Updated Details");
        } else {
            setEditMessage(response.message);
            setLoading(false);
        }

    }

    return (
        <>

            <Form onSubmit={handleSubmit} noValidate className={loading ? 'loading' : ''}>
                <h1>Update User Details</h1>
                <Form.Input
                    defaultValue={username}
                    label="Username"
                    placeholder="Username.."
                    name="Username"
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <Form.Input
                    defaultValue={firstname}
                    label="First Name"
                    placeholder="First Name.."
                    name="First Name"
                    type="text"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                />
                <Form.Input
                    defaultValue={lastname}
                    label="Last Name"
                    placeholder="Last Name.."
                    name="Last Name"
                    type="text"
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                />
                <Form.Input
                    defaultValue={lastname}
                    label="Address"
                    placeholder="Address.."
                    name="Address"
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                />
                <Form.Input
                    defaultValue={intro}
                    label="Intro"
                    placeholder="Intro.."
                    name="Intro"
                    type="text"
                    value={intro}
                    onChange={e => setIntro(e.target.value)}
                />
                <Button type="submit" primary>
                    Submit
                </Button>
                {editMessage ? <h3>{editMessage}</h3> : null}
            </Form>

        </>
    );
}


export default EditProfile;