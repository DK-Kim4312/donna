// components/ChatView.js
"use client";
import React, { useState, useEffect } from 'react';
import { IconamoonSend } from '../styles/Icons';
import styles from '../styles/ChatBox.module.scss';
import cn from 'classnames'

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
    <div className='flex flex-col h-[100%] w-[100%] p-1'>
      <div className="flex flex-col-reverse items-end justify-end overflow-y-auto p-7 h-[100%] w-[100%]">
        <ol className={styles.list}>
          {messages.map((message, index) => (
            <li key={index} className={cn(styles.shared, message.isUser ? styles.user : styles.ai,)}>
              {message.text}
            </li>
          )
          )}
        </ol>

      </div>
      <div className="flex flex-row justify-between border-teal-500 border-solid border-1 border rounded-lg bg-white p-2 w-[100%] shadow-lg">
        <input
          className="w-[100%] border-none text-base focus:outline-none"
          type="text"
          placeholder="Ask Donna..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <IconamoonSend onClick={handleSendMessage} />
      </div>
    </div>

  );
};

export default ChatView;