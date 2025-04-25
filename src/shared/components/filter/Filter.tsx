import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { RadioGroup, RadioGroupItem } from "@components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { BsFilter } from "react-icons/bs";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import { FilterProps, useFilterPopover } from "../../hooks/useFilterPopover";
import { SelectPaginate } from "@components/selectPaginate";

const FilterPopover = (data: FilterProps) => {
	const {
		form,
		dataInicial,
		dataFinal,
		selectPaginate,
		contentGroupItems,
		contentGroupSelect,
		contentGroupCheckbox,
		contentGroupInput,
	} = useFilterPopover(data);
	return (
		<Popover onOpenChange={data.handleIsOpen}>
			<PopoverTrigger
				asChild
			>
				<Button
					variant={data.variant}
					size="sm"
					className={cn(`font-semibold rounded-xl cursor-pointer w-1/2`, data.style?.width ? data.style.width : "w-44", data.style?.height ? data.style.height : "h-10")}
				>
					<BsFilter size={20} />
					<span>Filtrar</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent side="bottom" className="rounded-3xl mr-3">
				<Form {...form}>
					<form
						className="w-full space-y-2 p-2"
						onSubmit={form.handleSubmit(data.clickFilter)}
					>
						<div>
							<h1 className="font-semibold text-xl">Filtros</h1>
							{dataInicial && (
								<FormField
									control={form.control}
									name="dataInicial"
									defaultValue={dataInicial.defaultValues}
									render={({ field }) => (
										<FormItem className="space-y-0 my-2">
											<FormLabel>
												{dataInicial.label ? dataInicial.label : "Data Inicial:"}
											</FormLabel>
											<FormControl>
												<Input type="date" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{dataFinal && (
								<FormField
									control={form.control}
									name="dataFinal"
									defaultValue={dataFinal.defaultValues}
									render={({ field }) => (
										<FormItem className="space-y-0 my-2">
											<FormLabel>
												Data Final:
											</FormLabel>
											<FormControl>
												<Input type="date" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							)}
							{selectPaginate &&
								selectPaginate.length > 0 &&
								selectPaginate.map((item, index) => {
									return (
										<FormField
											key={item.label}
											control={form.control}
											name={`selectPaginate.${index}.value`}
											render={({ field }) => (
												<FormItem className="space-y-0 my-2">
													<SelectPaginate
														{...field}
														inputValue={item!.inputValue}
														label={item!.label}
														onInputValueChange={
															item!.onInputValueChange
														}
														options={item!.options}
														placeholder={item!.placeholder}
														clearInput={item?.clearInput}
														includeSearch={item?.includeSearch}
														infinityScrollEnabled={
															item?.infinityScrollEnabled
														}
														observerElementRef={
															item?.observerElementRef
														}
														onChangeSelect={item?.onChangeSelect}
														readOnly={item?.readOnly}
														setSelecionadoSelect={
															item?.setSelecionadoSelect
														}
													/>
													<FormMessage />
												</FormItem>
											)}
										/>

									)
								})
							}
							{contentGroupItems &&
								contentGroupItems.length > 0 &&
								contentGroupItems.map((item, index) => {
									return (
										<div className="flex flex-col gap-2 mt-2" key={index}>
											<FormField
												key={item.label}
												control={form.control}
												name={`radioGroupSelect.${index}.value`}
												render={({ field }) => (
													<FormItem key={index} className="space-y-2 my-2">
														<FormLabel className="font-semibold">
															{item?.label}:
														</FormLabel>
														{contentGroupItems &&
															contentGroupItems.map((item) => {
																return (
																	<RadioGroup
																		key={item.label}
																		onValueChange={field.onChange}
																		defaultValue={item.defaultValues}
																		className="flex flex-row space-x-3 items-center"
																	>
																		{item?.data.map(({ value, label }) => {
																			return (
																				<div
																					key={value}
																					className="flex items-center gap-2"
																				>
																					<RadioGroupItem value={value} />
																					<Label>{label}</Label>
																				</div>
																			);
																		})}
																	</RadioGroup>
																);
															})}
													</FormItem>
												)}
											/>
										</div>
									);
								})}
							{contentGroupSelect &&
								contentGroupSelect.length > 0 &&
								contentGroupSelect.map((item, index) => {
									return (
										<div className="flex flex-col gap-2" key={index}>
											<FormField
												control={form.control}
												name={`itemsOfSelect.${index}.id`}
												defaultValue={item.defaultValues}
												render={({ field }) => (
													<FormItem key={index}>
														<FormLabel>
															{item?.label}:
														</FormLabel>
														<Select
															defaultValue={item.defaultValues}
															value={field.value}
															onValueChange={(e) => {
																field.onChange(e);
																if (item.onChangeValue) {
																	item.onChangeValue(e);
																}
															}}
														>
															<FormControl>
																<SelectTrigger>
																	<SelectValue placeholder="Selecione uma especialidade" />
																</SelectTrigger>
															</FormControl>
															<SelectContent className="max-h-64 overscroll-contain">
																<SelectGroup>
																	{item?.data.map(({ id, label }) => {
																		return (
																			<SelectItem
																				key={id}
																				value={id.toString()}
																			>
																				{label}
																			</SelectItem>
																		);
																	})}
																</SelectGroup>
															</SelectContent>
														</Select>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									);
								})}
							{contentGroupCheckbox &&
								contentGroupCheckbox.length > 0 &&
								contentGroupCheckbox.map((item, index) => {
									return (
										<div
											className="flex flex-col gap-2 mt-2 mb-2"
											key={item.label}
										>
											<FormLabel>
												{item.label}:
											</FormLabel>
											<FormField
												key={index}
												control={form.control}
												name={`checkBoxGroupSelect.${index}.value`}
												render={() => (
													<FormItem>
														{item.data.map((checkBoxItem) => (
															<FormField
																key={checkBoxItem.value}
																control={form.control}
																name={`checkBoxGroupSelect.${index}.value`}
																render={({ field }) => (
																	<FormItem className="flex flex-row items-start space-x-2 space-y-1">
																		<FormControl>
																			<Checkbox
																				checked={field.value.includes(
																					checkBoxItem.value
																				)}
																				onCheckedChange={(checked) => {
																					return checked
																						? field.onChange([
																							...field.value,
																							checkBoxItem.value,
																						])
																						: field.onChange(
																							field.value?.filter(
																								(value) =>
																									value !== checkBoxItem.value
																							)
																						);
																				}}
																			/>
																		</FormControl>
																		<FormLabel className="font-normal">
																			{checkBoxItem.label}
																		</FormLabel>
																	</FormItem>
																)}
															/>
														))}
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									);
								})}
							{contentGroupInput &&
								contentGroupInput.length > 0 &&
								contentGroupInput.map((item, index) => {
									return (
										<div className="flex flex-col gap-2 mt-2" key={item.label}>
											<FormField
												control={form.control}
												name={`inputGroup.${index}.value`}
												render={({ field }) => (
													<FormItem className="flex gap-2 flex-col items-start space-y-0">
														<FormLabel>
															{item?.label}:
														</FormLabel>
														<FormControl>
															<Input type="text" {...field} />
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									);
								})}
						</div>
						<Button variant={data.variant} type="submit" className="w-full">
							Filtrar
						</Button>
					</form>
				</Form>
			</PopoverContent>
		</Popover>
	);
};

export { FilterPopover };
