import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET() {
  const api_key = process.env.WAKATIME_API_KEY;

  if (!api_key) {
    return NextResponse.json({ error: "No API Key" }, { status: 401 });
  }

  const base64ApiKey = Buffer.from(api_key).toString('base64');

  try {
    const response = await fetch("https://wakatime.com/api/v1/users/current/stats/last_7_days", {
      headers: {
        Authorization: `Basic ${base64ApiKey}`,
      },
      cache: "no-cache"
    });

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch WakaTime stats" }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data.data);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
