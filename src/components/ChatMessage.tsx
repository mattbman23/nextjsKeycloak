"use client ";

import { IMessage } from "@/type";

const ChatMessage = ({ by, message, datetime }: IMessage) => {
  return (
    <div className="flex items-start gap-2.5 justify-end">
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-xl dark:bg-gray-700">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {by}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {datetime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {message}
        </p>
      </div>
      <div className="h-[80px] w-[80px]">.</div>
    </div>
  );
};

export default ChatMessage;
