import { SelectPaginateProps } from "@components/selectPaginate";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

type CustomFormProps = {
	form: UseFormReturn<any>;
	schema?: object | null;
	onsubmit: () => void;
	handleClickNext?: () => void;
	loading?: boolean;
	leftSideButtonIcon?: ReactNode;
	rigthSideButtonIcon?: ReactNode;
	buttonLabel?: string;
	styleButton?: string;
	styleButtonDiv?: string;
	styleForm?: string;
	inputs?: Inputs;
	hasMoreButtons?: {
		label: string;
		styleButton?: string;
		onClick: (data: any) => void;
		type: "button" | "reset" | "submit";
		ref: HTMLButtonElement | null;
	}[];
	strengthPassword?:
	| ""
	| "Senha fraca"
	| "Senha média"
	| "Senha forte"
	| undefined;
};

type Inputs = {
	label: string;
	type?: string;
	name: string;
	placeholder?: string;
	mask?: "cpf" | "cnpj" | "phone" | "date" | "currency" | "HH:MM" | "MM" | "number";
	options?: { label: string; value: string }[] | null;
	radio?: { label: string; value: string }[] | null;
	disabled?: boolean | null;
	id?: string | undefined;
	manyCheckboxes?: {
		id: string;
		label: string;
		options: Options[];
	}[];
	styleDiv?: string;
	styleFormItem?: string;
	styleInput?: string;
	styleInputLabel?: string;
	radioStyleDiv?: string;
	minValueDate?: string;
	minInputNumber?: number;
	maxInputNumber?: number;
	selectPaginate?: SelectPaginateProps;
	switchLabel?: string;
	checked?: boolean;
	onCheckedChange?: () => void;
}[];

type Options = {
	value: string;
	label: string;
};

export type { CustomFormProps, Inputs, Options };
