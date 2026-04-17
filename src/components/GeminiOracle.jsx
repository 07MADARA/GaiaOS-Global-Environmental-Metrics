import React, { useState, useEffect, useRef } from 'react';
import { Send, Zap, Lock, RefreshCw, AlertTriangle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function GeminiOracle({ isAuthenticated }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Connection established to Gemini 1.5 Pro via authenticated Agent channel. I have access to live planetary parameters. What sustainability metrics would you like me to analyze?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [errorDetails, setErrorDetails] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, errorDetails]);

  const handleSend = async () => {
    if (!input.trim() || !isAuthenticated) return;
    
    const userPrompt = input;
    setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);
    setInput('');
    setIsTyping(true);
    setErrorDetails('');

    try {
      if (!API_KEY) throw new Error("VITE_GEMINI_API_KEY missing from environment variables.");
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      
      // Injecting a system prompt context so it acts like GaiaOS
      const prompt = `You are the core intelligence of GaiaOS, an Earth Data and Sustainability Engine. Speak concisely, professionally, and creatively about environmental topics. Address this query: ${userPrompt}`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (err) {
      console.error("Gemini Error:", err);
      setErrorDetails(err.message || 'Unknown error occurred while contacting the oracle.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!isAuthenticated) {
    return (
      <div className="glass-panel flex-center" style={{ height: '100%', flexDirection: 'column', gap: '24px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Lock size={40} color="var(--accent-alert)" />
        </div>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <h2 style={{ marginBottom: '8px' }}>Oracle Access Restricted</h2>
          <p style={{ color: 'var(--text-muted)' }}>This agent utilizes highly sensitive global models and requires secure Auth0 authentication before accepting queries.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="glass-panel" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            padding: '16px 20px',
            borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
            background: msg.role === 'user' ? 'linear-gradient(135deg, var(--accent-blue), #2563eb)' : 'rgba(255,255,255,0.05)',
            border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.1)' : 'none',
            display: 'flex',
            gap: '12px'
          }}>
            {msg.role === 'assistant' && <Zap size={20} color="var(--accent-green)" style={{ flexShrink: 0, marginTop: '2px' }} />}
            <span style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>{msg.content}</span>
          </div>
        ))}
        
        {isTyping && (
           <div style={{ 
            alignSelf: 'flex-start',
            padding: '16px 20px',
            borderRadius: '20px 20px 20px 4px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}>
            <RefreshCw size={16} color="var(--accent-green)" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Gemini is synthesizing planetary data...</span>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {errorDetails && (
          <div style={{ 
            alignSelf: 'center',
            padding: '12px 16px',
            borderRadius: '8px',
            background: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            gap: '12px',
            alignItems: 'flex-start',
            color: 'var(--accent-alert)',
            fontSize: '0.9rem',
            width: '100%',
            maxWidth: '600px'
          }}>
            <AlertTriangle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ display: 'block', marginBottom: '4px' }}>AI Agent Error</strong>
              {errorDetails}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="glass-panel" style={{ display: 'flex', gap: '12px', padding: '16px' }}>
        <input 
          type="text" 
          className="input-field" 
          placeholder="Query the live Gemini core..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
        />
        <button className="btn btn-primary" onClick={handleSend} disabled={isTyping} style={{ padding: '0 24px', opacity: isTyping ? 0.7 : 1 }}>
          {isTyping ? <RefreshCw size={18} style={{ animation: 'spin 1s linear infinite' }} /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
}
