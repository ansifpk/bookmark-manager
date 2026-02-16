"use client";

import Btn from "@/components/Btn";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center px-6 md:px-16">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-6xl w-full">
        
        {/* LEFT CONTENT */}
        <div className="space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Supercharge Your{" "}
            <span className="text-blue-600">Bookmarks</span>
          </h1>

          <p className="text-lg text-muted-foreground">
            Save and organize your favorite links. 
            Access them anytime, anywhere.
          </p>

          <Btn
            onClick={() => router.push("/bookmarks")}
            text="Get Started"
            className="rounded-full cursor-pointer text-lg px-8 py-4 bg-blue-600 text-white hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <Image
            src="/hero2.png"
            alt="Bookmark Manager Illustration"
            width={500}
            height={500}
            className="w-full max-w-md"
            priority
          />
        </div>

      </div>
    </div>
  );
}
