"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

interface ButtonActionProps {
  id: string;
}

const ButtonAction: FC<ButtonActionProps> = ({ id }) => {
  const router = useRouter();
  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: () => {
      return axios.delete(`/api/posts/${id}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  return (
    <div>
      <Link href={`/edit/${id}`} className="btn mr-2">
        <Pencil />
        Edit
      </Link>
      <button onClick={() => deletePost()} className="btn btn-error">
        {isLoading && <span className="loading loading-spinner"></span>}
        {isLoading ? (
          "Loading..."
        ) : (
          <>
            <Trash />
            Delete
          </>
        )}
      </button>
    </div>
  );
};

export default ButtonAction;
