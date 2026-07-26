import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    body._captcha = "false";
    body._template = "table";

    const res = await fetch("https://formsubmit.co/ajax/shauryasingh0302@icloud.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
