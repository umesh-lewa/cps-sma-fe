import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Label, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function LikeButton({ user, post: { _id, likeCount, likes }, isAlreadyLiked }) {

    const [liked, setLiked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        var alreadyLikedUser = likes.filter(function (el) { return el.useremail == localStorage.getItem("currentUserEmail"); });
        if (alreadyLikedUser.length == 0) {
            console.group("user has not liked previously");
        } else {
            console.group("user has already liked");
            setLiked(true);
        }
    }, []);

    const likePost = async () => {

        console.log("postId : " + _id);
        console.log("localStorage.getItem(currentUserEmail) : " + localStorage.getItem("currentUserEmail"));

        setIsLoading(true);

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/addLike", {
            method: "POST",
            body: JSON.stringify({
                "postId": _id,
                "useremail": localStorage.getItem("currentUserEmail")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json()
        if (response.stat === "200") {
            setLiked(true);
            setIsLoading(false);
        }

    }

    const unLikePost = async () => {

        setIsLoading(true);
        console.log("postId : " + _id);

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/removeLike", {
            method: "DELETE",
            body: JSON.stringify({
                "postId": _id,
                "useremail": user.useremail
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json()
        if (response.stat === "200") {
            setLiked(false);
            setIsLoading(false);
        }

    }

    const likeButton = user ? (
        liked ? (
            <Button color="blue">
                <Icon name="thumbs up" />
            </Button>
        ) : (
                <Button color="blue" basic>
                    <Icon name="thumbs up outline" />
                </Button>
            )
    ) : (
            <Button as={Link} to="/login" color="blue" basic>
                <Icon name="heart" />
            </Button>
        );

    return (
        <>
            {isLoading ? (
                <Button
                    as="div"
                    labelPosition="right"
                    className="loading" >
                    <MyPopup
                        content={liked ? 'Unlike' : 'Like'}>
                        {likeButton}
                    </MyPopup>
                    <Label
                        basic
                        color="teal" >
                        {likeCount}
                    </Label>
                </Button>
            ) : (
                    <Button
                        as="div"
                        labelPosition="right"
                        onClick={liked ? unLikePost : likePost} >
                        <MyPopup
                            content={liked ? 'Unlike' : 'Like'}>
                            {likeButton}
                        </MyPopup>
                        <Label
                            basic
                            color="teal" >
                            {likes.length}
                        </Label>
                    </Button>)}
        </>
    );
}

export default LikeButton;