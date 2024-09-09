import React, {useState} from 'react'
import PlainTextEditor from './PlaintextEditor'; 
import DocumentCreator from './DocumentCreator';

const App = () => {
  const [docCreated, setDocCreated] = useState(false)

  return (
    <div className="App">
      {
        docCreated?
        <div className="editor-container">
          <PlainTextEditor/>
        </div>
        :
        <div>
          <DocumentCreator docCreated={docCreated} setDocCreated={setDocCreated}/>
        </div>
      }
    </div>
  );
};

export default App;
