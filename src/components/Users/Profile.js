import React from 'react';
import {Link} from 'react-router-dom'
import Table from 'react-bootstrap/Table'

function Profile({user,token,logout}) {
  
  let deleteUser = () =>{
    fetch('/users/me', {
      method: "DELETE",
      headers: {
        Authorization : 'Bearer '+ token
      }
    }).then((res) =>{
      logout()
    })
  }
 
    return (
        <div className='App'>
            <h1>Profile</h1>
        <div style={{width:'50%', margin:'0 auto'}}>
        <Link className='btn btn-primary' style={{marginRight:'20px'}} to='/profile/edit'>Edit</Link>
        <span className='btn btn-danger' onClick={deleteUser}>Delete</span>
        </div>
        <Table style={{width:'50%', margin:'0 auto'}} striped bordered hover>
            <thead></thead>
            <tbody>
                {Object.keys(user).map(el =>
                    <tr key={el}> 
                        <td>{el}</td>
                        <td>{user[el]}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
        
      
    );
  
  
}

export default Profile;
