import { OptionSelectPaginate } from "@components/selectPaginate";

type dataCallbackFilter = {
	selectPaginate?: OptionSelectPaginate[];
	itemsOfSelect?: {
		label: string;
		id: string;
	}[];
	radioGroupSelect?: {
		label: string;
		value: string;
	}[];
	checkBoxGroupSelect?: {
		label: string;
		value: string[];
	}[];
	inputGroup?: {
		label: string;
		value: string;
	}[];
	dataInicial?: string | undefined;
	dataFinal?: string | undefined;
};
export type { dataCallbackFilter };
