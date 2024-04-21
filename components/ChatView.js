// components/ChatView.js
"use client";
"use strict";

import React, { useState, useEffect, useContext } from 'react';
import { IconamoonSend } from '../styles/Icons';
import styles from '../styles/ChatBox.module.scss';
import cn from 'classnames'
import { CalendarContext } from '../context/CalendarContext';
import { handleRequest } from '../nlp/ProcessEvents';

const ChatView = () => {
  const { user, events, setShowAddModal, setSelectedEvent, deleteEvent, setNewEventFromChat } = useContext(CalendarContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [ botResponse, setBotResponse ] = useState('');

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const userMessage = { text: newMessage, isUser: true };
      const response = await handleRequest( userMessage , events);
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      if (response) {
        setBotResponse(response.response);
        if (response.action === 'CREATE') {
          setNewEventFromChat(response.event);
          setShowAddModal(true);
        } else if (response.action === 'DELETE') {
          setSelectedEvent(response.event);
          if ( confirm(`Are you sure you want to delete event ${response.event.title} ?`) ) {
            deleteEvent(response.event);
          }
        } else if (response.action === 'UPDATE') {
          setSelectedEvent(response.event);
          setShowEditModal(true);
        }
      }
    }
  };

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].isUser) {
      setTimeout(() => {
        if (botResponse !== '') {
          setMessages([...messages, { text: botResponse, isUser: false }]);
          setBotResponse('');
        }
        setMessages([...messages, botResponse]);
      }, 1000); // Delayed response for simulation (1 second)
    }
  }, [messages, botResponse]);



  return (
    <div className='flex flex-col h-[60vh] w-[100%] p-1'>
      <div className="flex flex-col-reverse h-[100%] w-[100%]">
        <ol className={styles.list}>
          {messages.map((message, index) => (
            <li key={index} className={cn(styles.shared, message.isUser ? styles.user : styles.ai,)}>
              {message.text}
            </li>
          )
          )}
        </ol>
      </div>
      <div className="flex flex-row justify-between border-teal-500 border-solid border-1 border bg-white rounded-[15px] shadow p-2 w-[90%] mb-[25px]">
        <input
          className="w-[100%] border-none text-base focus:outline-none"
          type="text"
          placeholder="Talk to Donna..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <IconamoonSend onClick={handleSendMessage} />
      </div>
    </div>

  );
};

export default ChatView;