"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export const upload_asset = async (formData: FormData) => {
  const session = await auth();
  const file = formData.get("file") as File;
  const taskId = formData.get("tid");

  const updated_file_name = taskId + file.name;
  const newFile = new File([file], updated_file_name, {
    type: file.type,
  });
  formData.set("file", newFile);

  const response = await fetch(
    `${process.env.BACKEND_URL}/minio/upload?id=${taskId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session?.ac}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    console.error("Upload failed:", await response.text());
    return;
  }

  const data = await response.json();
  revalidatePath("/todo");
  return data;
};

export const delete_todo = async (todo_id: number) => {
  const session = await auth();

  const response = await fetch(
    `${process.env.BACKEND_URL}/todo?todo_id=${todo_id}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${session?.ac}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Delete failed:", await response.text());
    return;
  }

  const data = await response.json();
  revalidatePath("/todo");
  return data;
};
