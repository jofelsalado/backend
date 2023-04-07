import bcrypt from "bcrypt";

export const hashPassword = (password: string): string => {
	return password;
};

export const verifyPassword = (rawPassword: string, hashedPassword: string): boolean => {
	return false;
};
