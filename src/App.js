import React, { useState, useEffect } from "react";
import './App.css';
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
    <div className="App-header">
      <div>
        <h1>Gearbox Model</h1>
        <h2>Comments:</h2>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
      <div className="comment-wrapper">
        <div>
          <textarea rows="6" cols="50" value={comment} onChange={onCommentChange}></textarea>
        </div>
        <div>
          <button onClick={submitComment}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;