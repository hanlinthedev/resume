import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	experimental: {
		serverActions: {
			bodySizeLimit: "10mb",
		},
	},
	env: {
		SECRET_KEY: process.env.SECRET_KEY,
		IV: process.env.IV,
	},
};

export default nextConfig;
