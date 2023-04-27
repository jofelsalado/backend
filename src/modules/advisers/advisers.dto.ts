import { IsNotEmpty, IsInt } from "class-validator";

interface Adviser {
	rating: string;
	expertise: string;
	company: string;
	credentialLink: string;
	userId: number;
}

interface Consultation {
	company: string;
	meetingType: string;
	type: string;
	fee: string;
	remarks: string;
	consultationDate: string;
	productId: number;
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

export class ConsultationDto implements Partial<Consultation> {
	@IsNotEmpty()
	company: string;

	@IsNotEmpty()
	meetingType: string;

	@IsNotEmpty()
	type: string;

	@IsNotEmpty()
	fee: string;

	@IsNotEmpty()
	remarks: string;

	@IsNotEmpty()
	consultationDate: string;

	@IsNotEmpty()
	@IsInt()
	adviserId: number;

	@IsNotEmpty()
	@IsInt()
	productId: number;
}
