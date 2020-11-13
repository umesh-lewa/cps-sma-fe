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
  const [allPosts, setAllPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [isPostAlreadyLiked, setIsPostAlreadyLiked] = useState(false);

  const [isUserPosts, setIsUSerPosts] = useState(false);
  const [isFollowingPosts, setIsFollowingPosts] = useState(false);
  const [isPosts, setIsPosts] = useState(false);
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
      setAllPosts(response.allPosts);

      console.log("allPosts : " + JSON.stringify(allPosts));

      //console.log("response : " + JSON.stringify(response));
      //console.log("response.userPosts.length : " + response.userPosts.length);
      //console.log("fresponse.followingPosts.length : " + response.followingPosts.length);
      // || (response.allPosts.length == 0)
      //if ((response.userPosts.length == 0 && response.followingPosts.length == 0)) {
      if (response.allPosts.length == 0) {
        console.log("no posts are there");
        setIsPosts(false);
        if (response.userPosts.length == 0) {
          setIsUSerPosts(false);
        }
        if (response.followingPosts.length == 0) {
          setIsFollowingPosts(false);
        }
      } else {
        console.log("some posts are there");
        setIsPosts(true);
      }

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

          <>
            {isPosts ? (
              <Grid columns={3}>
                <Grid.Row>
                  <Transition.Group>

                    {allPosts &&
                      allPosts.map((post) => (
                        <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                          <PostCard post={post} getAllPosts={getAllPosts} />
                        </Grid.Column>
                      ))}

                    {/*
                    {userPosts &&
                      userPosts.map((post) => (
                        <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                          <PostCard post={post} getAllPosts={getAllPosts} />
                        </Grid.Column>
                      ))}

                    {followingPosts &&
                      followingPosts.map((post) => (
                        <Grid.Column key={post._id} style={{ marginBottom: 20 }}>
                          <PostCard post={post} getAllPosts={getAllPosts} />
                        </Grid.Column>
                      ))}
                        */}
                  </Transition.Group>
                </Grid.Row>
              </Grid>
            ) : (
                <h2>No Posts Yet ! Follow new people or start sharing !</h2>
              )}
          </>

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