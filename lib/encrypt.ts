import { createCipheriv, createDecipheriv } from "crypto";

const secretKey: Buffer = Buffer.from(process.env.SECRET_KEY!, "base64"); // Generate a 256-bit key

const iv: Buffer = Buffer.from(process.env.IV!, "base64"); // Initialization Vector (IV)

interface EncryptedData {
	encryptedData: string;
	iv: string;
}

// Encrypt the token
export function encrypt(text: string): EncryptedData {
	const cipher = createCipheriv("aes-256-cbc", secretKey, iv);
	let encrypted = cipher.update(text, "utf8", "hex");
	encrypted += cipher.final("hex");
	return { encryptedData: encrypted, iv: iv.toString("hex") };
}

// Decrypt the token
export function decrypt(encryptedData: string, ivHex: string): string {
	const decipher = createDecipheriv(
		"aes-256-cbc",
		secretKey,
		Buffer.from(ivHex, "hex")
	);
	let decrypted = decipher.update(encryptedData, "hex", "utf8");
	decrypted += decipher.final("utf8");
	return decrypted;
}
