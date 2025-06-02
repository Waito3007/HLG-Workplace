
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SAMPLE_TRAINING_COURSES, SAMPLE_FAQ, PaperAirplaneIcon, BOT_AVATAR_URL, USER_AVATAR_URL, ArrowPathIcon } from '../constants';
import type { TrainingCourse, FaqItem, ChatMessage } from '../types';
import { callGeminiApi } from '../services/geminiService'; // Assuming geminiService exports this

const CourseCard: React.FC<{ course: TrainingCourse }> = ({ course }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
    <img src={course.imageUrl || 'https://picsum.photos/300/200'} alt={course.title} className="w-full h-40 object-cover"/>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-slate-800">{course.title}</h3>
      <p className="text-sm text-slate-600 mt-1 h-16 overflow-hidden">{course.description}</p>
      <p className="text-xs text-slate-500 mt-2">Duration: {course.duration}</p>
      <button className="mt-3 w-full bg-accent text-white py-2 rounded-md text-sm hover:bg-blue-700 transition-colors">Start Course</button>
    </div>
  </div>
);

const FaqAccordionItem: React.FC<{ item: FaqItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left p-4 hover:bg-slate-50 transition-colors"
      >
        <span className="font-medium text-slate-700">{item.question}</span>
        <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-slate-500"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </span>
      </button>
      {isOpen && (
        <div className="p-4 bg-slate-50 text-slate-600 text-sm">
          {item.answer}
        </div>
      )}
    </div>
  );
};

const SupportChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | null>(null); // To store chat session ID from Gemini service
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);
  
  const initializeChat = useCallback(async () => {
    setIsLoading(true);
    try {
      // This call to initialize might not be needed if geminiService directly uses chat.sendMessage
      // Or, if it is needed, geminiService should handle it.
      // For now, we'll assume direct sendMessage usage.
      // const newChatId = await initChatSession(); // Hypothetical if needed
      // setChatId(newChatId); 
      setMessages([{ id: '0', sender: 'bot', text: "Hello! I'm HLG's support assistant. How can I help you today?", timestamp: new Date(), avatar: BOT_AVATAR_URL }]);
    } catch (error) {
      console.error("Error initializing chat:", error);
      setMessages([{ id: 'err', sender: 'bot', text: "Sorry, I'm having trouble connecting right now.", timestamp: new Date(), avatar: BOT_AVATAR_URL }]);
    } finally {
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  useEffect(() => {
    initializeChat();
  }, [initializeChat]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: input,
      timestamp: new Date(),
      avatar: USER_AVATAR_URL,
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const botResponseText = await callGeminiApi(input, chatId ?? undefined); // Pass chatId if available
      const botMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date(),
        avatar: BOT_AVATAR_URL,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting response from Gemini:", error);
      const errorMessage: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'bot',
        text: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        avatar: BOT_AVATAR_URL,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex flex-col h-[500px] max-h-[70vh]">
      <div className="p-4 border-b border-slate-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-slate-700">Support Chatbot</h3>
        <button onClick={initializeChat} disabled={isLoading} className="p-1 text-slate-500 hover:text-accent disabled:text-slate-300">
          <ArrowPathIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <div className="flex-grow p-4 space-y-3 overflow-y-auto">
        {messages.map(msg => (
          <div key={msg.id} className={`flex items-end space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && <img src={msg.avatar} alt="Bot" className="w-8 h-8 rounded-full self-start" />}
            <div className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-accent text-white' : 'bg-slate-100 text-slate-800'}`}>
              {msg.text}
            </div>
             {msg.sender === 'user' && <img src={msg.avatar} alt="User" className="w-8 h-8 rounded-full self-start" />}
          </div>
        ))}
        {isLoading && messages.length > 0 && messages[messages.length - 1].sender === 'user' && (
          <div className="flex items-end space-x-2 justify-start">
            <img src={BOT_AVATAR_URL} alt="Bot" className="w-8 h-8 rounded-full self-start" />
            <div className="max-w-[70%] px-3 py-2 rounded-lg text-sm bg-slate-100 text-slate-800">
              <span className="italic">Bot is typing...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading && messages.length === 0} // Disable if initial load fails
          className="flex-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent outline-none text-sm"
        />
        <button type="submit" disabled={isLoading} className="bg-accent text-white p-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-300">
          <PaperAirplaneIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};


const TrainingSupportPage: React.FC = () => {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-800 mb-2">Training Courses</h1>
        <p className="text-slate-600 mb-6">Enhance your skills with our curated list of training modules.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_TRAINING_COURSES.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {SAMPLE_FAQ.map(item => (
              <FaqAccordionItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Need Help? Ask our Chatbot!</h2>
           <SupportChatbot />
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-slate-700 mb-3">Submit a Support Ticket</h2>
        <p className="text-sm text-slate-600 mb-4">If the chatbot can't help or you have a complex issue, please submit a ticket to our IT department.</p>
        <button className="bg-hlg-blue text-white px-5 py-2.5 rounded-lg hover:bg-opacity-90 transition-colors">
          Create Support Ticket
        </button>
      </div>

    </div>
  );
};

export default TrainingSupportPage;
