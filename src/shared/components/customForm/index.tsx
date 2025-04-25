import { SelectPaginate } from "@components/selectPaginate";
import { Button } from "@components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { cn } from "@components/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@components/ui/select";
import { Switch } from "@components/ui/switch";
import { Textarea } from "@components/ui/textarea";
import { CustomFormProps } from "@customTypes/customFormProps";
import { treatsText } from "@utils/filter";
import { useState } from "react";
import { RxTextAlignBottom } from "react-icons/rx";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { maskProps } from "@shared/utils/masks";
import { Checkbox } from "@components/ui/checkbox";

const CustomForm = ({
	form,
	onsubmit,
	loading,
	inputs,
	styleForm,
	styleButton,
	styleButtonDiv,
	leftSideButtonIcon,
	rigthSideButtonIcon,
	buttonLabel,
	hasMoreButtons,
	strengthPassword,
}: CustomFormProps) => {
	const [passwordIsVisible, setPasswordIsVisible] = useState(false);

	return (
		<div className="w-full">
			<Form {...form}>
				<form
					className={cn("grid grid-cols-12 gap-2", styleForm)}
					onSubmit={onsubmit}
				>
					{inputs?.map((input, index) => (
						<div className={cn("col-span-4", input.styleDiv)} key={index}>
							<FormField
								control={form.control}
								name={input.name}
								render={({ field }) => (
									<FormItem className={cn("w-full", input.styleFormItem)}>
										{input.type === "select" && input.options ? (
											<>
												<FormLabel
													className={cn("mb-4", input.styleInputLabel)}
												>
													{input.label}
												</FormLabel>
												<Select
													onValueChange={field.onChange}
													defaultValue={field.value}
													value={field.value}
													disabled={input.disabled ? true : false}
												>
													<FormControl>
														<SelectTrigger
															className="w-full cursor-pointer"
															data-testid={input.id}
														>
															<SelectValue placeholder={input.placeholder ? input.placeholder : "Escolha uma opção"} />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{input.options.length > 0 && (
															<SelectGroup className="cursor-pointer">
																<SelectLabel className="relative w-full">
																	{input.options.length > 5 && (
																		<span>
																			<RxTextAlignBottom
																				size={20}
																				className="absolute right-3 z-40"
																			/>
																		</span>
																	)}
																</SelectLabel>
																{input.options.map((option, index) => (
																	<SelectItem
																		className="cursor-pointer"
																		key={index}
																		value={option.value}
																	>
																		{treatsText(option.label)}
																	</SelectItem>
																))}
															</SelectGroup>
														)}
													</SelectContent>
												</Select>
												<FormMessage />
											</>
										) : input.type === "checkbox" && input.options ? (
											<FormField
												key={input.name}
												control={form.control}
												name={input.name}
												render={() => (
													<FormItem>
														{input.options &&
															input.options.map((option, index) => (
																<FormField
																	key={index}
																	control={form.control}
																	name={input.name}
																	render={({ field }) => {
																		return (
																			<FormItem
																				key={index}
																				className="flex flex-row items-start space-x-3 space-y-0"
																			>
																				<FormControl>
																					<Checkbox
																						className="w-6 h-6"
																						checked={field.value.includes(
																							option.value
																						)}
																						onCheckedChange={(checked) => {
																							return checked
																								? field.onChange([
																										...field.value,
																										option.value,
																								  ])
																								: field.onChange(
																										field.value?.filter(
																											(e: string) =>
																												e !== option.value
																										)
																								  );
																						}}
																					/>
																				</FormControl>
																				<FormLabel className="font-normal">
																					{option.label}
																				</FormLabel>
																			</FormItem>
																		);
																	}}
																/>
															))}
														<FormMessage />
													</FormItem>
												)}
											/>
										) : input.type === "switch" ? (
											<FormField
												key={input.name}
												control={form.control}
												name={input.name}
												render={() => (
													<FormItem className="flex items-center gap-2">
														<FormLabel className="cursor-pointer">
															{input.label}
														</FormLabel>
														<FormControl>
															<Switch
																className={cn("!mt-0", input.styleInput)}
																checked={input.checked}
																onCheckedChange={input.onCheckedChange}
															/>
														</FormControl>
														<FormLabel
															className={cn(
																"!mt-0 font-normal text-md cursor-pointer",
																input.styleInputLabel
															)}
														>
															{input.switchLabel}
														</FormLabel>
														<FormMessage />
													</FormItem>
												)}
											/>
										) : input.name === "permissions" ||
										  input.name === "optionsPermission" ? (
											<>
												{input.manyCheckboxes?.map((checkbox, index) => (
													<FormField
														key={index}
														control={form.control}
														name={input.name}
														render={() => (
															<FormItem className="flex flex-col gap-3 space-y-0">
																{checkbox.options.map((option) => (
																	<FormField
																		key={option.value}
																		control={form.control}
																		name={input.name}
																		render={({ field }) => (
																			<FormItem className="space-y-0 flex w-fit items-end justify-end gap-2">
																				<FormControl>
																					<Checkbox
																						className="w-5 h-5 mb-1 flex-shrink-0"
																						checked={field.value?.includes(
																							option.value
																						)}
																						onCheckedChange={(checked) => {
																							return checked
																								? field.onChange([
																										...field.value,
																										option.value,
																								  ])
																								: field.onChange(
																										field.value?.filter(
																											(value: string) =>
																												value !== option.value
																										)
																								  );
																						}}
																					/>
																				</FormControl>
																				<FormLabel
																					className={cn(
																						"font-normal text-md cursor-pointer",
																						input.styleInputLabel
																					)}
																				>
																					{option.label}
																				</FormLabel>
																			</FormItem>
																		)}
																	/>
																))}
															</FormItem>
														)}
													/>
												))}
											</>
										) : input.type === "textarea" ? (
											<>
												<FormField
													control={form.control}
													name={input.name}
													render={({ field }) => (
														<FormItem>
															<FormLabel className={input.styleInputLabel}>
																{input.label}
															</FormLabel>
															<FormControl>
																<Textarea
																	placeholder="Escreva algo..."
																	className={cn("w-full", input.styleInput)}
																	{...field}
																/>
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</>
										) : input.type === "selectPaginate" ? (
											<>
												<SelectPaginate
													inputValue={input.selectPaginate!.inputValue}
													label={input.selectPaginate!.label}
													onInputValueChange={
														input.selectPaginate!.onInputValueChange
													}
													disabled={input.selectPaginate!.disabled}
													options={input.selectPaginate!.options}
													placeholder={input.selectPaginate!.placeholder}
													clearInput={input.selectPaginate?.clearInput}
													includeSearch={input.selectPaginate?.includeSearch}
													infinityScrollEnabled={
														input.selectPaginate?.infinityScrollEnabled
													}
													observerElementRef={
														input.selectPaginate?.observerElementRef
													}
													onChangeSelect={input.selectPaginate?.onChangeSelect}
													readOnly={input.selectPaginate?.readOnly}
													setSelecionadoSelect={
														input.selectPaginate?.setSelecionadoSelect
													}
												/>
												<FormMessage />
											</>
										) : input.type === "password" ? (
											<>
												<FormLabel
													className={cn("mb-4", input.styleInputLabel)}
												>
													{input.label}
												</FormLabel>
												<div className="flex items-center">
													<Input
														{...field}
														type={passwordIsVisible ? "text" : "password"}
													/>
													<Button
														size="icon"
														variant="ghost"
														className="-ml-10 bg-white w-9 h-9"
														type="button"
														onClick={() =>
															setPasswordIsVisible((prev) => !prev)
														}
													>
														{passwordIsVisible ? (
															<PiEyeSlash className="text-lg" />
														) : (
															<PiEye className="text-lg" />
														)}
													</Button>
												</div>
												<FormMessage />
												{strengthPassword &&
													input.name !== "confirmPassword" &&
													form.getValues("password").length >= 5 && (
														<p className="text-sm text-gray-500">
															{strengthPassword}
														</p>
													)}
											</>
										) : (
											<FormControl>
												<>
													<FormLabel className={input.styleInputLabel}>
														{input.label}
													</FormLabel>
													{input.radio ? (
														<div className={cn(input.radioStyleDiv)}>
															{input.radio.map((radio) => (
																<div
																	key={radio.value}
																	className="flex items-center gap-2"
																>
																	<Input
																		type="radio"
																		className="h-4 w-4 border-sky-400 cursor-pointer"
																		value={radio.value}
																		checked={field.value === radio.value}
																		onChange={() => field.onChange(radio.value)}
																	/>
																	<p
																		className="cursor-pointer"
																		onClick={() => field.onChange(radio.value)}
																	>
																		{radio.label}
																	</p>
																</div>
															))}
														</div>
													) : (
														<Input
															type={input.type}
															name={input.name}
															value={field.value}
															placeholder={
																input.mask
																	? maskProps[input.mask].placeholder
																	: input.placeholder
															}
															disabled={input.disabled ? true : false}
															onChange={(event) => {
																input.mask
																	? field.onChange(
																			maskProps[input.mask].function(
																				event.target.value
																			)
																	  )
																	: field.onChange(
																			input.type === "number"
																				? +event.target.value
																				: event.target.value
																	  );
															}}
															min={
																input.type === "number"
																	? input.minInputNumber
																	: input.type === "date"
																	? input.minValueDate
																	: undefined
															}
															max={
																input.type === "number"
																	? input.maxInputNumber
																	: undefined
															}
															maxLength={
																input.mask
																	? maskProps[input.mask].maxLength
																	: undefined
															}
														/>
													)}
													<FormMessage />
												</>
											</FormControl>
										)}
									</FormItem>
								)}
							/>
						</div>
					))}
					<div className={cn("w-full flex justify-end gap-2", styleButtonDiv)}>
						<Button
							type="submit"
							className={cn(
								styleButton
									? styleButton
									: "w-56 bg-[#652C86] text-white hover:bg-[#A352C5]"
							)}
						>
							{leftSideButtonIcon ?? null}
							{buttonLabel ? buttonLabel : "Salvar"}
							{rigthSideButtonIcon ?? null}
						</Button>
						{hasMoreButtons &&
							hasMoreButtons.map((button, index) => (
								<Button
									key={index}
									disabled={loading}
									onClick={(data) => button.onClick(data)}
									type={button.type}
									className={cn(
										button.styleButton
											? button.styleButton
											: "w-56 bg-[#652C86] text-white hover:bg-[#A352C5]"
									)}
									ref={(ref) => (button.ref = ref)}
								>
									{button.label}
								</Button>
							))}
					</div>
				</form>
			</Form>
		</div>
	);
};

export { CustomForm };
