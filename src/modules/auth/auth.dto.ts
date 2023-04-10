import { IsEmail, IsNotEmpty, IsString } from "class-validator";

interface Credentials {
	email: string;
	password: string;
}

export class CredentialsDTO implements Credentials {
	@IsNotEmpty({
		message: "E-mail field is required",
	})
	email: string;

	@IsNotEmpty({
		message: "Password field is required",
	})
	password: string;
}
