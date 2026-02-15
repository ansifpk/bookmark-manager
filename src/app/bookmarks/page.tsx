"use client";
import Btn from "@/components/Btn";
import ListBookMark from "@/components/ListBookMark";
import { IBookMark } from "@/utils/types";
import { useState } from "react";
import FormDialogue from "@/components/AddDialogue";



export default function Home() {
  const [books, setBooks] = useState<IBookMark[]>([]);
  const [open, setOpen] = useState(false);
  
  console.log("books ",books);
  

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
