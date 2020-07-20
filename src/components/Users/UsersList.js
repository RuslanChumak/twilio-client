import React, { Component } from 'react';

import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'

class UsersList extends Component {
  state = {
    info: [],
    error: '',
    controller: new AbortController()
  }
  getInfo = () =>{
    if(this.props.token !== '')
    fetch('/users',{
        headers : {
          Authorization : 'Bearer '+ this.props.token
        },
        signal: this.state.controller.signal
      }).then(res => res.json())
      .then(user =>{
        if(user.error !== undefined){
          let tmp = <Alert style={{textAlign: 'center'}} variant='danger'>{user.error}</Alert>
          this.setState({error: tmp, info: {}})
        }
      else
          this.setState({info: user})
      })
  }
  componentDidMount(){
    this.getInfo()
  }
  componentWillUnmount(){
    this.state.controller.abort()
  }
  render(){
      const {info, error} = this.state
    return (
        <div className='App'>
            <h1>UsersList</h1>
        {error}
        <Table style={{width:'50%', margin:'0 auto'}} striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
        </tr>
            </thead>
            <tbody>
                {info.map(el =>
                    <tr key={el._id}> 
                        <td>{info.indexOf(el)+1}</td>
                        <td>{el.name}</td>
                        <td>{el.age}</td>
                        <td>{el.email}</td>
                    </tr>
                )}
            </tbody>
        </Table>
        </div>
        
      
    );
  }
  
}

export default UsersList;
