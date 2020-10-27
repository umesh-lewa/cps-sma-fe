import React, { useContext, useState, useEffect } from 'react';
import { Grid, Transition } from 'semantic-ui-react';
import { Placeholder, Segment, Rail } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import PlaceholderExampleGrid from "../components/PlaceholderExampleGrid";

import { AuthContext } from '../context/auth';

function Home(props) {

  const [userPosts, setUserPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isPostAlreadyLiked, setIsPostAlreadyLiked] = useState(false);

  //var loading = null;

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {

    let response = await fetch("https://cps-sma-umesh.herokuapp.com/posts/getPosts/" + user.email);

    response = await response.json();
    if (response.stat === "200") {
      setLoading(false);
      setUserPosts(response.userPosts);
      setFollowingPosts(response.followingPosts);
    }

  }

  return (

    <>
      <Grid columns={3}>

        <Grid.Row className="page-title centered">
          <h1>User Posts</h1>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <PostForm getAllPosts={getAllPosts} />
          </Grid.Column>
        </Grid.Row>

      </Grid>

      <Rail position='right'>
        <Segment>Right Rail Content</Segment>
      </Rail>

      {loading ? (

        <>
          <h1>Loading posts..</h1>

          <PlaceholderExampleGrid />

        </>

      ) : (
          <Grid columns={3}>
            <Grid.Row>
              <Transition.Group>
                {userPosts &&
                  userPosts.map((post) => (
                    <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} getAllPosts={getAllPosts} />
                    </Grid.Column>
                  ))}
                {followingPosts &&
                  followingPosts.map((post) => (
                    <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} getAllPosts={getAllPosts}/>
                </Grid.Column>
                  ))}
              </Transition.Group>
            </Grid.Row>
          </Grid>
        )}

    </>

    /*
    <Grid columns={3}>
      
      <Grid.Row>



        {loading ? (
          <h1>Loading posts..</h1>
          
        ) : (
            
          )}

      </Grid.Row>
    </Grid>
        */
  );
}

export default Home;