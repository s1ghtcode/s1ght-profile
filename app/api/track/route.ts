import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  await supabase.from("clicks").insert([
    {
      name: body.name,
      url: body.url,
      type: body.type,
    },
  ]);

  return NextResponse.json({ success: true });
}

export async function GET() {
  const { data } = await supabase
    .from("clicks")
    .select("*")
    .order("created_at", { ascending: false });

  return NextResponse.json(data);
}