import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom";
function SignUp({getToken}){
   const [data, setData] = useState({
       name : '',
       age: 0,
       email: '',
       password: ''
    })
    const [message, setMessage] = useState('')
  let history = useHistory()
  
  let handleSubmit = (e) =>{
      setMessage('')
      fetch('/users',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(data)
      })
      .then((res) => {

        if(res.headers.get('Content-Type') === 'text/html; charset=utf-8')
        {
            return res.text()
        }
        else
        {
            return res.json()
        }   
      })
      .then(res => {
            if(res instanceof Object){
                getToken(res)
                history.push('/profile')
            } 
            else{
                let tmp = <Alert style={{textAlign: 'center'}} variant='danger'>{res}</Alert>
                setMessage(tmp)
            }

      })
      
  }
  let dataOnChange = (e) =>{
    let changes = data
    changes[e.target.name] = e.target.value
    setData(changes)
  };
  
    return (
      <div className="App">
        <h1>Sign Up</h1>
        {message}
        <Form action='/tasks' style={{width: '30%', margin:'0 auto'}}>
  <Form.Group>
    <Form.Label>Name</Form.Label>
    <Form.Control name='name' required type="text"  onChange={dataOnChange} placeholder="Enter your name" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Age</Form.Label>
    <Form.Control name='age' required type='number' onChange={dataOnChange} placeholder="Enter your age" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Email</Form.Label>
    <Form.Control name='email' required type='email'onChange={dataOnChange} placeholder="Enter your email" />
  </Form.Group>
  <Form.Group >
    <Form.Label>Password</Form.Label>
    <Form.Control name='password' required type='password' onChange={dataOnChange} placeholder="Password..." />
  </Form.Group>
  <Button variant="primary" onClick={handleSubmit}>
    Sign Up
  </Button>
</Form>
          
      </div>
    );
  
  
}

export default SignUp;
