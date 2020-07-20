import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import { useHistory } from "react-router-dom";
function EditProfile({user,token}){
   const [data, setData] = useState(user)
    const [isLoaded, setIsLoaded] = useState(false)
    const [message, setMessage] = useState('')
  let history = useHistory()
  useEffect(() => {
    document.getElementsByName('name')[0].value = data.name
    document.getElementsByName('age')[0].value = data.age
    document.getElementsByName('email')[0].value = data.email
    setIsLoaded(true)
  },[isLoaded])
  let handleSubmit = (e) =>{
      setMessage('')
      fetch('/users/me',{
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json;charset=utf-8',
             Authorization : 'Bearer '+ token
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
        <h1>Edit Profile</h1>
        {message}
        <Form style={{width: '30%', margin:'0 auto'}}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control name='name' id='name' required type="text"   onChange={dataOnChange} placeholder="Enter your name" />
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
            Save Profile
          </Button>
        </Form>
          
      </div>
    );
  
  
}

export default EditProfile;
