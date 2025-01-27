import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./RoomPage.module.css"; // Import the CSS module
import SocketContext from "./Context/SocketContext";
import {useNavigate} from 'react-router-dom'
import UserContext from './Context/UserContext'
import  { v4 as uuidv4 } from 'uuid';

const RoomPage = () => {
  const socket=useContext(SocketContext)
  const {getuser,users}=useContext(UserContext)
  getuser(socket);
  const navigate=useNavigate()

  
  
  const [formType, setFormType] = useState(null); // null, "create", "join"
  const [roomId, setRoomId] = useState(""); // State to hold the room ID
  const [email, setEmail] = useState(""); // State to hold the email input
  const handleFormType = useCallback((type) => {
    setFormType(type);
  }, []);
  const resetFormType = useCallback(() => {
    setFormType(null);
  }, []);



  useEffect(() => {
    if (!socket) return; // Ensure socket is available
    
    socket.on("output", (data) => {
      console.log("output")
      // When the event is triggered, navigate to '/2' with socket state
      navigate("/2");
    });
  
    // Cleanup to prevent duplicate listeners
    return () => {
      socket.off('output');
    };
  }, [socket]);
  




 

  const joinRoom=(e)=>{
    if(!socket) return
    e.preventDefault(); // Prevent default form submission
    socket.emit('joinRoom',{room:roomId,username:email})
    navigate("/2");
  }

  const createRoom=(e)=>{
    if(!socket) return
    e.preventDefault(); // Prevent default form submission
    let r=uuidv4()
    console.log(r)
    socket.emit('joinRoom',{room:r,username:email})
    
  }



  
  return (
    <div className={styles.container}>
      <h1 className={`${styles.playwrite} ${styles.size1}`}>CODESPASE</h1>
      <br/>
      {formType === null && (
        <>
          <div className={styles.button} onClick={() => handleFormType("create")}>
            Create a Room
          </div>
          <div className={styles.button} onClick={() => handleFormType("join")}>
            Join a Room
          </div>
        </>
      )}
      {formType === "create" && (
        <>
          <form className={styles.form} onSubmit={createRoom}>
            <input
              className={styles.input}
              type="email"
              placeholder="Enter Your Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Capture email value
              required
            />
            <button className={styles.button} type="submit">
              Submit
            </button>
          </form>
          <button className={styles.button} onClick={resetFormType}>
            Back
          </button>
        </>
      )}
      {formType === "join" && (
        <>
          <form className={styles.form} onSubmit={joinRoom}>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter a Room ID"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)} // Capture Room ID value
              required
            />
            <input
              className={styles.input}
              type="email"
              placeholder="Enter Your Gmail"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Capture email value
              required
            />
            <button className={styles.button} type="submit">
              Submit
            </button>
          </form>
          <button className={styles.button} onClick={resetFormType}>
            Back
          </button>
        </>
      )}
    </div>
  );
};

export default RoomPage;
