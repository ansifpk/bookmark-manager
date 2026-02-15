import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(new URL("/login?error=auth_failed", request.url));
    }
    
    if(data.user){
      const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .single();

      if (!existingUser) {
        const { error: insertError } = await supabase
          .from("users")
          .insert({
            id: data.user.id,
            email: data.user.email,
            created_at: new Date().toISOString(),
          });

        if (insertError) {
          console.error("Error inserting user:", insertError);
        }
      }
    }
    
  }

  return NextResponse.redirect(new URL("/", request.url));
}