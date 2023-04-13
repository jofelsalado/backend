import { IsNotEmpty, IsInt } from "class-validator";

interface Product {
	id: number;
	sku: string;
	name: string;
	description: string;
	type: string;
	quotation: string;
	status: string;
	adviserId: number;
	createdAt: Date;
	updatedAt: Date;
}

export class ProductDto implements Partial<Product> {
	@IsNotEmpty()
	sku: string;

	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	description: string;

	@IsNotEmpty()
	type: string;

	@IsNotEmpty()
	quotation: string;

	@IsNotEmpty()
	status: string;

	@IsNotEmpty()
	@IsInt()
	adviserId: number;
}