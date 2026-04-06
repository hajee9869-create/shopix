import React, { useState } from 'react';
import { Bot, X, Send, Minus, Maximize2, Sparkles } from 'lucide-react';
import './SellerAIAgent.css';

const SellerAIAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'assistant', content: "Hello! I'm your SHOPIX Seller Assistant. How can I help you manage your store today?" }
  ]);

  const quickActions = [
    "Draft product description",
    "Help with customer reply",
    "Analyze this week's sales",
    "Suggest price optimization"
  ];

  const handleSend = (e) => {
    e?.preventDefault();
    if (!message.trim()) return;

    const newChat = [...chat, { role: 'user', content: message }];
    setChat(newChat);
    setMessage('');

    // Simulated AI Response
    setTimeout(() => {
      setChat([...newChat, { 
        role: 'assistant', 
        content: `I've analyzed your request about "${message}". I'm processing the data from your store to provide the best recommendation. Would you like me to generate a draft or show you the raw analytics?` 
      }]);
    }, 1000);
  };

  if (!isOpen) {
    return (
      <button className="ai-fab shadow-lg" onClick={() => setIsOpen(true)}>
        <Bot size={24} />
        <span className="fab-label">Seller AI</span>
      </button>
    );
  }

  return (
    <div className={`ai-chat-window glass shadow-2xl ${isMinimized ? 'minimized' : ''}`}>
      <div className="chat-header">
        <div className="flex items-center gap-2">
          <div className="ai-status-dot"></div>
          <Bot size={18} />
          <span className="font-bold text-sm">Seller Assistant</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsMinimized(!isMinimized)} className="btn-icon-sm">
            {isMinimized ? <Maximize2 size={14} /> : <Minus size={14} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="btn-icon-sm text-danger">
            <X size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="chat-messages">
            {chat.map((msg, i) => (
              <div key={i} className={`message-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}
          </div>

          <div className="quick-actions">
            {quickActions.map(action => (
              <button key={action} className="action-chip" onClick={() => setMessage(action)}>
                <Sparkles size={10} /> {action}
              </button>
            ))}
          </div>

          <form className="chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask anything..." 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="send-btn">
              <Send size={16} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SellerAIAgent;
