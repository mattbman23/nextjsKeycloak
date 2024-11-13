import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex-1 flex flex-row items-center text-5xl justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="flex-1 text-center">
        Welcome <br /> {session?.user?.name}
      </div>
    </main>
  );
}
