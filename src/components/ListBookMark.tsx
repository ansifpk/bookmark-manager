"use client";

import { IBookMark } from "@/utils/types";
import { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import AlertMessage from "./AlertMessage";
import EditDialogue from "./EditDialogue";
import { createClient } from "@/lib/supabase-client";
import { useSelector } from "react-redux";
const supabase = createClient();

const ListBookMark = ({
  books,
  setBooks,
}: {
  books: IBookMark[];
  setBooks: React.Dispatch<React.SetStateAction<IBookMark[]>>;
}) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEditDialogue, setOpenEditDialogue] = useState(false);
  const [id, setId] = useState<number>(0);
  const [book, setBook] = useState<IBookMark>();
  
  const userId = useSelector((state:any)=>state.auth.id);
  const handleDelete = async () => {
    
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);

    if (error) {
      console.error("Delete error:", error);
      return;
    }

    setBooks((prev) => prev.filter((v) => v.id !== id));
    setOpenDeleteAlert(!openDeleteAlert);
    toast.success("Book mark has been deleted");
  };

   useEffect(() => {    
    if (!userId) return;
    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          const newBookmark = payload.new as IBookMark
          setBooks((prev)=>prev.map((book)=>book.id === newBookmark.id ? newBookmark : book ));
        }
      )
    .subscribe((status) => {
      console.log("Realtime status:", status);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [userId]);
 
  return (
    <div>
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 text-sm md:grid-cols-4 gap-5">
        {books.map((book, index) => (
          <Card key={`${book.id}` + `${index}`} className="w-full md:max-w-sm">
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription></CardDescription>
              <CardAction className="cursor-pointer flex gap-2">
                <span>
                  <PencilIcon
                    onClick={() => {
                      setBook(book);
                      setOpenEditDialogue(!openEditDialogue);
                    }}
                    size="15"
                  />
                </span>
                <span className="text-destructive  dark:text-destructive">
                  <TrashIcon
                    onClick={() => {
                      setId(book.id);
                      setOpenDeleteAlert(!openDeleteAlert);
                    }}
                    size="15"
                  />
                </span>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div>{book.url}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      {openEditDialogue && (
        <EditDialogue
          open={openEditDialogue}
          setOpen={() => setOpenEditDialogue(!openEditDialogue)}
          setBooks={setBooks}
          book={book}
        />
      )}
      {openDeleteAlert && (
        <AlertMessage
          open={openDeleteAlert}
          description={
            "This will Permanantly remove this BookMark from our server."
          }
          handleSubmit={handleDelete}
          handleCancel={() => {
            setOpenDeleteAlert(!openDeleteAlert);
          }}
        />
      )}
    </div>
  );
};

export default ListBookMark;
