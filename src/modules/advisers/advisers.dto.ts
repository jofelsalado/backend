import { IsNotEmpty, IsInt } from "class-validator";

interface Adviser {
	rating: string;
	expertise: string;
	company: string;
	credentialLink: string;
	userId: number;
}

export class AdviserDto implements Partial<Adviser> {
	@IsNotEmpty()
	@IsInt()
	userId: number;

	@IsNotEmpty()
	rating: string;

	@IsNotEmpty()
	expertise: string;

	@IsNotEmpty()
	company: string;

	@IsNotEmpty()
	credentialLink: string;
}
