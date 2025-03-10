"use client";
import ResumeInput from "@/components/commons/ResumeInput";
import { Button } from "@/components/ui/button";
import { checkResume } from "./_actions";

export default function Resume() {
	return (
		<div className="w-full p-8 flex justify-center">
			<div className="w-1/2">
				<form className="w-full" action={checkResume}>
					<ResumeInput />
					<Button className="w-full mt-4 bg-blue-400 hover:bg-blue-500">
						Let AI Check
					</Button>
				</form>
			</div>
		</div>
	);
}
