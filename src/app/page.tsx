import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex-1 flex items-center text-5xl justify-center font-[family-name:var(--font-geist-sans)]">
      Welcome {session?.user?.name}
    </main>
  );
}
