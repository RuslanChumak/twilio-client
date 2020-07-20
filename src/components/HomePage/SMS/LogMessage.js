import React, {useState, useEffect} from'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
function Message({sid, token, refresh}){
    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch('/twilio/sms/' + sid,{
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
               Authorization : 'Bearer '+ token
            }
        })
        .then((res) => res.json())
        .then(res =>{
            setData(res)
            setIsLoaded(true)
        })
    }, [isLoaded])
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
    return(
        <div>
            {isLoaded && (
                <Card>
                    <Card.Header>
                        To: {data.to}
                        
                    </Card.Header>
                    <Card.Body>
                        <blockquote className="blockquote mb-0">
                        <p>{data.body}</p>
                        <footer className="blockquote-footer">
                        {new Date(data.dateSent).toLocaleString()}
                        </footer>
                        </blockquote>
                        <Button variant="danger" onClick={deleteMessage}>Delete</Button>
                    </Card.Body>
                </Card>
            )}
        </div>
        
    )
}

export default Message