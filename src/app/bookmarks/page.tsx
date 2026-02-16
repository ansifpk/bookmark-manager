"use client";
import Btn from "@/components/Btn";
import ListBookMark from "@/components/ListBookMark";
import { IBookMark } from "@/utils/types";
import { useEffect, useState } from "react";
import FormDialogue from "@/components/AddDialogue";
import { createClient } from "@/lib/supabase-client";
import { useSelector } from "react-redux";

export default function Home() {
  const [books, setBooks] = useState<IBookMark[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const userId = useSelector((state: any) => state.auth.id);
  useEffect(() => {
    if (!userId) return;
    const fetchDatas = async () => {
      const supabase = createClient();
      let query = supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (debouncedSearch) {
        query = query.ilike("title", `%${debouncedSearch}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching bookmarks:", error);
        return;
      } else {
        setBooks(data);
      }
    };
    fetchDatas();
  }, [setBooks, userId, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="m-5">
      <div className={"flex justify-between"}>
        <Btn
          text={"Add BookMark"}
          className={"cursor-pointer"}
          onClick={() => setOpen(!open)}
        />
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value.trim())}
          placeholder="Search..."
          className="p-1 border rounded"
        />
      </div>
      {books.length ? (
        <ListBookMark books={books} setBooks={setBooks} />
      ) : (
        <div className="flex justify-center h-screen items-center-safe">
          <div className="text-center">
            <h3>No Book Marks</h3>
            <Btn
              text="Add Bookmark"
              className=""
              onClick={() => setOpen(!open)}
            />
          </div>
          {open && (
            <FormDialogue
              type="Add"
              open={open}
              setOpen={() => setOpen(!open)}
              setBooks={setBooks}
            />
          )}
        </div>
      )}

      {open && (
        <FormDialogue
          type="Add"
          open={open}
          setOpen={() => setOpen(!open)}
          setBooks={setBooks}
        />
      )}
    </div>
  );
}
