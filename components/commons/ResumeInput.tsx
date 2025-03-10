"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ResumeInput = () => {
	const [fileName, setFileName] = useState<string>("");
	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFileName(e.target.files![0].name);
	};
	return (
		<div className="w-full h-96 relative">
			<Label
				className=" mb-2 text-3xl font-medium text-gray-900 dark:text-white absolute w-full h-full top-0 left-0 z-0 rounded-lg flex items-center justify-center border border-double border-blue-400 outline-1 outline-blue-400 -outline-offset-4  text-center bg-accent"
				htmlFor="resume"
			>
				{fileName ? fileName : "Upload Your Resume Here"}
			</Label>
			<Input
				type="file"
				name="resume"
				onChange={handleFileChange}
				className="w-full h-full absolute opacity-0 top-0 z-1 file:border-0 file:bg-transparent file:text-sm file:font-medium"
			/>
		</div>
	);
};

export default ResumeInput;
