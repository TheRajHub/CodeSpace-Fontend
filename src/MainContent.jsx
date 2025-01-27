// MainContent.js
import styles from './App.module.css';
import CodeEditor from './CodeEditor';
import Terminal from './Terminal';

function MainContent() {
  return (
    <div className={styles.mainContent}>
      <CodeEditor/>
      <Terminal/>
    </div>
  );
}

export default MainContent;