import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";

interface ValidateDTO {
	isError: boolean;
	errors: Array<{
		field: string;
		errors: Array<string>;
	}>;
}

export const validateDTO = async <T extends ClassConstructor<any>>(
	dto: T,
	obj: object
) => {
	const instance = plainToClass(dto, obj);
	const errors = await validate(instance);

	if (errors.length > 0) {
		return {
			isError: true,
			errors: errors.map((err: any) => ({
				field: err.property,
				errors: err.constraints,
			})),
		};
	}

	return {
		isError: false,
		errors: null,
	};
};
