"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IBookMark } from "@/utils/types";
import React, { useState } from "react";
import { toast } from "sonner";
import z from "zod";
import AlertMessage from "./AlertMessage";
import Btn from "./Btn";
import { createClient } from "@/lib/supabase-client";
const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  url: z.string().min(1, "URL is required!"),
});

const EditDialogue = ({
  open,
  setOpen,
  setBooks,
  book,
}: {
  open: boolean;
  setOpen: () => void;
  setBooks: React.Dispatch<React.SetStateAction<IBookMark[]>>;
  book: IBookMark | undefined;
}) => {
  const [title, setTitle] = useState(book!.title);
  const [url, setUrl] = useState(book!.url);
  const [openAlert, setOpenAlert] = useState(false);
  const [errors, setErrors] = useState<any>(null);
  
  const handleEdit = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("bookmarks")
      .update({
        title: title,
        url: url,
      })
      .eq("id", book?.id)
      .select();

    if (error) {
      console.error("Update error:", error);
      return;
    }
    setOpen();
    setBooks((prev)=>prev.map((book)=>book.id === data[0].id ? data[0]:book ));
    setOpenAlert(!openAlert);    
    toast.success("Book mark has been Edited");
  };
  const validateForm = async () => {
    const result = bookmarkSchema.safeParse({ title, url });
    if (!result.success) {
      setErrors(result.error.format());
      return;
    }
    setOpenAlert(!openAlert);
  };
  const handleCancel = async () => {
    setOpen();
  };
  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen();
          setTitle("");
          setUrl("");
        }}
      >
        <form>
          <DialogContent className="max-w-sm bg-gray-200 backdrop-blur-lg">
            <DialogHeader>
              <DialogTitle>Edit BookMark</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="space-y-5">
              <div className="flex gap-3 place-items-center">
                <label htmlFor="title">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-black rounded w-full p-1"
                  id="title"
                  name="title"
                />
              </div>
              {errors?.title && (
                <p className="text-xs text-red-500">
                  {errors.title._errors[0]}
                </p>
              )}
              <div className="flex gap-5 place-items-center">
                <label htmlFor="url">Url</label>
                <input
                  onChange={(e) => setUrl(e.target.value)}
                  value={url}
                  className="border border-black rounded w-full p-1"
                  id="url"
                  name="url"
                />
              </div>
              {errors?.url && (
                <span className="text-xs text-red-500">
                  {errors.url._errors[0]}
                </span>
              )}
            </div>
            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Btn
                  text="Close"
                  className=""
                  onClick={() => {
                    setTitle("");
                    setUrl("");
                  }}
                />
              </DialogClose>
              <Btn
                text="Save"
                className=""
                onClick={() => {
                  validateForm();
                }}
              />
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
      {openAlert && (
        <AlertMessage
          open={openAlert}
          description={"This will Save your BookMark in our server."}
          handleSubmit={handleEdit}
          handleCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default EditDialogue;
