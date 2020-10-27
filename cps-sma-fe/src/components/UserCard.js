
import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../context/auth';

function UserCard({ user: { username, email, intro, createdAt, id }, isAlreadyFollowing }) {

    const { user } = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(isAlreadyFollowing);
    const [isLoading, setIsLoading] = useState(false);

    /*
    useEffect(() => {
        setIsFollowing(isAlreadyFollowing);
    }, []);
    */

    const followUser = async () => {

        setIsLoading(true);

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/addFollowing", {
            method: "POST",
            body: JSON.stringify({
                "currentUserName": user.username,
                "userNameToFollow": username
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json()
        if (response.stat === "200") {
            setIsFollowing(true);
            setIsLoading(false);
        }

    }

    const unFollowUser = async () => {

        setIsLoading(true);

        let response = await fetch("https://cps-sma-umesh.herokuapp.com/users/removeFollowing", {
            method: "POST",
            body: JSON.stringify({
                "currentUserName": user.username,
                "userNameToUnFollow": username
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json()
        if (response.stat === "200") {
            setIsFollowing(false);
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{email}</Card.Meta>
                <Card.Description>
                    {/*
                    Steve wants to add you to the group <strong>best friends</strong>
                    */}
                    {intro}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>

                {isLoading ? (
                    <div>
                        <div className='ui two buttons loading'>
                            {isFollowing ? <Button
                                basic
                                color='blue'
                                className="loading"
                                >
                                UnFollow
                            </Button>
                                : <Button
                                    basic
                                    color='green'
                                    className="loading"
                                >
                                    Follow
                             </Button>}
                        </div>
                    </div>
                ) : (
                        <div className='ui two buttons'>
                            {isFollowing ? <Button
                                basic
                                color='blue'
                                onClick={unFollowUser}>
                                UnFollow
                            </Button>
                                : <Button
                                    basic
                                    color='green'
                                    onClick={followUser}>
                                    Follow
                                  </Button>}
                            {/*
                                <Button basic color='red'>
                                    Decline
                                </Button>
                            */}
                        </div>)}
            </Card.Content>
        </Card>
    );
}

export default UserCard;
