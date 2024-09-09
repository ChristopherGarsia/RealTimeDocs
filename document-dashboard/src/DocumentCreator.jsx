import React, {useState} from 'react'

const DocumentCreator = (props) => {

  const createDocument = () => {
    fetch('http://localhost:3000/createDoc', {
      method: 'POST',
    })
      .catch(error => {
        console.error('Error creating document:', error);
      });

    props.setDocCreated(true);
  };

  return (
    <button onClick={createDocument}>Create Document</button>
  );
}

export default DocumentCreator