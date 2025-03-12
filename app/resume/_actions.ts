"use server";
import { decrypt } from "@/lib/encrypt";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export const checkResume = async (prevState: null, formData: FormData) => {
  const { sessionClaims } = await auth();
  if (!sessionClaims || !sessionClaims.metadata.apiKey)
    throw new Error("Unauthorized");

  try {
    const apiKey = decrypt(
      sessionClaims.metadata.apiKey.encryptedData,
      sessionClaims.metadata.apiKey.iv
    );

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const pdf = formData.get("resume") as File;

    const prompt = `Rate and Analyse My CV. Convert the following resume feedback into a structured JSON format with keys like "overall_impression", "rating", "strengths", "areas_for_improvement", "specific_suggestions", and "example_project_improvement".
	   Ensure that return only the JSON object and the JSON follows a clean and readable structure :
	   
	   Return: {overall_impression: string, rating: number, strengths: string[], areas_for_improvement: string[], specific_suggestions: string[], example_projects_improvement: {project: string,changes:{original:string, improved:string}[]}[]}
	   `;

    const pdfArrayBuffer = await pdf.arrayBuffer();
    const pdfBuffer = Buffer.from(pdfArrayBuffer);

    const result = await model.generateContent([
      {
        inlineData: {
          data: pdfBuffer.toString("base64"),
          mimeType: "application/pdf",
        },
      },
      prompt,
    ]);
    console.log(JSON.parse(result.response.text()));
    return JSON.parse(result.response.text());
  } catch (error) {
    console.log(error);
    return { error: "An Error Occur!" };
  }
};
