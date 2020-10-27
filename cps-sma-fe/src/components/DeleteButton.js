import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import MyPopup from '../util/MyPopup';

function DeleteButton({ postId, commentId, callback, getAllPosts, getPostDetails }) {

  const [confirmOpen, setConfirmOpen] = useState(false);

  
  const deletePost = async () => {

    setConfirmOpen(false);

    console.log("postId : " + postId);

    let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/deletePost", {
      method: "DELETE",
      body: JSON.stringify({
        "postId": postId,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    response = await response.json()
    if (response.stat === "200") {
      getAllPosts();
    }

  }

  const deleteComment = async () => {

    setConfirmOpen(false);

    let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/removeComment", {
      method: "DELETE",
      body: JSON.stringify({
        "postId": postId,
        "commentId": commentId,
        "useremail": localStorage.getItem("currentUserEmail")
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    response = await response.json()
    if (response.stat === "200") {

      getPostDetails();
    } else {
      getPostDetails();
    }

  }

  const handleDelete = async () => {
    commentId ? deleteComment() : deletePost();
  }

  return (
    <>
      <MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}

export default DeleteButton;
