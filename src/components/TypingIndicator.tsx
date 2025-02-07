export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-zinc-800 rounded-chat px-4 py-2.5">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-blink"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-blink [animation-delay:0.2s]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300 animate-blink [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};