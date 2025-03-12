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
    const jobDescription = formData.get("jobDescription");

    const prompt = `You are an expert in resume analysis and applicant tracking system (ATS) optimization. Your task is to provide detailed, actionable feedback on the user's resume compared to their target job description.

### Job Description:
${jobDescription}

### User's Resume:
{in the file}

### Instructions:
1. Analyze the resume against the job description to identify alignment and gaps.
2. Calculate a match score (0-100%) based on keyword alignment, skills match, and overall compatibility.
3. Provide comprehensive feedback in the following structure:

### Output Format:

**Match Score: [X]%**
* Briefly explain what this score means (e.g., "This is a moderate match that indicates your resume needs targeted improvements")
* Contextualize the score relative to typical expectations (e.g., "Aim for 80%+ for competitive positions")

**Key Strengths:**
* List 3-5 elements of the resume that align well with the job description
* Highlight specific phrases, skills, or experiences that are particularly strong matches

**Missing Skills & Keywords:**
* List all critical keywords/skills from the job description not found in the resume
* Prioritize them by importance ({priority: "high"| "medium"|"low"})
* For each missing element, suggest how it might be incorporated if the applicant has relevant experience

**ATS Compatibility Issues:**
* Identify any formatting, structure, or design elements that might impede ATS parsing
* Assess use of standard section headings, bullet formatting, and overall readability

**Section-by-Section Recommendations:**
* Summary/Profile: Specific improvements to align with job requirements
* Experience: Ways to better highlight relevant achievements and responsibilities
* Skills: Suggestions for reorganization or additions
* Education/Certifications: Recommendations for better highlighting relevant credentials

**Content Enhancement Suggestions:**
* Provide 3-5 examples of specific bullet points or phrases that could be rewritten
* Show "before and after" examples where possible
* Suggest ways to incorporate quantifiable achievements related to job requirements

**Action Plan:**
* Prioritize the top 3-5 changes that would most improve the match score
* Suggest a timeline for implementing these changes

**Industry Context:**
* Provide any relevant industry-specific context about resume expectations
* Note any trends or preferences specific to this job category

Your goal is to provide feedback that is specific, actionable, and personalized to help the applicant maximize their chances of getting past ATS screening and impressing human reviewers.`;
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
