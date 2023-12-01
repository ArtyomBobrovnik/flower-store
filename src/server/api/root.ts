import { createTRPCRouter } from "~/server/api/trpc";
import { ArrangmentVariationRoute } from "~/server/api/routers/arrangment-variation";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  arrangmentVariation: ArrangmentVariationRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
