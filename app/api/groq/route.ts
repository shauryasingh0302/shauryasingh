import { NextResponse } from 'next/server';
import { projects, skills, blogPosts } from '@/lib/portfolio-data';

// Create a combined context string from the portfolio data
const portfolioContext = `
Shaurya Singh is a Final year Computer Science Engineering student (GPA 7.57/10.0).
He is a Full-Stack Developer, building AI-integrated products.
He won the Smart India Hackathon 2025 for 'Navjivan' (an AI-powered smoking cessation platform).
He works as a Web Developer & Video Editor for Google Developer Groups (GDG) Noida.

Projects:
${projects.map(p => `- ${p.title}: ${p.description}`).join('\n')}

Skills:
${skills.map(s => `- ${s.category}: ${s.items.map(i => i.name).join(', ')}`).join('\n')}

Achievements/Experience:
${blogPosts.map(b => `- ${b.title} (${b.date}): ${b.excerpt}`).join('\n')}

Contact Email: shauryasingh0302@icloud.com
Github: https://github.com/shauryasingh0302
LinkedIn: https://linkedin.com/in/shauryasingh0302
`;

const systemPrompt = `You are a helpful, concise AI assistant integrated directly into the terminal of Shaurya Singh's portfolio website. 
You must answer questions about Shaurya based on the following context.
Keep your answers brief, professional, and formatted in plain text (no markdown rendering, just pure text, as it will be displayed in a fake terminal).
If asked something outside the context of Shaurya's professional background, politely decline or pivot back to his skills.

CONTEXT:
${portfolioContext}
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === 'your_key_here') {
      return NextResponse.json({ 
        response: "Error: GROQ_API_KEY is not configured in .env.local. Please add your Groq API key." 
      });
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 150,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      return NextResponse.json({ response: `API Error: ${response.statusText}` });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response generated.";
    
    return NextResponse.json({ response: reply });

  } catch (error: any) {
    console.error("Grok route error:", error);
    return NextResponse.json({ response: "Internal Server Error" }, { status: 500 });
  }
}
