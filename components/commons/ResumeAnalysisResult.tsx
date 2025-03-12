import { CircleAlert, OctagonAlert } from "lucide-react";

export interface ResumeAnalysis {
  overall_impression: string;
  rating: number;
  strengths: string[];
  areas_for_improvement: string[];
  specific_suggestions: string[];
  example_projects_improvement: {
    project: string;
    changes: { original: string; improved: string }[];
  }[];
}
function isErrorResponse(
  analysis: ResumeAnalysis | { error: string }
): analysis is { error: string } {
  return "error" in analysis;
}

export default function ResumeAnalysisResult({
  analysis,
}: {
  analysis: ResumeAnalysis | { error: string };
}) {
  console.log(isErrorResponse(analysis));
  if (isErrorResponse(analysis)) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <OctagonAlert className="h-12 w-12 text-red-500  mb-4" />
        <p className="text-lg font-medium text-gray-700">
          An Error Occured! Upload and Try Again!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-out fade-left duration-700">
      <div>
        <span className="text-amber-500 flex items-center gap-2 text-sm">
          <CircleAlert size={14} /> We don&apos;t save your data
        </span>
        <h2 className="text-2xl font-bold mb-2">Resume Analysis</h2>
        <div className="flex items-center mb-4">
          <div className="text-3xl font-bold text-blue-600 mr-2">
            {analysis.rating}/10
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full animate-out slide-in-from-right duration-1000"
              style={{ width: `${(analysis.rating / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        <p className="text-gray-700">{analysis.overall_impression}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-green-600 mb-2">Strengths</h3>
        <ul className="list-disc pl-5 space-y-1">
          {analysis.strengths.map((strength, index) => (
            <li
              key={`strength-${index}`}
              className="text-gray-700 animate-out fade-left slide-in-from-right duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {strength}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-amber-600 mb-2">
          Areas for Improvement
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          {analysis.areas_for_improvement.map((area, index) => (
            <li
              key={`area-${index}`}
              className="text-gray-700 animate-out fade-left slide-in-from-right duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {area}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-blue-600 mb-2">
          Specific Suggestions
        </h3>
        <ul className="list-disc pl-5 space-y-1">
          {analysis.specific_suggestions.map((suggestion, index) => (
            <li
              key={`suggestion-${index}`}
              className="text-gray-700 animate-out fade-left slide-in-from-right duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {analysis.example_projects_improvement.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-purple-600 mb-2">
            Project Improvement Suggestions
          </h3>
          <div className="space-y-3">
            {analysis.example_projects_improvement.map((project, index) => (
              <div
                key={`project-${index}`}
                className="bg-gray-50 p-3 rounded-lg animate-out fade-left slide-in-from-bottom duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <h4 className="font-medium text-gray-800 mb-1">
                  {project.project}
                </h4>
                {project.changes.length > 0 ? (
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {project.changes.map((change, changeIndex) => (
                      <div key={`change-${index}-${changeIndex}`}>
                        <li>
                          <span className="text-yellow-600 font-semibold">
                            Original
                          </span>{" "}
                          - {change.original}
                        </li>
                        <li>
                          <span className="text-green-600 font-semibold">
                            Improved
                          </span>{" "}
                          - {change.improved}
                        </li>
                        <br />
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">
                    No specific changes suggested
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
