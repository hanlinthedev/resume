import TooltipComponent from "@/components/commons/TooltipComponent";
import { Toaster } from "@/components/ui/sonner";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { FileUser, ListTodo } from "lucide-react";
import Link from "next/link";

export default async function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-screen">
      <aside className="w-20 bg-gray-50 h-screen flex flex-col justify-start items-center py-4 gap-4">
        <SignedIn>
          <UserButton
            userProfileUrl="/user-profile"
            userProfileMode="navigation"
          />
        </SignedIn>

        <TooltipComponent content="Rate My Resume">
          <Link
            href="/resume"
            className="flex w-10 h-10 flex-col justify-center items-center gap-1 shadow rounded-full bg-gray-200"
          >
            <FileUser size={16} />
          </Link>
        </TooltipComponent>
        <TooltipComponent content="Resume Scanner">
          <Link
            href="/resume/scanner"
            className="flex w-10 h-10 flex-col justify-center items-center gap-1 shadow rounded-full bg-gray-200"
          >
            <ListTodo size={16} />
          </Link>
        </TooltipComponent>
      </aside>
      {children}
      <Toaster />
    </section>
  );
}
