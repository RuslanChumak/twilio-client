import React, {useState, useEffect} from'react'
import Modal from 'react-bootstrap/Modal'
import Call from './LogMessage'


function VoiceLog({handleModal, showModal, token}){
    const [data, setData] = useState([])
    let fetchData = () =>{
        fetch('/twilio/voice',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
               Authorization : 'Bearer '+ token
            },
        })
        .then((res) => res.json())
        .then(res =>{
            setData(res.filter(item => item.to))
            
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
                    Voice Log
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <span><div style={{borderColor:'green'}} className='circle'></div> - completed</span>
                    <span><div style={{borderColor:'red'}} className='circle'></div> - no answer(busy)</span>
                    <span><div style={{borderColor:'blue'}} className='circle'></div> - in progress</span>
                    {data.map((item, index) =>
                        <Call refresh={fetchData} key={index} token={token} data={item}/>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default VoiceLog