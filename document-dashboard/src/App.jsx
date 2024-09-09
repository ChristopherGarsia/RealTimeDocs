import React, {useState} from 'react'
import PlainTextEditor from './PlaintextEditor'; 
import DocumentCreator from './DocumentCreator';

const App = () => {
  const [docCreated, setDocCreated] = useState(false)
  const [docId, setDocId] = useState('')
  const [userId, setUserId] = useState('user')

  return (
    <div className="App">
      {
        docCreated?
        <div className="editor-container">
          <PlainTextEditor docId={docId} userId={userId}/>
        </div>
        :
        <div>
          <DocumentCreator userId={userId} docId={docId} setDocId={setDocId} docCreated={docCreated} setDocCreated={setDocCreated}/>
        </div>
      }
    </div>
  );
};

export default App;
