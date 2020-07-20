import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


function LiveCall(){
    return(
        <div>
                <h2>Live Call</h2>
                <div >
                    <h6>Status: </h6>
                    <span id='call-status'>Connecting...</span>
                </div>
                <hr></hr>
                <Form>
                <Form.Group>
                    <Form.Label>To*</Form.Label>
                    <Form.Control name='to' id='phoneNumber'   required type="text"  placeholder="Phone number" />
                </Form.Group>
            </Form>
                <Button  id='call-support-button'>Call</Button><br></br>
                <Button variant='danger' id='hangup-button' >Hang Up</Button>
            </div>
    )
}

export default LiveCall;