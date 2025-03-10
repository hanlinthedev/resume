"use server";

import { encrypt } from "@/lib/encrypt";
import { auth, clerkClient } from "@clerk/nextjs/server";

export const completeOnboarding = async (formData: FormData) => {
	const { userId } = await auth();

	if (!userId) {
		return { message: "No Logged In User" };
	}

	const client = await clerkClient();

	const apiKey = formData.get("apiKey") as string;
	const encryptedApiKey = encrypt(apiKey);
	try {
		const res = await client.users.updateUser(userId, {
			publicMetadata: {
				onboardingComplete: true,
				apiKey: encryptedApiKey,
			},
		});
		return { message: res.publicMetadata };
	} catch (err) {
		console.log(err);
		return { error: "There was an error updating the user metadata." };
	}
};
