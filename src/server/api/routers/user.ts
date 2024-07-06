import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

/* export const userRouter = createTRPCRouter({
  createCoverPhoto:protectedProcedure
  .input(z.object({ image: z.instanceof(File) }))
  .mutation(async ({ ctx, input }) => {
    // simulate a slow db call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return ctx.db.user.create({
      data: {
        content: input.content,
        createdBy: { connect: { id: ctx.session.user.id } },
      },
    });
  }),

  create: protectedProcedure
    .input(z.object({ content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.user.create({
        data: {
          content: input.content,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
 */
/*  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.delete({
        where: { id: input.id },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.user.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }), 
});
*/
