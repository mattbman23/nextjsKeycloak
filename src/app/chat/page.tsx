"use client";

import AIChatMessage from "@/components/AIChatMessage";
import ChatMessage from "@/components/ChatMessage";
import { useGlobalStore } from "@/store";
import React, { Fragment, useEffect, useState } from "react";

const ChatPage = () => {
  const { chat_elements, update_chat_elements, clear_chat } = useGlobalStore();
  const [text, setText] = useState("");

  useEffect(() => {
    clear_chat();
  }, []);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    update_chat_elements(
      <ChatMessage by="me" datetime={new Date()} message={text} />
    );
    setText("");
    update_chat_elements(
      <AIChatMessage by="ai" datetime={new Date()} message={text} />
    );
  };

  return (
    <div className="flex-1 flex flex-col p-3 w-full">
      <div className="flex-1 p-3 h-56 flex flex-col gap-y-5">
        {chat_elements.map((chat_element, idx) => (
          <Fragment key={idx}>{chat_element}</Fragment>
        ))}
      </div>

      <form onSubmit={submitHandler}>
        <div className="relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="When is lunar new year?"
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPage;
