import React, { useState } from 'react';

const DocumentCreator = (props) => {

  const createDocument = (props) => {
    console.log('creating doc for: ' + props.docId + ' ' + props.userId)
    fetch('http://localhost:3000/createDoc', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: props.userId,
        docId: props.docId,
      }),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error creating document:', error);
      });

    props.setDocCreated(true);
  };

  return (
    <div>
      <button
        onClick={() => createDocument(props)}
        disabled={!props.docId}
      >
        Create New Document
      </button>
      <input
        type="text"
        placeholder="Enter Name for Document"
        value={props.docId}
        onChange={(e) => props.setDocId(e.target.value)}
      />
    </div>
  );
};

export default DocumentCreator;