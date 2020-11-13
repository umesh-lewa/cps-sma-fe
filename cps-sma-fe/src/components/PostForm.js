
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';


function PostForm(props) {

    const [body, setBody] = useState("");
    const [user, setUser] = useState("");
    const [postMesage, setPostMesage] = useState("");

    const createPost = async () => {

        if(!body){
            //setLoading(false);
            return setPostMesage('Post is Empty !');
        }

        setBody("");

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/addPost", {
            method: "POST",
            body: JSON.stringify({
                "postBody": body,
                "postUserEmail": localStorage.getItem("currentUserEmail")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json()
        if (response.stat === "200") {
            props.getAllPosts(); 
        }

    }

    
    const handleSubmit = (e) => {
        e.preventDefault()
        createPost()
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <h2>Create a post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Share Your Thoughts!"
                        name="body"
                        value={body}
                        onChange={e => setBody(e.target.value)}
                    />
                    <Button type="submit" color="teal">
                        Add Post
                    </Button>
                </Form.Field>
                {postMesage ? <h3>{postMesage}</h3> : null}
            </Form>
        </>
    );
}

export default PostForm;
