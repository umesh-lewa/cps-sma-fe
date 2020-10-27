
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';


function UsersSearch(props) {

    const [searchTerm, setSearchTerm] = useState("");

    const searchByUsername = async () => {

        props.getSearchedUsers();

        /*
        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/searchUsers/" + searchTerm);

        response = await response.json()
        if (response.stat === "200") {
            props.getSearchedUsers();
        }
        */

    }

    let handleChange = event => {
        props.onchange(event.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //searchByUsername();
        props.onSub(searchTerm);
        //props.getSearchedUsers();
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Search For Users:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Search By Userame"
                        name="body"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)
                            //onChange={handleChange
                        }
                    />
                    <Button type="submit" color="teal">
                        Search
                    </Button>
                </Form.Field>
            </Form>
        </>
    );
}

export default UsersSearch;
