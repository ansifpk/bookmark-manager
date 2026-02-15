"use client";
import Btn from "@/components/Btn";
import ListBookMark from "@/components/ListBookMark";
import { IBookMark } from "@/utils/types";
import { useEffect, useState } from "react";
import FormDialogue from "@/components/AddDialogue";
import { createClient } from "@/lib/supabase-client";



export default function Home() {
  const [books, setBooks] = useState<IBookMark[]>([]);
  const [open, setOpen] = useState(false);
  
  useEffect(()=>{
    const fetchDatas = async () =>{
      const supabase =  createClient();
      const userData = await supabase.auth.getUser();
      const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", userData.data.user?.id)
      .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching bookmarks:", error);
        return;
      } else {
        setBooks(data);
      }
    }
    fetchDatas()
  },[setBooks]);

  if (!books.length) {
    return (
      <div className="flex justify-center h-screen items-center-safe">
        <div className="text-center">
          <h3>No Book Marks</h3>
          <Btn
            text="Add Bookmark"
            className=""
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && <FormDialogue type="Add" open={open} setOpen={()=>setOpen(!open)} setBooks={setBooks} />}
      </div>
    );
  }

  return (
    <div className="m-5">
       <Btn text={"Add BookMark"} className={"cursor-pointer"} onClick={()=>setOpen(!open)} />
        <ListBookMark books={books} setBooks={setBooks} />
        {open && <FormDialogue type="Add" open={open} setOpen={()=>setOpen(!open)} setBooks={setBooks} />}
    </div>
  );
}
