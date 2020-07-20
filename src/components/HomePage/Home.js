import React, {useState} from 'react';
import Sms from './SMS/SmsContainer'
import Voice from './Voice/VoiceContainer'
import LiveCall from './Voice/LiveCall'

function Home({token}) {
    
    return (
        <div className='Home'>
            <Sms token = {token}/>
            <Voice token = {token}/>
            <LiveCall />
        </div>
    );
  
  
}

export default Home;
