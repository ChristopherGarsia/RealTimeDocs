import React, { useState } from 'react';
import PlainTextEditor from './PlainTextEditor';
import DocumentCreator from './DocumentCreator';
import LoginForm from './LoginForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [docCreated, setDocCreated] = useState(false);
  const [docId, setDocId] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />
      ) : docCreated ? (
        <div className="editor-container">
          <PlainTextEditor docId={docId} userId={userId} />
        </div>
      ) : (
        <div>
          <DocumentCreator 
            userId={userId} 
            docId={docId} 
            setDocId={setDocId} 
            docCreated={docCreated} 
            setDocCreated={setDocCreated} 
          />
        </div>
      )}
    </div>
  );
};

export default App;
