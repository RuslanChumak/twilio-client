import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import './App.css';

import SignUp from './components/Users/SignUp'
import Login from './components/Users/Login'
import Profile from './components/Users/Profile'
import EditProfile from './components/Users/EditProfile'
import UsersList from './components/Users/UsersList'

import Home from './components/HomePage/Home'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  let getToken = (t) =>{
    setToken(t.token)
    setUser(t.user)
    localStorage.setItem('token',t.token)
    localStorage.setItem('user',JSON.stringify(t.user))
  }
  let logout = () =>{
    fetch('/users/logoutAll',{
      method: 'POST',
      headers : {
        Authorization : 'Bearer '+ token
      }
    }).then(() =>{
      sessionStorage.clear()
      setToken(null)
    })
  }
  
    let nav=''
    let logged = false
    if(token !== null){
      nav = <Nav  className='mr-right'><Link className='nav-link' to='/profile'>Profile</Link><a href='#' className='nav-link' onClick={logout}>Logout</a></Nav>
      logged = true
    }
    else 
      nav = <Nav className='mr-right'><Link className='nav-link' to='/signup'>Sign Up</Link><Link className='nav-link' to='/login'>Login</Link></Nav>
    return (
      
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Twillio</Navbar.Brand>
            <Nav className="mr-auto">
              <Link className='nav-link' to='/'>Home</Link>
              <Link className='nav-link' to='/users'>Users</Link>
            </Nav>
            {nav}
            
          </Navbar>
          <div className="App">
            
          </div>
          <Switch>
            <Route path='/signup'>
                <SignUp getToken={getToken} />
            </Route>
            <Route path='/login'>
                <Login getToken={getToken} />
            </Route>
            
            <Route path='/profile/edit'>
              {logged ? <EditProfile user={user} token={token} /> : <Redirect to="/login" />}
            </Route>
            <Route path='/profile'>
              {logged ? <Profile user={user} token={token} logout={logout} /> : <Redirect to="/login" />}
            </Route>
            <Route path='/users'>
              {logged ? <UsersList token={token} /> : <Redirect to="/login" />}
            </Route>
            <Route path='/'>
              {logged ? <Home token={token} /> : <Redirect to="/login" />}
            </Route>
         
            
          </Switch>
        </Router>
      
    );
  
  
}

export default App;
