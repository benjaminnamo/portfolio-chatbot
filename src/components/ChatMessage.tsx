import React from 'react';
import { Message } from '../lib/data';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  darkMode: boolean;
}

export function ChatMessage({ message, darkMode }: ChatMessageProps) {
  const isBot = message.sender === 'bot';
  
  return (
    <div className={`flex gap-3 ${isBot ? (darkMode ? 'bg-gray-700/50' : 'bg-gray-50') : ''} p-4 mb-2 rounded-lg`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        isBot ? 'bg-blue-600' : (darkMode ? 'bg-gray-600' : 'bg-gray-200')
      }`}>
        {isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
        )}
      </div>
      <div className="flex-1">
        <div className={`text-sm ${
          darkMode 
            ? (isBot ? 'text-white' : 'text-gray-300')
            : (isBot ? 'text-gray-800' : 'text-gray-600')
        } whitespace-pre-wrap`} style={{ fontFamily: 'sans-serif' }}>
          {message.content}
        </div>
        <span className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1 block`}>
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
}