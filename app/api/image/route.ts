import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";
import { checkLimit, increateLimit } from "@/lib/api-limit";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolutions = "256x256" } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }
    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }
    if (!amount) {
      return new NextResponse("Amount is required", { status: 400 });
    }
    if (!resolutions) {
      return new NextResponse("Resolution is required", { status: 400 });
    }
    const freeTrial = await checkLimit();

    if (!freeTrial) {
      return new NextResponse("Free trial limit exceeded", { status: 403 });
    }
    const response = await openai.images.generate({
      prompt,
      n: parseInt(amount, 10),
      size: resolutions,
    });
    await increateLimit();
    return NextResponse.json(response.data);
  } catch (error) {
    console.log("IMAGE_API_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
