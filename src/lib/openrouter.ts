import OpenAI from 'openai';
import { personalInfo } from './data';

// API Configuration
// Use environment variables with fallbacks for development
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || 
  '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';

// Use a reliable model with fallback options
const MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'google/gemini-pro:latest';

// Fallback to Anthropic or OpenAI models if needed
const FALLBACK_MODELS = [
  'anthropic/claude-3-haiku:latest',
  'openai/gpt-3.5-turbo:latest'
];

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function generateResponse(userMessage: string) {
  const systemPrompt = `You are Benjamin Namo's personal assistant chatbot. Answer questions about Benjamin's background, skills, experience, education, projects, and interests based on the data provided.

IMPORTANT: You MUST NOT use ANY formatting in your responses - no asterisks (*), no bullet points, no markdown, no bold or italics, and no special characters for formatting. Your responses must be plain text only.

Keep your responses extremely concise (2-3 sentences maximum). Be direct and to the point. Prioritize the most relevant information only. For work experience, mention only company names, positions, and 1-2 key achievements total. For skills, mention only the most relevant categories. For education, just the degree and institution.

Example response style:
"Benjamin worked at Special Olympics Ontario as an IT Consultant and at CAMH as a Research Assistant. He has experience with JavaScript, Python, React, and AI technologies like PyTorch and TensorFlow."

When listing projects or multiple items, use commas or simple sentences. Never use bullet points, numbers, or any special formatting.

Example for projects:
"Benjamin has worked on several projects including a Crypto Trading Bot using Web3.py, a Soccer Analytics System using OpenCV, and an E-commerce Platform with React and Node.js."

Here's Benjamin Namo's information:
${JSON.stringify(personalInfo, null, 2)}`;

  // Try primary model first, then fallbacks if needed
  let currentModelIndex = -1;
  let attemptCount = 0;
  const maxAttempts = FALLBACK_MODELS.length + 1;

  while (attemptCount < maxAttempts) {
    attemptCount++;
    currentModelIndex++;
    
    // Select model to try
    const currentModel = currentModelIndex === 0 ? MODEL : FALLBACK_MODELS[currentModelIndex - 1];
    
    try {
      console.log(`Attempt ${attemptCount}/${maxAttempts}: Using model ${currentModel}`);
      
      const extraHeaders = {
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Benjamin Namo Portfolio',
      };

      console.log('Sending request to OpenRouter API...');

      const completion = await client.chat.completions.create({
        model: currentModel,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }, {
        headers: extraHeaders,
      });

      console.log('API Response:', completion);

      // Response validation
      if (!completion?.choices?.length) {
        throw new Error('No choices in API response');
      }

      const message = completion.choices[0]?.message;
      if (!message?.content) {
        throw new Error('No message content in API response');
      }

      return message.content;
    } catch (error) {
      console.error(`Error with model ${currentModel}:`, error);
      
      // Enhanced error logging
      if (error instanceof Error) {
        console.error('Error details:', error.message);
        
        // If we have more models to try, continue the loop
        if (currentModelIndex < FALLBACK_MODELS.length) {
          console.log(`Trying fallback model ${FALLBACK_MODELS[currentModelIndex]}`);
          continue;
        }
        
        // All models failed, return appropriate error
        if (error.message.includes('API key') || error.message.includes('authorization') || 
            error.message.includes('authentication') || error.message.includes('401')) {
          return 'I\'m currently unable to access Benjamin\'s information due to a technical issue. Please try again later or reach out directly via email.';
        }
        
        if (error.message.includes('model') || error.message.includes('not found') || 
            error.message.includes('not available') || error.message.includes('404')) {
          return 'I\'m currently experiencing technical difficulties. Please try again later or contact Benjamin directly.';
        }
        
        if (error.message.includes('network')) {
          return 'It seems there\'s a network issue. Please check your internet connection and try again.';
        }
        
        if (error.message.includes('No choices')) {
          return 'I apologize, but I received an unexpected response. Please try asking your question again.';
        }
      }
      
      return 'I apologize for the inconvenience. I\'m having trouble accessing Benjamin\'s information at the moment. You can contact him directly at ' + personalInfo.contact.email;
    }
  }
  
  // This should never be reached but added as a fallback
  return 'I apologize, but I\'m currently unavailable. Please contact Benjamin directly at ' + personalInfo.contact.email;
}