import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function ShareButton({ user, post: { _id, body }, getAllPosts }) {

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
    }, []);

    const sharePost = async () => {

        console.log("postId : " + _id);
        console.log("localStorage.getItem(currentUserEmail) : " + localStorage.getItem("currentUserEmail"));

        setIsLoading(true);

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/addPost", {
            method: "POST",
            body: JSON.stringify({
                "postBody": body,
                "postUserEmail": localStorage.getItem("currentUserEmail")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json()
        if (response.stat === "200") {
            setIsLoading(false);
            getAllPosts();
        }

    }

    return (
        <>
            {isLoading ? (
                <Button
                    as="div"
                    labelPosition="right"
                    className="loading" >
                    <MyPopup
                        content={"Share Post"}>
                        <Button color="blue basic">
                            <Icon name="share" />
                        </Button>
                    </MyPopup>
                </Button>
            ) : (
                    <Button
                        as="div"
                        labelPosition="right"
                        onClick={sharePost} >
                        <MyPopup
                            content={"Share Post"}>
                            <Button color="blue basic">
                                <Icon name="share" />
                            </Button>
                        </MyPopup>
                    </Button>)}
        </>
    );
}

export default ShareButton;