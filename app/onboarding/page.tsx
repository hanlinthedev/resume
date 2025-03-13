"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { completeOnboarding } from "./_actions";
function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

export default function Onboarding() {
  const [error, setError] = useState("");
  const { user } = useUser();
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      router.push("/resume");
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  return (
    <section className="w-full h-[80vh] flex flex-col gap-10  items-center justify-center">
      <h1 className="font-semibold text-4xl">Welcome To Resume</h1>
      <form
        action={handleSubmit}
        className="flex items-end  gap-4 bg-gray-100 min-w-[500px] shadow-lg p-4 rounded-md"
      >
        <div className="flex-4/5">
          <Label htmlFor="apiKey" className="mb-4">
            Gemini AI API Keys
          </Label>
          <p className="text-sm text-yellow-500 mb-1">
            Your API key is securely stored with us, encrypted for your
            protection.
          </p>
          <Input
            placeholder="API Key"
            type="text"
            name="apiKey"
            className="border border-black"
            required
          />
        </div>

        {error && <p className="text-red-600">Error: {error}</p>}
        <Submit />
      </form>
    </section>
  );
}
