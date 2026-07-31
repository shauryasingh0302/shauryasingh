import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET() {
  try {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!redisUrl || !redisToken) {
      return NextResponse.json({ error: "Upstash Redis not configured" }, { status: 500 });
    }

    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    // Increment the view counter for the portfolio
    // The key we are using is 'portfolio_views'
    const views = await redis.incr('portfolio_views');

    return NextResponse.json({ views });
  } catch (error) {
    console.error("Error fetching views from Upstash Redis:", error);
    return NextResponse.json({ error: "Failed to fetch views" }, { status: 500 });
  }
}
