"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const UploadCoverImage = () => {
  const router = useRouter();

  const [file, setFile] = useState<File>();

  const uploadImage = api.image.upload.useMutation({
    onSuccess: async ({ uploadUrl }) => {
      try {
        await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file?.type ?? "application/json",
          },
        });

        router.refresh();
        setFile(undefined);
      } catch (err) {
        console.error(err);
      }
    },
  });

  const handleUploadImage = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) return;

    uploadImage.mutate({
      file,
    });
  };

  return (
    <form onSubmit={handleUploadImage} className="flex flex-col gap-2">
      <input
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={(e) => setFile(e.target.files?.[0])}
        className="w-full rounded-md px-4 py-2 text-black"
      />
      <Button
        type="submit"
        variant={"default"}
        size={"sm"}
        className="w-fit"
        disabled={uploadImage.isPending}
      >
        {uploadImage.isPending ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export { UploadCoverImage };
