import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

export const WelcomeScreen = ({ onStartChat }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex items-start justify-center pt-16" style={{ backgroundImage: "url('/images/Background.png')", backgroundSize: 'cover', backgroundPosition: 'top', backgroundColor: '#000', minHeight: '100vh' }}>
      {/* Content container */}
      <div className="relative bg-opacity-50 bg-black backdrop-blur rounded-xl border border-zinc-800 shadow-2xl p-8 max-w-md w-full text-center text-white mt-8">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 text-red-600">
              {/* Simple chat bubble icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">FBL and OTA Knowledge Hub</h1>
          <p className="text-gray-300 mb-4">
            Your AI-powered assistant for Flashbootloader and Over-The-Air updates
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Access comprehensive knowledge about FBL and OTA systems, powered by real-world resources and industry expertise
          </p>
        </div>
        <Button
          onClick={onStartChat}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
        >
          Start Chat
        </Button>
      </div>
    </div>
  );
};
