import { formSchema } from "@components/filter/formSchema";
import { SelectPaginateProps } from "@components/selectPaginate";
import { dataCallbackFilter } from "@components/types/dataCallback";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

export type FilterProps = {
	variant:
	| "default"
	| "destructive"
	| "outline"
	| "secondary"
	| "ghost"
	| "link"
	| null
	| undefined;
	style?: { height?: string; width?: string; position?: string };
	dataInicial?: {
		label?: string;
		defaultValues?: string;
	};
	dataFinal?: {
		label?: string;
		defaultValues?: string;
	};
	selectPaginate?: SelectPaginateProps[];
	contentGroupItems?: {
		label: string;
		defaultValues?: string;
		data: { value: string; label: string }[];
	}[];
	clickFilter: (data: dataCallbackFilter) => void;
	handleIsOpen?: () => void;
	contentGroupSelect?: {
		label: string;
		defaultValues?: string;
		onChangeValue?: (value: string) => void;
		data: { id: string; label: string }[];
	}[];
	contentGroupCheckbox?: {
		label: string;
		defaultValues?: string[];
		data: { value: string; label: string }[];
	}[];
	contentGroupInput?: {
		label: string;
		defaultValues?: string;
	}[];
};

function useFilterPopover({
	dataInicial,
	dataFinal,
	contentGroupItems,
	selectPaginate,
	contentGroupSelect,
	contentGroupCheckbox,
	contentGroupInput,
}: FilterProps) {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			selectPaginate: [],
			itemsOfSelect: [],
			radioGroupSelect: [],
			checkBoxGroupSelect: [],
			inputGroup: [],
			dataInicial: dataInicial?.defaultValues,
			dataFinal: dataFinal?.defaultValues,
		},
	});
	const refAnchor = useRef(false);

	const { append: appendSelectPaginateGroup } = useFieldArray({
		control: form.control,
		name: "selectPaginate",
	});

	const { append: appendListSelectGroup } = useFieldArray({
		control: form.control,
		name: "itemsOfSelect",
	});

	const { append: appendListRadioGroup } = useFieldArray({
		control: form.control,
		name: "radioGroupSelect",
	});

	const { append: appendListCheckbox } = useFieldArray({
		control: form.control,
		name: "checkBoxGroupSelect",
	});

	const { append: appendInputGroup } = useFieldArray({
		control: form.control,
		name: "inputGroup",
	});

	function appendSelectPaginate(label: string, value: string) {
		appendSelectPaginateGroup({
			label,
			value,
		});
	}

	function appendSelect(label: string, id: string) {
		appendListSelectGroup({
			label,
			id,
		});
	}

	function appendRadioGroup(label: string, value: string) {
		appendListRadioGroup({
			label,
			value,
		});
	}

	function appendCheckBox(label: string, value: string[]) {
		appendListCheckbox({
			label,
			value,
		});
	}

	function appendOInputGroup(label: string, value: string) {
		appendInputGroup({
			label,
			value,
		});
	}

	useEffect(() => {
		if (refAnchor.current) return;
		selectPaginate?.forEach((item) => {
			appendSelectPaginate(
				item.label,
				item.selectedValue ? item.selectedValue : "",
			);
		});
		contentGroupSelect?.forEach((item) => {
			appendSelect(item.label, item.defaultValues ? item.defaultValues : "");
		});
		contentGroupItems?.forEach((item) => {
			appendRadioGroup(
				item.label,
				item.defaultValues ? item.defaultValues : ""
			);
		});
		contentGroupCheckbox?.forEach((item) => {
			appendCheckBox(item.label, item.defaultValues ? item.defaultValues : []);
		});
		contentGroupInput?.forEach((item) => {
			appendOInputGroup(
				item.label,
				item.defaultValues ? item.defaultValues : ""
			);
		});
		refAnchor.current = true;
	}, []);

	useEffect(() => {
		function resetValueContentGroupSelect() {
			if (!contentGroupSelect) return;
			contentGroupSelect.forEach((element, index) => {
				if (!element.defaultValues) return;
				const hasIdInElement = element.data.find(
					(itemData) => itemData.id === element.defaultValues
				);
				if (hasIdInElement) {
					form.setValue(`itemsOfSelect.${index}.id`, element.defaultValues!);
					return;
				}
				form.setValue(`itemsOfSelect.${index}.id`, "");
			});
		}
		resetValueContentGroupSelect();

		function resetValueSelectPaginate() {
			if (!selectPaginate) return;
			selectPaginate.forEach((element, index) => {
				if (!element.selectedValue) return;
				const hasIdInElement = element.options.find(
					(itemData) => itemData.label === element.inputValue
				);
				if (hasIdInElement) {
					form.setValue(`selectPaginate.${index}.value`, element.selectedValue!);
					return;
				}
				form.setValue(`selectPaginate.${index}.value`, "");
			})
		}
		resetValueSelectPaginate();
	}, [contentGroupSelect, selectPaginate]);

	return {
		form,
		dataInicial,
		dataFinal,
		selectPaginate,
		contentGroupItems,
		contentGroupSelect,
		contentGroupCheckbox,
		contentGroupInput,
	};
}
export { useFilterPopover };
