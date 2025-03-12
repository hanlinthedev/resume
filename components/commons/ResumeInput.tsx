"use client";

const ResumeInput = ({
  file,
  handleFileChange,
}: {
  file: File | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg mb-4">
        <input
          type="file"
          id="resume"
          className="hidden"
          name="resume"
          required
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
        />
        <label
          htmlFor="resume"
          className="cursor-pointer text-center text-gray-500 hover:text-gray-700"
        >
          <div className="flex flex-col items-center">
            <svg
              className="w-12 h-12 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500">PDF, DOC, or DOCX (Max 5MB)</p>
          </div>
        </label>
      </div>
      <div className="text-center text-sm text-gray-500 mb-4">
        {file ? file.name : "No file chosen"}
      </div>
    </>
  );
};

export default ResumeInput;
