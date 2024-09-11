import React, { useEffect, useState } from 'react';

const Documents = (props) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [selectedDocSpaceId, setSelectedDocSpaceId] = useState('');

  // Fetch documents when the component mounts
  useEffect(() => {
    const fetchAccessibleDocs = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/documents/${props.userId}`);
        const data = await response.json();
        if (data.success) {
          setDocuments(data.documents); // Set the documents fetched from API
        } else {
          console.error('Error fetching documents:', data.message);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchAccessibleDocs();
  }, [props.userId]);

  // Handle document selection from the dropdown
  const handleDocSelection = (e) => {
    const [docId, docSpaceId] = e.target.value.split('|'); // Assuming a value format like "docId|docSpaceId"
    setSelectedDocId(docId);
    setSelectedDocSpaceId(docSpaceId);
    props.setDocId(docId); // Set the selected document ID in the parent component
    props.setDocSpaceId(docSpaceId); // Set the selected document space ID in the parent component
  };

  return (
    <div className="documents-container">
      <select id="documents" onChange={handleDocSelection} value={`${selectedDocId}|${selectedDocSpaceId}`}>
        <option value="">Select a Document</option>
        {Object.keys(documents).map((docId) => (
          <option key={docId} value={`${docId}|${documents[docId]}`}>
            {`${docId}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Documents;