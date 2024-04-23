import React,{ createContext, useState, useRef, useEffect } from 'react';

import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import * as process from 'process';

(window).global = window;
(window ).process = process;
(window).Buffer = [];
const SocketContext=createContext();

const socket=io('https://online-meet-app.onrender.com/');

const ContextProvider=({ children })=>{
 const [stream,setStream]=useState(null);
 const [me,setMe]=useState('');
 const [call,setCall]=useState({});
 const [callAccepted,setCallAccepted]=useState(false);
 const [callEnded,setCallEnded]=useState(false);
const [name,setName]= useState('')

const myVideo=useRef();
const userVideo=useRef();
const connectionRef=useRef();

  useEffect(()=>{
     navigator.mediaDevices.getUserMedia({ video:true,audio:true})
     .then((currentStream)=>{
        setStream(currentStream);
        if(myVideo.current){
        myVideo.current.srcObject = currentStream;
        }
     })
     .catch((error) => {
      console.error('Error accessing user media:', error);
    });

     socket.on('me',(id)=>setMe(id));
     
     socket.on('callUser',({ from ,name:callerName, signal})=>{
        setCall({isReceivingCall:true, from, name: callerName, signal})
     })
  }, []);

const answerCall =()=>{
  setCallAccepted(true)

  const peer=new Peer({ initiator:false ,trickle:false ,stream});

  peer.on('signal',(data)=>{
    socket.emit('answerCall',{ signal:data, to:call.from })
  });

  peer.on('stream',(currentStream)=>{
    if(userVideo.current){
    userVideo.current.srcObject=currentStream;
    }
  })
  

  peer.signal(call.signal);

  connectionRef.current=peer;
}
const callUser =(id)=>{
  const peer=new Peer({ initiator:true ,trickle:false ,stream});

  peer.on('signal',(data)=>{
    socket.emit('callUser',{ userToCall:id, signalData:data, from: me, name})
  });

  peer.on('stream',(currentStream)=>{
    if(userVideo.current)
    userVideo.current.srcObject=currentStream;
  })
  
  
  socket.on('callAccepted',(signal)=>{
    setCallAccepted(true);
    
    peer.signal(signal);
  });
  connectionRef.current=peer;
}
const leaveCall=()=>{

  setCallEnded(true);
  // connectionRef.current?.destroy();
  if (connectionRef.current) {
    connectionRef.current.destroy();
  }
  // connectionRef.current = peer;
  // peer.close();
  // peer = null;
  // Peer.destroy()

  window.location.reload();
};

return(
  <SocketContext.Provider value={{
    call,
    callAccepted,
    myVideo,
    userVideo,
    stream,
    name,
    setName,
    callEnded,
    me,
    callUser,
    leaveCall,
    answerCall,
  }}>
   {children}
  </SocketContext.Provider>
);

}
export { ContextProvider,SocketContext};