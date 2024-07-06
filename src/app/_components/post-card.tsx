"use client";

import { type Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

import { api } from "~/trpc/react";
import { Paragraph } from "../components/ui/Paragraph";

export function PostCard(post: Post) {
  const router = useRouter();

  const deletePost = api.post.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        deletePost.mutate({ id: post.id });
      }}
      className="flex w-full items-center justify-between rounded-md bg-background p-4"
    >
      <div className="flex flex-col gap-2">
        <Paragraph className="text-left">{post.content}</Paragraph>
        <span className="text-xs text-muted-foreground/80">
          {new Date(post.createdAt).toLocaleDateString("tr-TR", {
            dateStyle: "medium",
          })}{" "}
          {new Date(post.createdAt).toLocaleTimeString("tr-TR", {
            timeStyle: "medium",
          })}
        </span>
      </div>

      <Button
        type="submit"
        size={"sm"}
        variant={"destructive"}
        disabled={deletePost.isPending}
      >
        {deletePost.isPending ? "Deleting..." : "Delete"}
      </Button>
    </form>
  );
}
