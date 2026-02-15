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
import React, { useState } from "react";
import Btn from "./Btn";
import AlertMessage from "./AlertMessage";
import {z} from "zod";
import { toast } from "sonner";
import { IBookMark } from "@/utils/types";
import { createClient } from "@/lib/supabase-client";

const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required!"),
  url: z.string().min(1,"URL is required!"),
});

const FormDialogue = ({
  open,
  setOpen,
  type,
  setBooks
}: {
  open: boolean;
  setOpen: () => void;
  setBooks: React.Dispatch<React.SetStateAction<IBookMark[]>>;
  type: string;
}) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [errors, setErrors] = useState<any>(null);
  
  const handleSubmit = async ()=>{
   setOpenAlert(!openAlert);
   setOpen();
   const supabase =  createClient();
   const userData = await supabase.auth.getUser();
   
   const { error } = await supabase
    .from("bookmarks")
    .insert([
      {
        user_id: userData.data.user?.id,
        title: title,
        url: url,
        created_at: new Date().toISOString(),
      },
    ])
    .select();

  if (error) {
    console.error("Insert error:", error);
    return;
  } 
   setBooks((prev)=>[...prev,{id:prev.length+1,title,url}]);
   toast.success("Bookmark has been created");
  }
  const validateForm = async()=>{
   const result = bookmarkSchema.safeParse({title,url});
   if(!result.success) {
     setErrors(result.error.format());
    return ;
   }
   setOpenAlert(!openAlert);
  }
  const handleCancel = async ()=>{
    setOpen();
  }
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
            <DialogTitle>{type == "Add"?"Add BookMark":"Edit BookMark"}</DialogTitle>
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
              <p className="text-xs text-red-500">{errors.title._errors[0]}</p>
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
              <span className="text-xs text-red-500">{errors.url._errors[0]}</span>
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
                validateForm()
                
              }}
            />
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
        {
            openAlert && <AlertMessage 
                open={openAlert}
                description={"This will Save your BookMark in our server."}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
            /> 
        }
    </div>
  );
};

export default FormDialogue;
