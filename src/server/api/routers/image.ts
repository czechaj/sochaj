import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { r2 } from "~/lib/r2";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const imageRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(z.unknown())
    .mutation(async ({ ctx, input }) => {
      const key = randomUUID();
      const presignedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: "sochaj",
          Key: key,
          ACL: "public-read",
        }),
        {
          expiresIn: 60 * 60,
        },
      );

      const imageUrl =
        "https://6c5243353584941593a8ef61386e4e3e.r2.cloudflarestorage.com/sochaj/" +
        key;

      await ctx.db.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          image: imageUrl,
        },
      });

      return {
        uploadUrl: presignedUrl,
      };

      /*   await Promise.all(
        urls.map((url, index) => {
          return fetch(url, {
            method: "PUT",
            body: input.files?.[index],
            headers: {
              "Content-Type": (input.images?.[index] as File).type,
            },
          });
        }),
      ); */

      /*       const fileName = input.name;
      const fileSize = input.size;
      const fileType = input.type; */
      // const objectKey = `${fileName}`;

      /*  if (fileSize > 10 * 1024) {
        throw new Error("File size is too large");
      } */

      /*  

     const imageUrl = `https://6c5243353584941593a8ef61386e4e3e.r2.cloudflarestorage.com/sochaj/${objectKey}`;
     const presignedUrl = await getSignedUrl(r2, cmd, { expiresIn: 3600 });


      */

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
