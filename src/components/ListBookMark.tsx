"use client";

import { IBookMark } from "@/utils/types";
import { useState } from "react";
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


const ListBookMark = ({books,setBooks}:{books:IBookMark[],setBooks: React.Dispatch<React.SetStateAction<IBookMark[]>>;}) => {
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const [openEditAlert, setOpenEditAlert] = useState(false);
  const [openEditDialogue, setOpenEditDialogue] = useState(false);
  const [id, setId] = useState<number>(0);
  const [book, setBook] = useState<IBookMark>();
  
  const handleDelete = async () => {
    setBooks((prev)=>prev.filter((v)=>v._id !== id));
    setOpenDeleteAlert(!openDeleteAlert);
    toast.success("Book mark has been deleted");
  };
  const handleEdit = async () => {
    toast.success("Book mark has been Edited"+id);
  };

  return (
    <div>
      
      <div className="m-5 grid grid-cols-1 sm:grid-cols-2 text-sm md:grid-cols-4 gap-5">
        {books.map((book) => (
          <Card key={book._id} className="w-full md:max-w-sm">
            <CardHeader>
              <CardTitle>{book.title}</CardTitle>
              <CardDescription></CardDescription>
              <CardAction className="cursor-pointer flex gap-2">
                <span>
                  <PencilIcon
                    onClick={() =>{
                      setBook(book) 
                      setOpenEditDialogue(!openEditDialogue);
                    }}
                    size="15"
                  />
                </span>
                <span className="text-destructive  dark:text-destructive">
                  <TrashIcon
                    onClick={() => {
                      setId(book._id) 
                      setOpenDeleteAlert(!openDeleteAlert)
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
      {
      openEditDialogue && <EditDialogue
       open={openEditDialogue} 
       setOpen={()=>setOpenEditDialogue(!openEditDialogue)}
       setBooks={setBooks}
       book={book}
       />
       }
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
      {openEditAlert && (
        <AlertMessage
          open={openEditAlert}
          description={
            "This will Save your BookMark with latest changes you made in to our server."
          }
          handleSubmit={handleEdit}
          handleCancel={() => {
            setOpenEditAlert(!openEditAlert);
          }}
        />
      )}
    </div>
  );
};

export default ListBookMark;
