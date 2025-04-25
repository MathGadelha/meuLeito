import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { RefCallback, useRef, useState } from "react";
import { MdClear } from "react-icons/md";

export type SelectPaginateProps = {
	infinityScrollEnabled?: boolean;
	placeholder: string;
	label: string;
	inputValue: string;
	disabled?: boolean;
	onChangeSelect?: (value: string) => void;
	onInputValueChange: (value: string) => void;
	options: OptionSelectPaginate[];
	selectedValue?: string;
	setSelecionadoSelect?: (item: OptionSelectPaginate | null) => void;
	includeSearch?: boolean;
	clearInput?: () => void;
	readOnly?: boolean;
	observerElementRef?: RefCallback<HTMLElement>;
};

export type OptionSelectPaginate = {
	value: string;
	highlightedLabel?: string;
	label: string;
};

const SelectPaginate = ({
	label,
	placeholder,
	disabled,
	inputValue,
	onInputValueChange,
	options = [],
	onChangeSelect,
	setSelecionadoSelect,
	includeSearch = false,
	clearInput,
	readOnly,
	observerElementRef,
}: SelectPaginateProps) => {
	const [selectValue, setSelectValue] = useState<OptionSelectPaginate | null>(
		null
	);

	const controllerRef = useRef<HTMLUListElement | null>(null);
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	function handleSelectoptionData(item: OptionSelectPaginate) {
		setSelectValue(item);
		onInputValueChange(item.label);
		if (onChangeSelect) {
			onChangeSelect(item.value);
		}
		if (setSelecionadoSelect) {
			setSelecionadoSelect(item);
		}
	}

	function returnedList() {
		if (inputValue.length === 0 || !includeSearch) {
			return options;
		}

		const parsedInputValue = inputValue.toLocaleLowerCase();
		return options.filter((dado) =>
			dado.label.toLocaleLowerCase().includes(parsedInputValue)
		);
	}

	function keyUp(event: React.KeyboardEvent<HTMLInputElement>) {
		if (returnedList().length > 0 && event.key === "Enter") {
			onInputValueChange(returnedList()[0].label);
		}
	}

	function handleClickClearInput() {
		if (clearInput) {
			clearInput();
		}
		onInputValueChange("");
	}

	return (
		<div className="w-full relative" ref={wrapperRef}>
			{label && <Label htmlFor={label}>{label}</Label>}
			<div className="relative flex flex-col">
				<Input
					id={label}
					autoComplete="off"
					name="search"
					placeholder={placeholder}
					className="mt-2"
					value={inputValue}
					disabled={disabled ? true : false}
					onChange={(e) => {
						setSelectValue(null);
						if (setSelecionadoSelect) setSelecionadoSelect(null);
						onInputValueChange(e.target.value);
					}}
					onKeyUp={keyUp}
					readOnly={readOnly}
				/>
				<div
					className="absolute right-4 top-5 cursor-pointer bg-white rounded-lg"
					onClick={handleClickClearInput}
				>
					<MdClear size={18} />
				</div>
			</div>
			{!selectValue && options?.length > 0 && (
				<ul
					className="max-h-40 overflow-auto mt-2 p-2 shadow-md border z-10 rounded-md absolute w-full bg-white"
					ref={controllerRef}
					id="select_controller"
				>
					{returnedList().length > 0 &&
						returnedList().map((item, index) => (
							<li
								key={index}
								className="flex items-center justify-between py-2 px-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
								onClick={() => handleSelectoptionData(item)}
								ref={observerElementRef}
							>
								<div className="flex items-center gap-3 text-sm">
									{item.highlightedLabel && (
										<span className="text-gray-600 border-b-2 border-blue-300">
											{item.highlightedLabel}
										</span>
									)}
									<div className="flex flex-col">
										<span className="text-gray-600">{item.label}</span>
									</div>
								</div>
							</li>
						))}
				</ul>
			)}
		</div>
	);
};

export { SelectPaginate };
