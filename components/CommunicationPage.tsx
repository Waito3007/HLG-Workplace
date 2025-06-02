
import React, { useState, useRef, useEffect } from 'react';
import { SAMPLE_CHAT_MESSAGES, PaperAirplaneIcon, USER_AVATAR_URL } from '../constants';
import type { ChatMessage } from '../types';

const ChatChannels: React.FC<{ onSelectChannel: (channel: string) => void; activeChannel: string }> = ({ onSelectChannel, activeChannel }) => {
  const channels = ['#general', '#project_green_chai', '#sales_team', '#announcements', 'Alice Smith', 'Bob Johnson'];
  return (
    <div className="w-1/4 bg-slate-50 border-r border-slate-200 p-4">
      <h2 className="text-lg font-semibold text-slate-700 mb-4">Channels & DMs</h2>
      <input type="text" placeholder="Search channels..." className="w-full p-2 border border-slate-300 rounded-md mb-4 text-sm"/>
      <ul className="space-y-1">
        {channels.map(channel => (
          <li key={channel}>
            <button
              onClick={() => onSelectChannel(channel)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-slate-200 transition-colors ${activeChannel === channel ? 'bg-accent text-white font-semibold' : 'text-slate-600'}`}
            >
              {channel.startsWith('#') ? channel : `🧑 ${channel}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChatWindow: React.FC<{ messages: ChatMessage[]; activeChannel: string }> = ({ messages, activeChannel }) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-white">
        <h3 className="text-xl font-semibold text-slate-800">{activeChannel}</h3>
        {/* Add channel members or topic here */}
      </div>
      <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-slate-50">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.sender === 'You' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <img src={msg.sender === 'You' ? USER_AVATAR_URL : `https://picsum.photos/seed/${msg.sender}/40/40`} alt={msg.sender} className="w-8 h-8 rounded-full" />
              <div className={`px-4 py-2 rounded-lg ${msg.sender === 'You' ? 'bg-accent text-white' : 'bg-white shadow-sm border border-slate-200 text-slate-700'}`}>
                <p className="text-sm">{msg.text}</p>
                 <p className={`text-xs mt-1 ${msg.sender === 'You' ? 'text-blue-200' : 'text-slate-400'}`}>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};


const MessageInput: React.FC<{ onSendMessage: (text: string) => void }> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 bg-white flex items-center space-x-3">
      {/* Placeholder buttons for attach file / create meeting */}
      <button type="button" className="p-2 text-slate-500 hover:text-accent">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.122 2.122l7.81-7.81" /></svg>
      </button>
       <button type="button" className="p-2 text-slate-500 hover:text-accent">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008z" /></svg>
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm"
      />
      <button type="submit" className="bg-accent text-white p-3 rounded-lg hover:bg-blue-700 transition-colors">
        <PaperAirplaneIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

const CommunicationPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(SAMPLE_CHAT_MESSAGES);
  const [activeChannel, setActiveChannel] = useState<string>('#general');

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: String(Date.now()),
      sender: 'You',
      text,
      timestamp: new Date(),
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    // Simulate bot response for demo if needed
    if(activeChannel.startsWith('#') && text.toLowerCase().includes("hello")) {
      setTimeout(() => {
        const botResponse: ChatMessage = {
          id: String(Date.now() + 1),
          sender: 'BotInChannel',
          text: "Hello there!",
          timestamp: new Date(),
        };
        setMessages(prevMessages => [...prevMessages, botResponse]);
      }, 1000);
    }
  };
  
  const handleSelectChannel = (channel: string) => {
    setActiveChannel(channel);
    // Here you would typically fetch messages for the selected channel
    // For demo, we'll just reset to sample messages or keep current ones
    setMessages(SAMPLE_CHAT_MESSAGES.filter(m => Math.random() > 0.3)); // Randomize for effect
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <h1 className="text-2xl font-semibold text-slate-800 p-4 border-b border-slate-200 bg-white sr-only">Internal Communication</h1>
      <div className="flex flex-1 overflow-hidden">
        <ChatChannels onSelectChannel={handleSelectChannel} activeChannel={activeChannel} />
        <div className="flex-1 flex flex-col bg-white">
           <ChatWindow messages={messages} activeChannel={activeChannel} />
           <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
