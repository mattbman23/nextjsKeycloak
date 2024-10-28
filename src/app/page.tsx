"use client";

import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="flex-1 flex items-center text-5xl justify-center font-[family-name:var(--font-geist-sans)]">
      Welcome {session?.user?.name}
    </main>
  );
}
