import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';


import MenuBar from './components/MenuBar';
import About from './pages/About';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Landing from './pages/Landing';
import RegisterEmailConfirm from './pages/RegisterEmailConfirm';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Users from './pages/Users';
import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <MenuBar />
          <Route exact path="/" component={About} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/registerEmailConfirm" component={RegisterEmailConfirm} />
          <AuthRoute exact path="/home" component={Home} />
          <AuthRoute exact path="/users" component={Users} />
          <Route exact path="/posts/:postId" component={SinglePost} />
          <AuthRoute exact path="/profile" component={Profile} />
          <AuthRoute exact path="/editProfile" component={EditProfile} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          <Route exact path="/resetPassword" component={ResetPassword} />
          
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
