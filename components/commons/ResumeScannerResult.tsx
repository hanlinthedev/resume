"use client";

import { useRef, useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  ListChecks,
  FileWarning,
  FileEdit,
  ArrowUpRight,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface MissingSkill {
  keyword: string;
  priority: string;
  suggestion: string;
}

interface ContentEnhancement {
  before: string;
  after: string;
}

export interface ResumeAnalysis {
  "Match Score": string;
  Explanation: string;
  "Key Strengths": string[];
  "Missing Skills & Keywords": MissingSkill[];
  "ATS Compatibility Issues": string[];
  "Section-by-Section Recommendations": {
    "Summary/Profile": string;
    Experience: string;
    Skills: string;
    "Education/Certifications": string;
  };
  "Content Enhancement Suggestions": ContentEnhancement[];
  "Action Plan": string[];
  "Industry Context": string;
}

export default function ResumeScannerResult({
  analysis,
}: {
  analysis: ResumeAnalysis;
}) {
  const reportRef = useRef<HTMLDivElement>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "missing-skills": true,
    "content-enhancements": true,
    "section-recommendations": true,
    "ats-issues": true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Parse the match score percentage to a number
  const matchScorePercentage = Number.parseInt(
    analysis["Match Score"].replace("%", "")
  );

  // Determine score color based on percentage
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-amber-600";
    return "text-red-600";
  };

  // Determine progress color based on percentage
  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-600";
    if (score >= 60) return "bg-amber-600";
    return "bg-red-600";
  };

  // Determine badge color based on priority
  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-slate-100 text-slate-800 hover:bg-slate-100";
    }
  };
  // Make sure all sections are expanded for the PDF

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto" ref={reportRef}>
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">Resume Analysis Results</h1>
            <p className="text-slate-600">
              Detailed analysis of your resume against the job description. We
              don&apos;t save your data.{" "}
            </p>
          </div>

          {/* Match Score Card */}
          <Card className="mb-8 overflow-hidden border-0 shadow-lg">
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div>
                  <h2 className="text-xl font-medium mb-2">ATS Match Score</h2>
                  <p className="text-slate-300 text-sm max-w-lg">
                    How well your resume matches the job description
                    requirements
                  </p>
                </div>
                <div className="text-center">
                  <div
                    className={`text-5xl font-bold ${getScoreColor(
                      matchScorePercentage
                    )}`}
                  >
                    {analysis["Match Score"]}
                  </div>
                  <div className="text-sm text-slate-300 mt-1">Match Rate</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className={`${getProgressColor(
                      matchScorePercentage
                    )} h-2.5 rounded-full animate-out slide-in-from-right duration-1000`}
                    style={{ width: analysis["Match Score"] }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1 text-slate-400">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <p className="text-slate-700">{analysis.Explanation}</p>
            </CardContent>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="mb-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
              <TabsTrigger value="compatibility">ATS Compatibility</TabsTrigger>
              <TabsTrigger value="action-plan">Action Plan</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Key Strengths */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <CardTitle>Key Strengths</CardTitle>
                  </div>
                  <CardDescription>
                    Areas where your resume aligns well with the job
                    requirements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {analysis["Key Strengths"].map((strength, index) => (
                      <li key={index} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-slate-700">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Industry Context */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <CardTitle>Industry Context</CardTitle>
                  </div>
                  <CardDescription>
                    Relevant industry insights for your application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700">
                    {analysis["Industry Context"]}
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Improvements Tab */}
            <TabsContent value="improvements" className="space-y-6">
              {/* Missing Skills & Keywords */}
              <Collapsible
                open={openSections["missing-skills"]}
                onOpenChange={() => toggleSection("missing-skills")}
                className="w-full"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <CardTitle>Missing Skills & Keywords</CardTitle>
                      </div>
                      {openSections["missing-skills"] ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </CollapsibleTrigger>
                    <CardDescription>
                      Important skills and keywords that are missing from your
                      resume
                    </CardDescription>
                  </CardHeader>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {analysis["Missing Skills & Keywords"].map(
                          (skill, index) => (
                            <div
                              key={index}
                              className="border rounded-lg p-4 bg-white"
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-slate-900">
                                  {skill.keyword}
                                </h4>
                                <Badge
                                  className={getPriorityColor(skill.priority)}
                                >
                                  {skill.priority} Priority
                                </Badge>
                              </div>
                              <p className="text-slate-700 mb-3">
                                {skill.suggestion}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Content Enhancement Suggestions */}
              <Collapsible
                open={openSections["content-enhancements"]}
                onOpenChange={() => toggleSection("content-enhancements")}
                className="w-full"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                      <div className="flex items-center gap-2">
                        <ArrowUpRight className="h-5 w-5 text-blue-600" />
                        <CardTitle>Content Enhancement Suggestions</CardTitle>
                      </div>
                      {openSections["content-enhancements"] ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </CollapsibleTrigger>
                    <CardDescription>
                      Specific improvements to strengthen your resume content
                    </CardDescription>
                  </CardHeader>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {analysis["Content Enhancement Suggestions"].map(
                          (suggestion, index) => (
                            <div
                              key={index}
                              className="border rounded-lg overflow-hidden bg-white"
                            >
                              <div className="p-4 border-b bg-slate-50">
                                <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                  <span>Current Content</span>
                                </div>
                                <p className="mt-1 text-slate-700">
                                  {suggestion.before}
                                </p>
                              </div>
                              <div className="p-4 bg-green-50">
                                <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                                  <ArrowRight className="h-4 w-4" />
                                  <span>Suggested Improvement</span>
                                </div>
                                <p className="mt-1 text-slate-700">
                                  {suggestion.after}
                                </p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>

              {/* Section-by-Section Recommendations */}
              <Collapsible
                open={openSections["section-recommendations"]}
                onOpenChange={() => toggleSection("section-recommendations")}
                className="w-full"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                      <div className="flex items-center gap-2">
                        <FileEdit className="h-5 w-5 text-purple-600" />
                        <CardTitle>
                          Section-by-Section Recommendations
                        </CardTitle>
                      </div>
                      {openSections["section-recommendations"] ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </CollapsibleTrigger>
                    <CardDescription>
                      Targeted recommendations for each section of your resume
                    </CardDescription>
                  </CardHeader>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        {Object.entries(
                          analysis["Section-by-Section Recommendations"]
                        ).map(([section, recommendation], index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 bg-white"
                          >
                            <h4 className="font-medium text-slate-900 mb-2">
                              {section}
                            </h4>
                            <p className="text-slate-700">{recommendation}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </TabsContent>

            {/* ATS Compatibility Tab */}
            <TabsContent value="compatibility">
              <Collapsible
                open={openSections["ats-issues"]}
                onOpenChange={() => toggleSection("ats-issues")}
                className="w-full"
              >
                <Card>
                  <CardHeader className="pb-3">
                    <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                      <div className="flex items-center gap-2">
                        <FileWarning className="h-5 w-5 text-amber-600" />
                        <CardTitle>ATS Compatibility Issues</CardTitle>
                      </div>
                      {openSections["ats-issues"] ? (
                        <ChevronUp className="h-5 w-5" />
                      ) : (
                        <ChevronDown className="h-5 w-5" />
                      )}
                    </CollapsibleTrigger>
                    <CardDescription>
                      Formatting issues that may affect how your resume is
                      parsed by ATS
                    </CardDescription>
                  </CardHeader>
                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <ul className="space-y-3">
                        {analysis["ATS Compatibility Issues"].map(
                          (issue, index) => (
                            <li key={index} className="flex gap-3">
                              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                              <span className="text-slate-700">{issue}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </CardContent>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            </TabsContent>

            {/* Action Plan Tab */}
            <TabsContent value="action-plan">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <ListChecks className="h-5 w-5 text-blue-600" />
                    <CardTitle>Action Plan</CardTitle>
                  </div>
                  <CardDescription>
                    Prioritized steps to improve your resume
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysis["Action Plan"].map((action, index) => (
                      <div key={index} className="flex gap-4 items-start">
                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-medium text-sm">
                          {index + 1}
                        </div>
                        <div className="border-b pb-4 w-full">
                          <p className="text-slate-700">{action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Make A New Scan</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] text-center">
                <DialogTitle className="mb-4 text-orange-500">
                  All these data will be lost.Are you sure?
                </DialogTitle>
                <DialogFooter className="w-full flex justify-around">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button onClick={() => window.location.reload()}>
                    Make A New Scan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
