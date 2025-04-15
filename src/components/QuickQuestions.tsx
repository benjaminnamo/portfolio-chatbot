import React from 'react';
import { Car } from 'lucide-react';

interface QuickQuestionProps {
  onSelect: (question: string) => void;
  darkMode: boolean;
}

export function QuickQuestions({ onSelect, darkMode }: QuickQuestionProps) {
  const questions = [
    { icon: <Car className="w-4 h-4" />, text: 'View available cars' },
    { icon: <Car className="w-4 h-4" />, text: 'Rental policies' },
    { icon: <Car className="w-4 h-4" />, text: 'Get a quote' },
  ];

  return (
    <div className="flex gap-2 p-4 overflow-x-auto">
      {questions.map((q) => (
        <button
          key={q.text}
          onClick={() => onSelect(q.text)}
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-full whitespace-nowrap ${
            darkMode
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
          }`}
        >
          {q.icon}
          {q.text}
        </button>
      ))}
    </div>
  );
}