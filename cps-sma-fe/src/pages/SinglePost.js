import React, { useContext, useState, useRef, useEffect } from 'react';
import moment from 'moment';
import {
    Button,
    Card,
    Form,
    Grid,
    Image,
    Icon,
    Label,
    Segment,
    Dimmer,
    Loader
} from 'semantic-ui-react';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';
import MyPopup from '../util/MyPopup';

function SinglePost(props) {

    const postId = props.match.params.postId;
    const { user } = useContext(AuthContext);
    const commentInputRef = useRef(null);

    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [username, setUsername] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [body, setBody] = useState("");
    const [post, setPost] = useState("");

    useEffect(() => {
        getPostDetails();
    }, []);
    /*
    const {
        data: { getPost }
    } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId
        }
    });

    function deletePostCallback() {
        props.history.push('/');
    }
    */
    const getPostDetails = async () => {

        setLoading(true);

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/getPost/" + postId);

        response = await response.json();
        if (response.stat === "200") {
            setPost(post);
            setUsername(response.post.username);
            setCreatedAt(response.post.createdAt);
            setBody(response.post.body);
            setComments(response.post.comments);
            setLoading(false);
        }

    }

    const addComment = async () => {

        setLoading(true);

        commentInputRef.current.blur();

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/addComment", {
            method: "POST",
            body: JSON.stringify({
                "postId": postId,
                "commentBody": comment,
                "useremail": localStorage.getItem("currentUserEmail")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json()
        if (response.stat === "200") {
            getPostDetails();
            setLoading(false);
        }

    }

    const deleteComment = async () => {

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/removeComment", {
            method: "DELETE",
            body: JSON.stringify({
                "postId": postId,
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

    let postMarkup;

    if (loading) {
        postMarkup = (
            <>
                <p>Loading post..</p>

                <Segment>
                    <Dimmer active inverted>
                        <Loader size='large'>Loading</Loader>
                    </Dimmer>

                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Segment>

            </>
        );
    } else {
        /*
        const {
            id,
            body,
            createdAt,
            username,
            comments,
            likes,
            likeCount,
            commentCount
        } = getPost;
        */

        postMarkup = (
            <Grid>

                <Grid.Row>

                    <Grid.Column width={2}>
                        <Image
                            src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                            size="small"
                            float="right"
                        />
                    </Grid.Column>

                    <Grid.Column width={10}>

                        <Card fluid>

                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>

                            <hr />

                            <Card.Content extra>
                                {/*
                                <LikeButton 
                                    user={user} 
                                    //post={{ id, likeCount, likes }}
                                    post={post} 
                                    />
                                */}
                                {/*
                                <MyPopup content="Comment on post">
                                    <Button
                                        as="div"
                                        labelPosition="right"
                                        onClick={() => console.log('Comment on post')}
                                    >
                                        <Button basic color="blue">
                                            <Icon name="comments" />
                                        </Button>
                                        <Label basic color="blue" pointing="left">
                                            
                                            {commentCount}
                                            
                                        </Label>
                                    </Button>
                                </MyPopup>
                                
                                </Grid.Row>
                                */}

                                {/*
                                {user && user.username === username && (
                                    <DeleteButton postId={id} callback={deletePostCallback} />
                                )}
                                */}

                            </Card.Content>

                        </Card>

                        {user && (
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form onSubmit={addComment}>
                                        <div className="ui action input fluid">
                                            <input
                                                type="text"
                                                placeholder="Comment.."
                                                name="comment"
                                                value={comment}
                                                onChange={(event) => setComment(event.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button
                                                type="submit"
                                                className="ui button teal"
                                                disabled={comment.trim() === ''}
                                            //onClick={addComment}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        )}

                        {comments.map((comm) => (



                            <Card fluid key={comm["_id"]}> 
                                <Card.Content>
                                    {user && user.username == comm.username && (
                                        <DeleteButton labelPosition="right" postId={postId} commentId={comm["_id"]} getPostDetails={getPostDetails}/>
                                    )}
                                    <Card.Header>{comm.username}</Card.Header>
                                    <Card.Meta>{moment(comm.createdAt).fromNow()}</Card.Meta>
                                    <Card.Description>{comm.body}</Card.Description>
                                </Card.Content>

                            </Card>

                        ))};

                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }

    return postMarkup;
}

/*
const SUBMIT_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
*/

export default SinglePost;
