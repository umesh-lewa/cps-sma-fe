
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';

/*
import LikeButton from './LikeButton';
*/
import DeleteButton from './DeleteButton';
import MyPopup from '../util/MyPopup';
import LikeButton from './LikeButton';
import ShareButton from './ShareButton';

function PostCard({ post: { body, createdAt, _id, username, likes, comments, likeCount, commentCount }, getAllPosts }) {

    const { user } = useContext(AuthContext);
    const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);

    useEffect(() => {
        /*
        var alreadyLikedUser = likes.filter(function (el) { return el.useremail == localStorage.getItem("currentUserEmail"); });
        if (alreadyLikedUser.length == 0) {
            console.group("user has not liked previously");
        } else {
            console.group("user has already liked");
            setIsAlreadyLiked(true);
        }
        */
    }, []);

    useEffect(() => {
        // action on update of isAlreadyLiked
        console.log("isAlreadyLiked : " + isAlreadyLiked);

    }, [isAlreadyLiked]);

    return (
        <Card fluid>

            <Card.Content>
                <Image
                    floated="right"
                    size="mini"
                    src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${_id}`}>
                    {moment(createdAt).fromNow(true)}
                </Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>

            <Card.Content extra>

                <LikeButton user={user} post={{ _id, likes, likeCount }} isAlreadyLiked={isAlreadyLiked} />

                <MyPopup content="Comment on post">
                    <Button
                        labelPosition="right"
                        as={Link}
                        to={`/posts/${_id}`}>
                        <Button
                            color="blue"
                            basic>
                            <Icon
                                name="comment" />
                        </Button>
                        <Label
                            basic
                            color="blue"
                        //pointing="left"
                        >
                            {comments.length}
                        </Label>
                    </Button>
                </MyPopup>

                <ShareButton user={user} post={{ _id, body }} getAllPosts={getAllPosts}/>

                {user && user.username === username && <DeleteButton postId={_id} getAllPosts={getAllPosts} />}

            </Card.Content>
        </Card>
    );
}

export default PostCard;
