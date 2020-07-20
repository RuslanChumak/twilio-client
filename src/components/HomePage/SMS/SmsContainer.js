import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

import SmsLog from './SmsLog'

function Sms({token}) {
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
        fetch('/twilio/sms',{
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
            <h2>SMS</h2>
            <Form>
                <Form.Group>
                    <Form.Label>To*</Form.Label>
                    <Form.Control name='to' id='name'  value={data.to} required type="text"   onChange={dataOnChange} placeholder="Phone number" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Text*</Form.Label>
                    <Form.Control name='text' required as="textarea" value={data.text} rows="3" onChange={dataOnChange} placeholder="SMS text" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Media Url</Form.Label>
                    <Form.Control name='media' type='text'  value={data.media} onChange={dataOnChange} placeholder="Media url" />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit}>
                    Send SMS
                </Button><br></br>
                <Button variant="secondary" onClick={handleModal}>
                    Show SMS Log
            </Button>
                <SmsLog showModal={isShow} handleModal={handleModal} token={token}/>
            </Form>
            
        </div>
        
      
    );
  
  
}

export default Sms;
