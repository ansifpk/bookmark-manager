"use client";

import Btn from "@/components/Btn";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  return (
   <div>
    <div className="grid grid-cols-1  justify-center place-items-center">
       <div>
         Explore your Book marts and manage your book marts..
       </div>
       <Btn onClick={()=>router.push("/bookmarks")} text="Explore your Books" className="rounded-full text-xl bg-teal-500 p-8 text-white cursor-pointer transform-fill hover:scale-105" />
    </div>
   </div>
  );
}
