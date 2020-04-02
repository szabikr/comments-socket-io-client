import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const endpoint = 'http://127.0.0.1:4001';

console.log('connecting to web socket');
const socket = socketIOClient(endpoint);

function App() {

  const [ comment, setComment ] = useState('');
  const [ comments, setComments ] = useState([]);
  
  useEffect(() => {
    socket.on('loadComments', initialComments => setComments(initialComments));
    socket.on('receiveComment', receivedComment => {
      addComment(receivedComment);
    });
  });

  const addComment = (aComment) => {
    setComments([...comments, aComment])
  };

  const onCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = () => {
    socket.emit('submitComment', comment);
    addComment(comment);
    setComment('');
  };

  return(
    <div>
      <div>
        Comments:
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <div>
        <input type="text" value={comment} onChange={onCommentChange}></input>
        <button onClick={submitComment}>Submit</button>
      </div>
    </div>
  );
}

export default App;