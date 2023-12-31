import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { increateLimit, checkLimit } from "@/lib/api-limit";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const freeTrial = await checkLimit();

    if (!freeTrial) {
      return new NextResponse("Free trial limit exceeded", { status: 403 });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    await increateLimit();

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("CONVERSATION_API_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
