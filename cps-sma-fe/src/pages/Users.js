import React, { useContext, useState, useEffect } from 'react';
import { Card } from 'semantic-ui-react';
import { Grid, Transition } from 'semantic-ui-react';
import { PlaceholderLine } from 'semantic-ui-react';

import UserCard from '../components/UserCard';
import UsersSearch from './UsersSearch';

import PlaceholderExampleGrid from "../components/PlaceholderExampleGrid";

function Users(props) {

  const [users, setUsers] = useState([]);
  const [alreadyFollowingUsers, setAlreadyFollowingUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  //var loading = null;

  useEffect(() => {
    getAllUsers();
  }, []);

  const onSub = (data) => {
    console.log("data : " + data);
    let temp = data.toString();
    console.log("temp : " + temp);
    setSearchTerm(temp);
    console.log("searchTerm : " + searchTerm);
    getSearchedUsers();
  }

  useEffect(() => {
    // action on update of searchTerm
    console.log("searchTerm : " + searchTerm);
    getSearchedUsers();
  }, [searchTerm]);

  const getAllUsers = async () => {

    let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/getUsers")

    response = await response.json();
    if (response.stat === "200") {
      //let usersFetch = response.users;
      //let users =  await usersFetch.json();
      let users = response.users;
      console.log("users : " + JSON.stringify(users));
      /*
      var filtered = users.filter(function (el) { return el.email != localStorage.getItem("currentUserEmail"); });
      setUsers(filtered);
      */
      var currentUser = users.filter(function (el) { return el.email == localStorage.getItem("currentUserEmail"); });
      console.log("currentUser : " + JSON.stringify(currentUser[0]));
      //var currentUserId = currentUser._id;
      var currentUserObj = currentUser[0];
      var currentUserId = currentUserObj["_id"];
      console.log("currentUserId : " + currentUserId);
      var currentUserFollowing = currentUserObj.following;
      console.log("currentUserFollowing : " + currentUserFollowing);
      let followingUsersArray = currentUserFollowing.toString().split(",");
      console.log("followingUsersArray : " + followingUsersArray);
      var filtered = users.filter(function (el) { return el.email != localStorage.getItem("currentUserEmail"); });

      var usersFiltered = [];
      var alreadyFollowingUsersFiltered = [];

      for (let i = 0; i < filtered.length; i++) {
        if (followingUsersArray.includes(filtered[i]._id.toString())) {
          alreadyFollowingUsersFiltered.push(filtered[i]);
        } else {
          usersFiltered.push(filtered[i]);
        }
      }

      setLoading(false);
      setUsers(usersFiltered);
      setAlreadyFollowingUsers(alreadyFollowingUsersFiltered);
    }

  }

  const getSearchedUsers = async () => {

    setLoading(true);

    let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/searchUsers/" + localStorage.getItem("currentUserEmail") + "/" + searchTerm);

    response = await response.json()
    if (response.stat === "200") {
      let users = response.users;
      console.log("users : " + JSON.stringify(users));

      var currentUser = users.filter(function (el) { return el.email == localStorage.getItem("currentUserEmail"); });
      console.log("currentUser : " + JSON.stringify(currentUser[0]));
      //var currentUserId = currentUser._id;
      var currentUserObj = currentUser[0];
      var currentUserId = currentUserObj["_id"];
      console.log("currentUserId : " + currentUserId);
      var currentUserFollowing = currentUserObj.following;
      console.log("currentUserFollowing : " + currentUserFollowing);
      let followingUsersArray = currentUserFollowing.toString().split(",");
      console.log("followingUsersArray : " + followingUsersArray);

      var filtered = users.filter(function (el) { return el.email != localStorage.getItem("currentUserEmail"); });
      console.log("filtered : " + filtered);

      var usersFiltered = [];
      var alreadyFollowingUsersFiltered = [];

      for (let i = 0; i < filtered.length; i++) {
        if (followingUsersArray.includes(filtered[i]._id.toString())) {
          alreadyFollowingUsersFiltered.push(filtered[i]);
        } else {
          usersFiltered.push(filtered[i]);
        }
      }

      setLoading(false);
      setUsers(usersFiltered);
      setAlreadyFollowingUsers(alreadyFollowingUsersFiltered);
    }

  }

  return (

    <>
      <Grid columns={3}>

        <Grid.Row className="page-title centered">
          <h1>All Users</h1>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <UsersSearch getSearchedUsers={getSearchedUsers} onSub={onSub} />
          </Grid.Column>
        </Grid.Row>

      </Grid>

      {loading ? (

        <>
          <h1>Loading users..</h1>
          <PlaceholderExampleGrid />
        </>

      ) : (
          <Grid columns={3}>
            <Grid.Row>
              <Transition.Group>
                {/*
              {console.log("users : " + users)}
              */}

                {users &&
                  users.map((user) => (
                    <Grid.Column key={user._id} style={{ marginBottom: 20 }}>
                      <UserCard isAlreadyFollowing={false} user={user} />
                    </Grid.Column>
                  ))}
                {alreadyFollowingUsers &&
                  alreadyFollowingUsers.map((user) => (
                    <Grid.Column key={user._id} style={{ marginBottom: 20 }}>
                      <UserCard isAlreadyFollowing={true} user={user} />
                    </Grid.Column>
                  ))}

              </Transition.Group>
            </Grid.Row>
          </Grid>
        )}

    </>
  )

}

export default Users;