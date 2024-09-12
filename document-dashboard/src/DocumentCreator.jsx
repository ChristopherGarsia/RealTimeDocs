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
      .then((response) => {
        props.setDocId(currentDocId)
        props.setDocSpaceId(props.userId)
      })
      .catch((error) => {
        console.error('Error creating document:', error);
      });
  };

  return (
    <div className="document-creator-container">
      <input
        type="text"
        placeholder="Enter document name"
        value={currentDocId}
        onChange={(e) => setCurrentDocId(e.target.value)}
        className="doc-name-input"
      />
      <button
        onClick={() => createDocument(props)}
        disabled={!currentDocId}
        className="create-doc-button"
      >
        Create New Document
      </button>
    </div>
  );
};

export default DocumentCreator;