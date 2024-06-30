"use client";

import { type Post } from "@prisma/client";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/react";

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
      className="flex w-full items-center justify-between rounded-md bg-gray-500/20 p-4"
    >
      <div className="flex flex-col gap-2">
        <span>{post.name}</span>
        <span className="text-xs">
          {new Date(post.createdAt).toLocaleDateString("tr-TR", {
            dateStyle: "medium",
          })}{" "}
          {new Date(post.createdAt).toLocaleTimeString("tr-TR", {
            timeStyle: "medium",
          })}
        </span>
      </div>

      <button
        type="submit"
        className="h-fit rounded-md bg-red-600 px-3 py-1.5 text-sm"
        disabled={deletePost.isPending}
      >
        {deletePost.isPending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
