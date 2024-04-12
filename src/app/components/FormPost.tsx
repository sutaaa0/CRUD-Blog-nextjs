"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInputPost } from "../types";
import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag } from "@prisma/client";

interface FormPostProps {
  submit: SubmitHandler<FormInputPost>;
  isEditing: boolean;
  initialValue?: FormInputPost;
  isLoadingSubmit: boolean;
}
const FormPost: FC<FormPostProps> = ({ submit, isEditing, initialValue, isLoadingSubmit }) => {
  const { register, handleSubmit } = useForm<FormInputPost>({
    defaultValues: initialValue,
  });

  const { data: dataTags, isLoading: isLoadingTags } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: async () => {
      const response = await axios.get("/api/tags");
      return response.data;
    },
  });

  console.log(dataTags);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col justify-center items-center gap-5 mt-10">
      <input type="text" placeholder="Post title" className="input input-bordered w-full max-w-lg" {...register("title", { required: true })} />
      <textarea className="textarea textarea-bordered w-full max-w-lg" placeholder="Post content..." {...register("content", { required: true })}></textarea>

      {isLoadingTags ? (
        <span className="loading loading-ring loading-md"></span>
      ) : (
        <select defaultValue="" className="select select-bordered w-full max-w-lg" {...register("tagId", { required: true })}>
          <option disabled value={""}>
            Select tags
          </option>
          {dataTags?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}

      <button type="submit" className="btn btn-primary w-full max-w-lg">
        {isEditing ? "Update" : "Create"}
        {isLoadingSubmit && <span className="loading loading-spinner"></span>}
        {isEditing ? (isLoadingSubmit ? "Update" : "Update") : isLoadingSubmit ? "creating.." : "Create"}
      </button>
    </form>
  );
};

export default FormPost;
