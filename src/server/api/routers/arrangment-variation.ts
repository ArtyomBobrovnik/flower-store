import type {
  ArrangementCategory,
  ArrangementVariation,
  Material,
} from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

type ArrangementVariationDTO = Partial<
  Record<
    ArrangementCategory,
    {
      variations: {
        id: ArrangementVariation["id"];
        price: ArrangementVariation["price"];
        materialUniqueness: ArrangementVariation["materialUniqueness"];
        size: ArrangementVariation["size"];
        availableMaterials: Material[];
      }[];
    }
  >
>;

export const ArrangmentVariationRoute = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => {
    console.log("!!!");

    const arrangementVariations = await ctx.db.arrangementVariation.findMany({
      include: {
        availableMaterials: {
          select: { material: true },
        },
      },
    });

    const getVariationDto = (
      variation: (typeof arrangementVariations)[number],
    ) => ({
      ...variation,
      availableMaterials: variation.availableMaterials.reduce<Material[]>(
        (acc, { material }) =>
          material.stockQuantity > 0 ? [...acc, material] : acc,
        [],
      ),
    });

    return arrangementVariations.reduce<ArrangementVariationDTO>(
      (acc, variation) => {
        const previousVariations = acc[variation.category]?.variations ?? [];
        const variations = [...previousVariations, getVariationDto(variation)];

        return { ...acc, [variation.category]: { variations } };
      },
      {},
    );
  }),
});
