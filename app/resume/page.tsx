"use client";

import type React from "react";

import { useActionState, useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import ResumeAnalysisResult from "@/components/commons/ResumeAnalysisResult";
import { checkResume } from "./_actions";
import ResumeInput from "@/components/commons/ResumeInput";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const [analysis, checkResumeAction, pending] = useActionState(
    checkResume,
    null
  );

  return (
    <main className="container mx-auto p-4 min-h-screen">
      <div
        className={`flex flex-col md:flex-row gap-6 transition-all duration-500 ease-in-out ${
          analysis || pending ? "justify-between" : "justify-center"
        }`}
      >
        {/* Upload Form */}
        <form
          action={(e) => checkResumeAction(e)}
          className={`transition-all duration-500 ease-in-out ${
            analysis || pending ? "md:w-1/2" : "w-full max-w-xl mx-auto"
          }`}
        >
          <Card className="p-6 border-2 border-blue-100">
            <h1 className="text-2xl font-bold text-center mb-8">
              Upload Your Resume Here
            </h1>
            <ResumeInput file={file} handleFileChange={handleFileChange} />
          </Card>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-colors mt-4"
            disabled={!file || pending}
          >
            Let AI Check
          </Button>
        </form>

        {/* Results Section */}
        {(pending || analysis) && (
          <div
            className={`md:w-1/2 transition-all duration-500 ease-in-out ${
              pending || analysis
                ? "animate-in fade-in slide-in-from-right-10 duration-500"
                : ""
            }`}
          >
            <Card className="p-6 h-full">
              {pending ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
                  <p className="text-lg font-medium text-gray-700">
                    Analyzing your resume...
                  </p>
                </div>
              ) : analysis ? (
                <ResumeAnalysisResult analysis={analysis} />
              ) : null}
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
