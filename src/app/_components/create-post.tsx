"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";

import { api } from "~/trpc/react";

export function CreatePost() {
  const router = useRouter();
  const [content, setContent] = useState("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setContent("");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate({ content });
      }}
      className="flex flex-col gap-2"
    >
      <textarea
        placeholder="Write a post"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full rounded-md px-4 py-2 text-black"
      />
      <Button
        type="submit"
        variant={"default"}
        size={"sm"}
        className="w-fit"
        disabled={createPost.isPending}
      >
        {createPost.isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
}
