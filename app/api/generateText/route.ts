import { NextRequest, NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  export async function POST(req: NextRequest, Res: NextResponse ) {
    const input = await req.json();
    try {
            const {prompt}= input
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const textResponse = response.text();
            return NextResponse.json({ success:true, data:textResponse });
          }
     catch (error) {
        return NextResponse.json({ success:false, data:null});
    }
}

