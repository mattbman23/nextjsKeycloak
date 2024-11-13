"use client";

import { upload_asset } from "@/actions/todo";
import { TodoI } from "@/app/todo/page";
import { useSession } from "next-auth/react";

export const TodoCard = ({ todo }: { todo: TodoI }) => {
  const { data: session } = useSession();
  const date = new Date(todo.created_at);

  const formatted_date = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const download_asset = async (filename: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/minio/download?filename=${filename}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.ac}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("An error occurred while downloading the file.");
    }
  };

  return (
    <div className="bg-[#A5B4FC] text-xl rounded p-5">
      <div className="font-bold">{todo.task}</div>
      <div className="flex flex-row items-center gap-5">
        <div>Completed:</div>
        {todo.is_completed ? (
          <div className="text-blue-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        ) : (
          <div className="text-red-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {todo.resources ? (
        <>
          <div>Resource: {todo.resources}</div>
          <button
            onClick={() => download_asset(todo.resources!)}
            className="bg-blue-300 px-3 py-1 rounded"
            type="button"
          >
            Download
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-row gap-5">
            <div>Resource:</div>
            <div>NA</div>
          </div>
          <form
            action={upload_asset}
            className="flex flex-col gap-y-3 border border-black rounded p-3 overflow-hidden"
          >
            <div className="w-full text-sm">
              <input type="file" name="todo_asset" required />
              <input
                type="hidden"
                name="task"
                value={todo.task.replaceAll(" ", "").toLocaleLowerCase()}
              />
            </div>
            <button className="bg-blue-300 px-3 py-1 rounded" type="submit">
              Submit
            </button>
          </form>
        </>
      )}
      <div className="text-sm text-black/50">{formatted_date}</div>
    </div>
  );
};
