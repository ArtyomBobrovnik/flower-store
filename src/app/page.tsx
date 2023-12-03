import { unstable_cache } from "next/cache";

import { api } from "~/trpc/server";
import { Button } from "~/ui/button";

export default async function Home() {
  const arrangmentVariations = await unstable_cache(
    () => api.arrangmentVariation.all.query(),
    ["arrangment"],
    { revalidate: 86400 },
  )();

  return (
    <main>
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        Hello world
      </h1>
      <Button>Test</Button>
      <p>{JSON.stringify(arrangmentVariations)}</p>
    </main>
  );
}
