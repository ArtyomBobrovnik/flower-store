import { unstable_cache } from "next/cache";
import { api } from "~/trpc/server";

export default async function Home() {
  const arrangmentVariation = await unstable_cache(
    () => api.arrangmentVariation.all.query(),
    ["arrangment"],
    { revalidate: 86400 },
  )();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Hello world
        </h1>
        <p>{JSON.stringify(arrangmentVariation)}</p>
      </div>
    </main>
  );
}
