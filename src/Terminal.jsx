// Terminal.js
import { useContext, useEffect, useRef } from 'react';
import SocketContext from './Context/SocketContext';
import { Terminal as XTerminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import styles from './App.module.css';

function Terminal() {
  const socket=useContext(SocketContext)
  const Render = useRef(false);
  const ref1 = useRef();

  useEffect(() => {
    if (!socket) return;
    if (Render.current) return;
    Render.current = true;

    const term = new XTerminal({ rows: 15 });
    term.open(ref1.current);

    term.onData((data) => {
      if (data === '\x7f') {
        term.write('\b \b');
      } else {
        term.write(data);
      }

      if (data === '\r') {
        socket.emit('input', '\n');
      } else {
        socket.emit('input', data);
      }
    });

    socket.on('output', (data) => {
      term.write(data);
    });

    if (term) {
      socket.emit('input', '\n');
    }
  }, [socket]);

  return <div className={styles.bottom} ref={ref1} />;
}

export default Terminal;