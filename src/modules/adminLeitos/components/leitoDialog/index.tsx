import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@components/ui/dialog";
import { defaultValuesLeitos } from "@modules/adminLeitos/schema/defaultValuesLeito";
import { LeitosAdminFormSchema } from "@modules/adminLeitos/schema/leitosFormSchema";
import { leitosAdmin } from "@modules/adminLeitos/services/getLeitos/getLeitos.dto";
import { useEffect, useState } from "react";
import { useGetSetores } from "@modules/adminWeb/submodules/setores/services/getSetores/getSetores.service";
import { errorHandler } from "@api/errorHandler";
import { OptionSelectPaginate, SelectPaginate } from "@components/selectPaginate";
import { useLeitosService } from "@modules/adminLeitos/services/postLeitos/postLeitos.service";
import { editLeitosService } from "@modules/adminLeitos/services/putLeitos/putLeitos.service";

type dialogProp = {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	leitoSelected: leitosAdmin;
	tipo: "C" | "E";
	onSend: () => void;
};

const LeitoDialogAdmin = ({ isOpen, onOpenChange, leitoSelected, tipo, onSend }: dialogProp) => {

	const [setores, setSetores] = useState<OptionSelectPaginate[]>([]);
	const [searchSetores, setSearchSetores] = useState("");

	const form = useForm<z.infer<typeof LeitosAdminFormSchema>>({
		resolver: zodResolver(LeitosAdminFormSchema),
		defaultValues: defaultValuesLeitos,
	});

	async function onSubmit() {
		try {

			const params = {
				nome: form.getValues("nome"),
				id_setor: Number(form.getValues("setor")),
				Status: form.getValues("status"),
			};
			if (tipo === "E" && leitoSelected.Id) {
				await editLeitosService.execute(String(leitoSelected.Id), params);
			} if (tipo === "C") {
				await useLeitosService.execute(params);
			}
			onSend()
		} catch (error) {
			errorHandler(error);
		}
	}

	async function listSetores() {
		try {
			const params = {
				nome: searchSetores,
			}
			const response = await useGetSetores.execute(params);

			const setoresOptions = response.data.map((setor) => ({
				label: setor.Nome,
				value: setor.Id.toString(),
			}));
			setSetores(setoresOptions);
		} catch (error) {
			errorHandler(error);
		}
	}

	useEffect(() => {
		const debounce = setTimeout(() => {
			searchSetores && listSetores();
		}, 750);

		return () => clearTimeout(debounce);

	}, [searchSetores]);

	useEffect(() => {
		if (tipo === "C") return;
		form.setValue("nome", leitoSelected.Nome);
		form.setValue("setor", leitoSelected.IdSetor.toString());
		setSearchSetores(leitoSelected.NomeSetor);
		form.setValue("status", leitoSelected.Status);
	}, [leitoSelected]);

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] rounded-2xl shadow-xl p-6 bg-white dark:bg-zinc-900">
				<DialogHeader>
					<DialogTitle className="text-2xl font-semibold text-zinc-800 dark:text-white">
						Leito {leitoSelected.Nome}
					</DialogTitle>
					<DialogDescription className="mt-2 text-sm text-zinc-500 dark:text-zinc-300">
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="flex flex-col gap-4 p-6 text-black"
							>
								<FormField
									control={form.control}
									name="nome"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nome</FormLabel>
											<FormControl>
												<Input placeholder="Insira o nome do leito" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="status"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Status</FormLabel>
											<FormControl>
												<Select onValueChange={field.onChange} value={field.value}>
													<SelectTrigger className="w-full border rounded px-3 py-2">
														<SelectValue placeholder="Selecione o status" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="Disponível">Disponível</SelectItem>
														<SelectItem value="Ocupado">Ocupado</SelectItem>
														<SelectItem value="Manutenção">Manutenção</SelectItem>
														<SelectItem value="Livre">Livre</SelectItem>
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="setor"
									render={() => (
										<FormItem>
											<FormControl>
												<SelectPaginate
													inputValue={searchSetores}
													label="Pesquise pelo Setor."
													options={setores}
													placeholder=""
													onInputValueChange={(e) => setSearchSetores(e)}
													setSelecionadoSelect={(e) =>
														form.setValue("setor", e ? e.value : "")
													}
													clearInput={() => {
														setSetores([]);
														form.setValue("setor", "");
														setSearchSetores("");
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="w-full flex justify-end mt-8 col-span-2">
									<Button type="submit" className="w-1/2">
										Enviar
									</Button>
								</div>

							</form>
						</Form>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export { LeitoDialogAdmin };
