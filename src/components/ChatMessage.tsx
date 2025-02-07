import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isAi: boolean;
}

export const ChatMessage = ({ message, isAi }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isAi ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-chat px-4 py-2.5",
          isAi
            ? "bg-zinc-800 text-gray-200"
            : "bg-red-900 text-gray-200"
        )}
      >
        <p className="text-sm sm:text-base whitespace-pre-wrap leading-relaxed">{message}</p>
      </div>
    </div>
  );
};