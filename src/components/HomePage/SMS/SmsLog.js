import React, {useState, useEffect} from'react'
import Modal from 'react-bootstrap/Modal'
import Message from './LogMessage'
function SmsLog({handleModal, showModal, token}){
    const [data, setData] = useState([])
    
    let fetchData = () =>{
        fetch('/twilio/allsms',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
               Authorization : 'Bearer '+ token
            },
        })
        .then((res) => res.json())
        .then(res =>{
            setData(res)
            
        })
    }
    useEffect(() => {
        fetchData()
    }, [showModal])

    return(
        <div>
            <Modal
                show={showModal}
                onHide={() => handleModal()}
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    Sms Log
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {data.map((item, index) =>
                        <Message refresh={fetchData} key={index} token={token} sid={item.sid}/>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SmsLog