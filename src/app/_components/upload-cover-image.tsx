"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

const UploadCoverImage = () => {
  const router = useRouter();

  const [image, setImage] = useState<File>();

  const uploadImage = api.image.upload.useMutation({
    onSuccess: () => {
      router.refresh();
      setImage(undefined);
    },
  });

  async function handleUploadImage(e: FormEvent) {
    e.preventDefault();

    if (!image) return;
    console.log("🚀 ~ handleUploadImage ~ image:", image);
    uploadImage.mutate({
      image,
    });
  }

  return (
    <form onSubmit={handleUploadImage} className="flex flex-col gap-2">
      <input
        type="file"
        onChange={(e) => setImage(e.target.files?.[0])}
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
