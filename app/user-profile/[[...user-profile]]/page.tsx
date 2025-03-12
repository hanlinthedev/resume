"use client";

import { completeOnboarding } from "@/app/onboarding/_actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { decrypt } from "@/lib/encrypt";
import { UserProfile, useUser } from "@clerk/nextjs";
import { CircleArrowLeft, KeySquare } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Updating..." : "Update"}
    </Button>
  );
}
const UserProfilePage = () => {
  const { user } = useUser();
  const [error, setError] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleSubmit = async (formData: FormData) => {
    const res = await completeOnboarding(formData);
    if (res?.message) {
      // Reloads the user's data from the Clerk API
      await user?.reload();
      router.push(pathname);
    }
    if (res?.error) {
      setError(res?.error);
    }
  };
  const key = user
    ? (user.publicMetadata.apiKey as { encryptedData: string; iv: string })
    : null;

  const apiKey = key ? decrypt(key.encryptedData, key.iv) : "";

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-4 backdrop-blur-2xl backdrop:shadow-2xl relative">
      <div className="flex gap-4">
        <CircleArrowLeft
          onClick={() => router.replace("/resume")}
          className="w-full  "
          size={32}
        />

        <UserProfile path="/user-profile" routing="path">
          {/* You can also pass the content as direct children */}
          <UserProfile.Page
            label="Token"
            labelIcon={<KeySquare size="sm" />}
            url="token"
          >
            <form action={handleSubmit} className="flex items-end gap-4">
              <div className="flex flex-col gap-2 flex-5/6">
                <Label className="mb-4" htmlFor="apiKey">
                  API Key
                </Label>
                <Input
                  placeholder="API Key"
                  defaultValue={isEdit ? apiKey : "****************"}
                  type="text"
                  name="apiKey"
                  className="border border-black"
                  required
                  readOnly={!isEdit}
                />
                {error && <p className="text-red-600">Error: {error}</p>}
              </div>
              <div className="flex-1/6 flex gap-2">
                {isEdit ? (
                  <>
                    <Button type="button" onClick={() => setIsEdit(false)}>
                      Cancel
                    </Button>
                    <Submit />
                  </>
                ) : (
                  <Button
                    className="w-full"
                    type="button"
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Button>
                )}
              </div>
            </form>
          </UserProfile.Page>
        </UserProfile>
      </div>
    </div>
  );
};
export default UserProfilePage;
