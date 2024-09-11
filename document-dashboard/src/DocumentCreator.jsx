import React, { useState } from 'react';

const DocumentCreator = (props) => {

  const[currentDocId, setCurrentDocId] = useState('');

  const createDocument = (props) => {
    fetch('http://localhost:3000/documents/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.userId,
        docId: currentDocId,
      }),
    })
      .then((response) => props.setDocId(currentDocId))
      .catch((error) => {
        console.error('Error creating document:', error);
      });
  };

  return (
    <div>
      <button
        onClick={() => createDocument(props)}
        disabled={!currentDocId}
      >
        Create New Document
      </button>
      <input
        type="text"
        placeholder="Enter Name for Document"
        value={currentDocId}
        onChange={(e) => setCurrentDocId(e.target.value)}
      />
    </div>
  );
};

export default DocumentCreator;