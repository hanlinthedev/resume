export {};

declare global {
	interface CustomJwtSessionClaims {
		metadata: {
			onboardingComplete?: boolean;
			apiKey?: {
				encryptedData: string;
				iv: string;
			};
		};
	}
}
