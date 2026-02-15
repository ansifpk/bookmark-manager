"use client";
import { removeUser } from "@/lib/redux/slice";
import { createClient } from "@/lib/supabase-client"
import { DoorOpenIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const supabase = createClient();
  const dispatch = useDispatch()
  const user = useSelector((state:any)=>state.auth.email)
  const handleLogout = async () => {
    await supabase.auth.signOut();
    dispatch(removeUser(""))
    redirect("/login");
  }
  
  return (
    <nav className="flex justify-between mx-5 place-items-center-safe"> 
       <div className="text-3xl font-bold underline">E-Book Mark</div>
       <ul className="flex gap-5 cursor-pointer" >
        {
         user&&<DoorOpenIcon onClick={()=>handleLogout()} className="text-red-600" />
        }
       </ul>
    </nav>
  )
}

export default Header
