import React, { useEffect, useState, useRef } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import ShareDB from 'sharedb/lib/client';
import StringBinding from 'sharedb-string-binding';

const PlainTextEditor = (props) => {
  const [currDoc, setCurrDoc] = useState(null);
  const textareaRef = useRef(null);

  useEffect(() => {    
    var socket = new ReconnectingWebSocket('ws://localhost:3000', [], {
  // ShareDB handles dropped messages, and buffering them while the socket
  // is closed has undefined behavior
  maxEnqueuedMessages: 0
})
    const element = textareaRef.current;

    var connection = new ShareDB.Connection(socket)
    const doc = connection.get(props.userId, props.docId)
    setCurrDoc(doc)

    doc.subscribe((error) => {
      if (error) return console.error(error)

      var binding = new StringBinding(element, doc, ['content']);
      binding.setup();
    });

    // Cleanup WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <textarea ref={textareaRef} style={{ width: '100%', height: '300px' }} />
    </div>
  );
};

export default PlainTextEditor;