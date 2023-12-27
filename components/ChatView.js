// components/ChatView.js
"use client";
import React, { useState, useEffect } from 'react';
import styles from '../styles/Chat.module.css';
import { IconamoonSend } from '../styles/Icons';
import chatstyles from '../styles/ChatBox.module.css';

const ChatView = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      const userMessage = { text: newMessage, isUser: true };
      setMessages([...messages, userMessage]);
      setNewMessage('');
    }
  };

  // function to return a random message after user sends a message
  const getBotMessage = () => {
    const botMessages = [
      'Hello, how are you?',
      'How are you doing?',
      'How can I help you today?',
      'I am here to help you',
      'I am a bot'
    ];
    return botMessages[Math.floor(Math.random() * botMessages.length)];
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      setTimeout(() => {
        const botResponse = { text: getBotMessage(), isUser: false };
        setMessages([...messages, botResponse]);
      }, 1000); // Delayed response for simulation (1 second)
    }
  }, [messages]);



  return (
    <div className={styles.chatview}>
      <div className={styles.inputcontainer}>
        <input
          className={styles.inputtext}
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        {/* keep codiconsend on the left of inputcontainer*/}


          <IconamoonSend onClick={handleSendMessage} />


      </div>
      <div className={styles.messages}>
        {messages.slice().reverse().map((message, index) => (
          <p
            key={index}
            className={message.isUser ? styles.usermessage : styles.botmessage}
            style={{ textAlign: message.isUser ? 'right' : 'left' }}
          >
            {message.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ChatView;