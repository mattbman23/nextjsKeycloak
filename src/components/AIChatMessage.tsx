"use client ";

import { IMessage } from "@/type";
import { useEffect, useState } from "react";

const AIChatMessage = ({ by, message, datetime }: IMessage) => {
  const [generatedMessage, setGeneratedMessage] = useState("");

  useEffect(() => {
    const generateText = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/wxai/generate_text_stream`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message,
          }),
        }
      );
      const reader = response.body
        ?.pipeThrough(new TextDecoderStream())
        .getReader();
      let accumulatedMessage = "";
      while (true) {
        // @ts-ignore
        const { value, done } = await reader?.read();
        if (done) {
          break;
        }
        if (value) {
          accumulatedMessage += value;
          setGeneratedMessage(accumulatedMessage);
        }
      }
    };
    generateText();
  }, []);

  return (
    <div className="flex items-start gap-2.5 justify-start">
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
          {generatedMessage}
        </p>
      </div>
      <div className="h-[80px] w-[80px]">.</div>
    </div>
  );
};

export default AIChatMessage;
