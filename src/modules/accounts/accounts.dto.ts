import { IsNotEmpty, IsInt, IsEnum, IsOptional } from "class-validator";

enum EnumGender {
	Male = "Male",
	Femail = "Famale",
}

interface User {
	id: number;
	accountNo: string;
	avatarImage: string;
	firstName: string;
	middleName?: string;
	lastName: string;
	gender: EnumGender;
	contactNo: string;
	address: string;
	birthdate: string;
	email: string;
	username: string;
	password: string;
	userTypeId: number;
}

export class UserDto implements Partial<User> {
	@IsNotEmpty()
	firstName: string;

	@IsOptional()
	middleName: string;

	@IsNotEmpty()
	lastName: string;

	@IsNotEmpty()
	@IsEnum(EnumGender)
	gender: EnumGender;

	@IsNotEmpty()
	contactNo: string;

	@IsNotEmpty()
	address: string;

	@IsNotEmpty()
	birthdate: string;

	@IsNotEmpty()
	email: string;

	@IsNotEmpty()
	username: string;

	@IsNotEmpty()
	password: string;

	@IsNotEmpty()
	@IsInt()
	userTypeId: number;
}
