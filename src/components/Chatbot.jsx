import React, { useState, useRef, useEffect } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm Sathvik's personal AI assistant. I can answer questions about his education, experience, volunteering, or skills. What would you like to know?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userText = inputValue.trim();
    if (!userText) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, history: newMessages.slice(-10) })
      });

      setIsTyping(false);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 500 && errorData.error && errorData.error.includes("API key not configured")) {
          setMessages(prev => [...prev, { role: 'bot error', content: "Backend is ready! Waiting for the site owner to configure the GEMINI_API_KEY in Cloudflare Pages." }]);
        } else {
          const detailedError = errorData.error || `HTTP ${response.status} ${response.statusText}`;
          setMessages(prev => [...prev, { role: 'bot error', content: `Backend Error: ${detailedError}` }]);
        }
        return;
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);

    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot error', content: "Oops, something went wrong checking the connection. Please try again." }]);
      console.error("Chat API Error:", error);
    }
  };

  const formatMessage = (text) => {
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    return { __html: formattedText };
  };

  return (
    <div className="chat-widget-container">
      <div className={`chat-window ${isOpen ? 'fade-in' : 'hidden'}`}>
        <div className="chat-header">
          <div className="chat-title">
            <i className="fa-solid fa-robot"></i> Sathvik AI
          </div>
          <button className="chat-close-btn" aria-label="Close Chat" onClick={toggleChat}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`chat-message ${msg.role === 'bot error' ? 'error' : msg.role}`}
              dangerouslySetInnerHTML={formatMessage(msg.content)}
            ></div>
          ))}
          {isTyping && (
            <div className="chat-message bot typing-indicator">
              <span>.</span><span>.</span><span>.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input 
            type="text" 
            id="chat-input" 
            placeholder="Ask me anything..." 
            autoComplete="off" 
            required 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="chat-send-btn" aria-label="Send Message">
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
      <div className="chat-toggle-wrapper">
        <div className="chat-tooltip">Want to know more about me?</div>
        <button className="chat-toggle-btn" aria-label="Open Chat" onClick={toggleChat}>
          <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-message'}`}></i>
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
