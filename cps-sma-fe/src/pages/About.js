import React, { setState, useContext, useState, useEffect } from 'react';
import { Header, Icon, Image, Message, Button, Divider, Transition } from 'semantic-ui-react';
import { AuthContext } from '../context/auth';
import { Link, useHistory } from 'react-router-dom';;

function About() {

    const [visible, setVisible] = useState(true);
    //state = { visible: true }
    const history = useHistory();

    const { user } = useContext(AuthContext);

    const toggleVisibility = () => {
        setVisible(true);
    }

    const alreadySignedInRedirect = () => {
        history.push("/home");
    }

    /* 
    // will render about page first before redirecting
    useEffect(() => {
        if(user){
            history.push("/home");
        }
    },[]);
    */

    return (
        <>
        {user ? alreadySignedInRedirect() : "" }
        
        <div>
            <Header as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content>Friends</Header.Content>
            </Header> 
            <Image
                centered
                size='large'
                src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png'
            />
            <Message icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                    <Message.Header>Stay real. Always.</Message.Header>
                    Social Media Waits for No One.
                </Message.Content>
            </Message>
            <Message
                icon='inbox'
                header='A New World Is Rising.Let’s Discover It.'
                content='Feel The Social Experience.'
            />
            <Message>
                <Message.Header>New Site Features</Message.Header>
                <Message.List>
                    <Message.Item>You can now instantlyshare posts of others</Message.Item>
                    <Message.Item>You can now update your user details</Message.Item>
                </Message.List>
            </Message>

            <Button.Group>
                <Button as={Link}
                    to="/register" color="orange" size='huge'>Get Started</Button>
                <Icon name='chevron circle right' />
                <Button.Or />
                <Button as={Link}
                    to="/login" positive size='huge'>Continue Your Journey
                    <Icon name='chevron circle right' />
                </Button>
            </Button.Group>
            {/*
            <Button
                content={visible ? 'Hide' : 'Show'}
                onClick={toggleVisibility}
            />
            <Divider hidden />
            <Transition visible={visible} animation='scale' duration={500}>
                <Image size='small' src='https://react.semantic-ui.com/images/leaves/1.png' />
            </Transition>

            <div className="footer">
                Something in Footer
            </div>
            */}

        </div>

        </>
    )
    
}

export default About;