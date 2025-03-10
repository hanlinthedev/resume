import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const Header = () => {
	return (
		<SignedOut>
			<header className="flex justify-end items-center p-4 gap-4 h-16 dark:bg-gray-900">
				<Button asChild>
					<SignInButton />
				</Button>

				<Button asChild>
					<SignUpButton />
				</Button>
			</header>
		</SignedOut>
	);
};

export default Header;
