import React from "react";
import { io } from 'socket.io-client';
import { useEffect,useState } from "react";
import SocketContext from "./SocketContext";

function Socket({children}){
    const [socket,setSocket]=useState()
    useEffect(() => {
        // Establish socket connection
        const newSocket = io(import.meta.env.VITE_PORT);
    
        setSocket(newSocket);
    
        // Clean up on unmount
        return () => {
          newSocket.disconnect();
        };
      }, []);


    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}
export default Socket;