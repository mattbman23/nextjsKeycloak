import { auth } from "@/auth";
import { TodoCard } from "@/components/TodoCard";
import { redirect } from "next/navigation";

export interface TodoI {
  is_completed: boolean;
  id: number;
  resources: string | null;
  task: string;
  created_at: string;
}

export default async function Todo() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const res = await fetch("http://localhost:8000/todo", {
    headers: {
      Authorization: `Bearer ${session?.ac}`,
    },
  });
  const todos: TodoI[] = await res.json();

  return (
    <main className="flex-1 flex flex-row items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="flex-1 grid grid-cols-1 gap-3 px-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {todos.map((todo) => (
          <TodoCard todo={todo} key={todo.id} />
        ))}
      </div>
    </main>
  );
}
