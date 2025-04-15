import React, { useState, useEffect } from 'react';
import { Message, personalInfo } from './lib/data';
import { generateResponse } from './lib/openrouter';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { QuickQuestions } from './components/QuickQuestions';
import { Moon, Sun, Mail } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Add welcome message
    setMessages([
      {
        id: '0',
        content: `Hi there! I'm Benjamin's virtual assistant. I was built using React, TypeScript, and Gemini 2.5. Feel free to check out my source code on Benjamin's github! How can I help you today?`,
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      console.log('Sending message to AI...');
      const botResponse = await generateResponse(content);
      console.log('Received response:', botResponse);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error in App component:', error);
      
      // More descriptive error message
      let errorContent = 'I apologize, but I\'m having trouble connecting to the service. Please try again later.';
      
      if (error instanceof Error) {
        if (error.message.includes('API') || error.message.includes('key') || error.message.includes('authentication')) {
          errorContent = 'There seems to be an authentication issue. Please try again later or contact Benjamin directly.';
        } else if (error.message.includes('network') || error.message.includes('connection')) {
          errorContent = 'Network connection issue. Please check your internet connection and try again.';
        }
      }
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: errorContent,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([{
      id: '0',
      content: `Hi there! I'm Benjamin's virtual assistant. I was built using React, TypeScript, and Gemini 2.5. Feel free to check out my source code on Benjamin's github! How can I help you today?`,
      sender: 'bot',
      timestamp: new Date(),
    }]);
  };

  const suggestedQuestions = [
    "What are Benjamin's technical skills?",
    "How can I contact Benjamin?",
    "What experience does Benjamin have?",
    "Tell me about Benjamin's projects",
    "What is Benjamin's education?",
    "What are Benjamin's interests?"
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="max-w-3xl mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className={`p-4 flex items-center justify-between border-b ${
          darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden shadow-none border-0">
              <img 
                src="/benjamin.svg" 
                alt="Benjamin Namo" 
                className="w-full h-full object-cover"
                style={{ border: 'none' }}
              />
            </div>
            <div>
              <h1 className="text-xl font-bold">{personalInfo.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">{personalInfo.title}</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <a 
              href={personalInfo.contact.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="GitHub"
            >
              <img 
                src="/github.svg" 
                alt="GitHub" 
                className={`w-5 h-5 ${darkMode ? 'brightness-100 invert' : 'brightness-0'}`}
              />
            </a>
            <a 
              href={personalInfo.contact.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="LinkedIn"
            >
              <img 
                src="/linkedin.svg" 
                alt="LinkedIn" 
                className={`w-5 h-5 ${darkMode ? 'brightness-100 invert' : 'brightness-0'}`}
              />
            </a>
            <a 
              href={`mailto:${personalInfo.contact.email}`} 
              className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              title="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={clearHistory}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className={`flex-1 overflow-y-auto p-4 ${
          darkMode 
            ? 'bg-gray-800 dark-scrollbar' 
            : 'bg-white light-scrollbar'
        }`}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} darkMode={darkMode} />
          ))}
          {loading && (
            <div className="p-4 flex items-center gap-2">
              <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full" />
              <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full delay-100" />
              <div className="animate-bounce w-2 h-2 bg-gray-400 rounded-full delay-200" />
            </div>
          )}
        </div>

        {/* Quick questions */}
        <div className={`p-3 overflow-x-auto ${
          darkMode 
            ? 'bg-gray-800 border-t border-gray-700 dark-scrollbar' 
            : 'bg-white border-t border-gray-200 light-scrollbar'
        }`}>
          <div className="flex gap-2">
            {suggestedQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => handleSendMessage(question)}
                disabled={loading}
                className={`whitespace-nowrap px-4 py-2 text-sm rounded-full transition-colors ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                }`}
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat input */}
        <ChatInput onSend={handleSendMessage} disabled={loading} darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;