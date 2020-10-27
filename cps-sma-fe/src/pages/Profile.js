import React, { useContext, useEffect, useState } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Label, List } from 'semantic-ui-react'

function Profile(props) {

    const [loading, setLoading] = useState(true);
    //const [editMessage, setEditMessage] = useState("");

    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [intro, setIntro] = useState("");

    const getUserDetails = async () => {

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/getUser/" + localStorage.getItem("currentUserEmail"));

        response = await response.json();
        if (response.stat === "200") {
            setLoading(false);
            console.log("response : "+response);
            setUsername(response.username);
            setFirstname(response.firstname);
            setLastname(response.lastname);
            setAddress(response.address);
            setIntro(response.intro);
        }else{
            setLoading(false);
        }

    }

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <div className="form-container">

            <List divided selection>
                <List.Item>
                    <Label color='olive' horizontal size="large">
                        Username
                        
                    </Label>       
                    {username}
                </List.Item>
                <List.Item>
                    <Label color='orange' horizontal size="large">
                        Email
                    </Label>
                    {localStorage.getItem("currentUserEmail")}
                </List.Item>
                <List.Item>
                    <Label color='purple' horizontal size="large">
                        First Name
                    </Label>
                    {firstname}
                </List.Item>
                <List.Item>
                    <Label color='purple' horizontal size="large">
                        Last Name
                    </Label>
                    {lastname}
                </List.Item>
                <List.Item>
                    <Label color='brown' horizontal size="large">
                        Address
                    </Label>
                    {address}
                </List.Item>
                <List.Item>
                    <Label color='green' horizontal size="large">
                        Intro
                    </Label>
                    {intro}
                </List.Item>
            </List>

            <Button type="submit"
                as={Link}
                to="/editProfile"
                primary>

                Edit Profile
            </Button>

        </div>
    );
}


export default Profile;