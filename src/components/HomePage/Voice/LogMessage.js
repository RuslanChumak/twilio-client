import React, {useState, useEffect} from'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
function Call({data, token, refresh}){

    
    let deleteMessage = () =>{
        fetch('/twilio/sms',{
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
               Authorization : 'Bearer '+ token
            },
            body: JSON.stringify({sid: data.sid})
        }).then(res => {
            refresh()
        })
    }
    let variant = 'light'
    switch(data.status){
        case 'completed': { variant = 'success'; break; }
        case 'in-progress': { variant = 'primary'; break; }
        case 'busy': { variant = 'danger'; break; }
        case 'no-answer': { variant = 'danger'; break; }
    }
    return(
        <div>
                <Card border={variant}>
                    <Card.Header>
                        <span className='to'><span>To:</span> {data.to}</span>   <span className='date'><span>Date:</span> {new Date(data.startTime).toLocaleString()}</span>
                    </Card.Header>
                </Card>
        </div>
        
    )
}

export default Call