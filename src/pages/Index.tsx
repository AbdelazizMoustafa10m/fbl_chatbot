import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { WelcomeScreen } from "@/components/WelcomeScreen";

const WELCOME_MESSAGE = "Hello, welcome to our FBL & OTA Knowledge Hub😃!\nHow can I help you?";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [messages, setMessages] = useState([
    { message: WELCOME_MESSAGE, isAi: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { message, isAi: false }]);
    setIsTyping(true);
    
    try {
      console.log('Sending request to API:', message);
      const response = await fetch('https://chatbot-api.n8ndeutschauto.de/api/v1/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: message,
          conversation_id: Date.now().toString()
        })
      });

      console.log('API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error response:', errorData);
        
        if (response.status === 0) {
          throw new Error('Could not connect to the API server. Please make sure it is running.');
        }
        
        throw new Error(
          errorData?.detail || 
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log('API Response data:', data);

      if (!data.answer && data.error) {
        throw new Error(data.error);
      }

      setMessages((prev) => [
        ...prev,
        { message: data.answer, isAi: true },
      ]);
    } catch (error: any) {
      console.error('Chat error:', error);
      let errorMessage = error.message || 'An unexpected error occurred. Please try again.';
      
      setMessages((prev) => [
        ...prev,
        { message: errorMessage, isAi: true },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  if (showWelcome) {
    return <WelcomeScreen onStartChat={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col relative" style={{ 
        backgroundImage: "url('/images/chat_background.png')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#000'
      }}>
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1">
      {/* Header */}
      <header className="py-6 px-4 border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-red-900/20 to-zinc-900 backdrop-blur-sm">
        <div className="container max-w-2xl text-center">
          <h1 className="text-xl font-semibold bg-gradient-to-r from-red-200 via-red-300 to-red-200 text-transparent bg-clip-text">FBL&OTA Assistant</h1>
          <p className="text-gray-400 text-sm mt-1">Your intelligent chat companion</p>
        </div>
      </header>

      {/* Chat Container */}
      <main className="flex-1 container max-w-2xl py-4 px-4">
        <div className="bg-zinc-900 bg-opacity-95 backdrop-blur-sm rounded-xl shadow-lg border border-zinc-800/50 h-[calc(100vh-12rem)] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} {...msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-zinc-800 bg-black rounded-b-xl">
            <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 px-4 border-t border-zinc-800/50 bg-zinc-900 bg-opacity-95 backdrop-blur-sm">
        <div className="container max-w-2xl text-center text-xs text-gray-400">
          © 2025 FBL&OTA Assistant. All rights reserved.
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Index;