import React, { useState } from 'react';
import PlainTextEditor from './PlainTextEditor';
import DocumentCreator from './DocumentCreator';
import Documents from './Documents';
import LoginForm from './LoginForm';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [docId, setDocId] = useState(null);
  const [docSpaceId, setDocSpaceId] = useState(null);
  const [userId, setUserId] = useState('');

  return (
    <div className="App">
      {!isLoggedIn ? (
        <LoginForm setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />
      ) : docId ? (
        <div className="editor-container">
          <PlainTextEditor docId={docId} docSpaceId={docSpaceId} setDocId={setDocId} setDocSpaceId={setDocSpaceId} />
        </div>
      ) : (
        <div>
          <Documents userId={userId} setDocId={setDocId} setDocSpaceId={setDocSpaceId} />
          <DocumentCreator 
            userId={userId} 
            docId={docId} 
            setDocId={setDocId} 
          />
        </div>
      )}
    </div>
  );
};

export default App;
