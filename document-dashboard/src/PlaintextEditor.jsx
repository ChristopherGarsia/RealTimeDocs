import React, { useEffect, useState, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import ShareDB from 'sharedb/lib/client';
import StringBinding from 'sharedb-string-binding';

const PlainTextEditor = (props) => {
  const textareaRef = useRef(null);
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [shareUsername, setShareUsername] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', { method: 'GET'});
      const data = await response.json();
      if (data.success) {
        setUsers(data.usernames);
        console.log(data.usernames)
      } else {
        console.error('Error fetching users:', data.message);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (props.docId && props.docSpaceId) {
      var socket = new ReconnectingWebSocket('ws://localhost:3000', [], {
        // ShareDB handles dropped messages, and buffering them while the socket
        // is closed has undefined behavior
        maxEnqueuedMessages: 0
      })
      const element = textareaRef.current;

      var connection = new ShareDB.Connection(socket)
      const doc = connection.get(props.docSpaceId, props.docId)

      doc.subscribe((error) => {
        if (error) return console.error(error)

        var binding = new StringBinding(element, doc, ['content']);
        binding.setup();
      });

      // Cleanup WebSocket connection on component unmount
      return () => {
        socket.close();
      };
    }
  }, [props.docSpaceId, props.docId]);

  const handleShare = async () => {
    try {
      const response = await fetch('http://localhost:3000/documents/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          docId: props.docId,
          docSpaceId: props.docSpaceId,
          targetUsername: shareUsername
        })
      });

      const data = await response.json();
      if (data.success) {
        setShareMessage('Document shared successfully!');
      } else {
        setShareMessage('Error sharing the document: ' + data.message);
      }
    } catch (error) {
      setShareMessage('Error sharing the document: ' + error.message);
    }
  };

  return (
    <div className="editor-wrapper">
      <button onClick={() => setShowSharePopup(true)}>Share</button>

      {showSharePopup && (
        <>
          <div className="overlay" onClick={() => setShowSharePopup(false)}></div>
          <div className="share-popup">
            <div className="share-content">
              <h3>Share Document</h3>
              <select
                className="documents-container"
                value={shareUsername}
                onChange={(e) => setShareUsername(e.target.value)}
                onClick={fetchUsers}
              >
                <option value="">Select a User</option>
                {users.map((username) => (
                  <option key={username} value={username}>
                    {username}
                  </option>
                ))}
              </select>
              <button onClick={handleShare} className="auth-button">Share</button>
              <button className="auth-button close-btn" onClick={() => setShowSharePopup(false)}>Close</button>
              {shareMessage && <p>{shareMessage}</p>}
            </div>
          </div>
        </>
      )}

      <textarea ref={textareaRef} style={{ width: '100%', height: '300px', marginTop: '10px' }} />
      <button className="auth-back-button" onClick={() => {
        props.setDocId(null);
        props.setDocSpaceId(null);
      }}>Back</button>
    </div>
  );
};


export default PlainTextEditor;