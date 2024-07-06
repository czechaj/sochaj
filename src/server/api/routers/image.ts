import { z } from "zod";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Upload } from "@aws-sdk/lib-storage";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { r2 } from "~/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "~/env";

export const imageRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(z.object({ image: z.any() }))
    .mutation(async ({ ctx, input }) => {
      console.log("🚀 ~ upload:protectedProcedure.input ~ input:", input);

      const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: `${env.R2_BUCKET_NAME}`,
          Key: Date.now().toString() + "_",
        }),
        { expiresIn: 60 },
      );

      const data = await fetch(signedUrl, {
        method: "PUT",
        body: input.image,
        
      })

      console.log("🚀 ~ .mutation ~ signedUrl:", data);

      /*  return ctx.db.post.create({
        data: {
          content: input.content,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      }); */
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.post.delete({
        where: { id: input.id },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }),
  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
