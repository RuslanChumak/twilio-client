import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import VoiceLog from './VoiceLog'

function Voice({token}) {
    const [data, setData] = useState({})
    const [message, setMessage] = useState('')
    const [isShow, setIsShow] = useState(false)

    let handleModal = () =>{
        setIsShow(!isShow)
    }

    let dataOnChange = (e) =>{
        let changes = data
        changes[e.target.name] = e.target.value
        setData(changes)
    };
    let handleSubmit = () =>{
        setData({})
        fetch('/twilio/voice',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
               Authorization : 'Bearer '+ token
            },
            body: JSON.stringify(data)
        })
        .then((res) => {
            let tmp = ''
            if(res.status == 200)
                tmp = <Alert style={{textAlign: 'center'}} variant='success'>Successfully sent</Alert>
            else
                tmp = <Alert style={{textAlign: 'center'}} variant='success'>{res.statusText}</Alert>
            setMessage(tmp)
        })
        
    }
    return (
        <div>
            {message}
            <h2>Voice</h2>
            <Form>
                <Form.Group>
                    <Form.Label>To*</Form.Label>
                    <Form.Control name='to' id='name' required type="text" value={data.to}  onChange={dataOnChange} placeholder="Phone number" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Text*</Form.Label>
                    <Form.Control name='text' required as="textarea" rows="3" value={data.text} onChange={dataOnChange} placeholder="Voice message text" />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Send Voice message
                </Button><br></br>
                <Button variant="secondary" onClick={handleModal}>
                    Show Voice message Log
            </Button>
                <VoiceLog showModal={isShow} handleModal={handleModal} token={token}/>
            </Form>
            
        </div>
        
      
    );
  
  
}

export default Voice;
