// CodeEditor.js
import { useCallback, useContext, useEffect, useState } from 'react';
import styles from './App.module.css';
import SocketContext from './Context/SocketContext'
function CodeEditor() {
  const socket=useContext(SocketContext)
  const [fileName,setFileName]=useState('p.py')
  const [filee,setFile]=useState('')
  function d(n){
    setFile(n)
  }


  
  useEffect(() => {
    // Listen for events
    const fileListener = (data) => {
      d(data);
    };
  
    const codeListener = ({ data, id, file }) => {
      if(file==fileName){
        if (id !== socket.id) {
          console.log(data);
          d(data);
        }
      }
      
    };
  
    socket.on("file", fileListener);
    socket.on("code", codeListener);
  
    // Cleanup function
    return () => {
      socket.off("file", fileListener);
      socket.off("code", codeListener);
    };
  }, [socket, fileName]);



  const getfile=useCallback(()=>{
    if(!socket) return
    socket.emit('getcode',fileName)
  })
  const update=useCallback((f)=>{
    if(!socket) return

    socket.emit('write',{data:f,file:fileName})
  })
  console.log(fileName)
  return (
    <div className={styles.top}>
      <form onSubmit={(e)=>{
        e.preventDefault()
        getfile()}}>
        <input
          type="text"
          className={styles.fileNameInput}
          placeholder="Enter file name"
          value={fileName}
          onChange={(e)=>{
            setFileName(e.target.value)
          }}
        />
      </form>
      
      <textarea className={styles.codeEditor} placeholder=
      "Write your code here" value={filee} onChange={(e)=>{
        setFile(e.target.value)
        update(e.target.value)
      }}/>
    </div>
  );
}

export default CodeEditor;