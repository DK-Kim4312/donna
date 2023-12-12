// components/ChatView.js
"use client";
import React, { useState } from 'react';
import styles from '../styles/Chat.module.css';

const ChatView = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div className={styles.chatview}>
      <div className={styles.messages}>
        {messages.map((message, index) => (
          <div key={index} className={styles.message}>
            {message.text}
          </div>
        ))}
      </div>
      <div className={styles.inputcontainer}>
        <input
          className={styles.inputtext}
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className = {styles.sendMessageButton} onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatView;