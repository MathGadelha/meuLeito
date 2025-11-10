import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";
import { errorHandler } from "@api/errorHandler";
import { InputMask } from "@components/inputMask";
import { ListPerfis } from "../../services/listPerfis/listPerfis.service";
import { useEffect, useState } from "react";
import { perfilData } from "../../services/listPerfis/listPerfis.dto";
import { useCreateProfissionaisService } from "../../services/postProfissionais/postProfissionais.service";
import { OptionSelectPaginate, SelectPaginate } from "@components/selectPaginate";
import { useGetSetores } from "@modules/adminWeb/submodules/setores/services/getSetores/getSetores.service";

const formSchema = z.object({
    nome: z.string().min(2, "Nome obrigatório"),
    cpf: z.string(),
    dataNascimento: z
        .string()
        .regex(/^\d{4}\-\d{2}\-\d{2}$/, "Data inválida (formato: AAAA-MM-DD)"),
    sexo: z.enum(["M", "F"], { message: "Selecione o sexo" }),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    senhaConfirm: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    idPerfil: z.string().min(1, "Selecione o perfil do usuário"),
    idSetores: z.array(z.string()).min(1, "Selecione pelo menos um setor"),
});

type FormData = z.infer<typeof formSchema>;

type FormCadastroProps = {
    onSuccess: () => void;
};

const FormCadastro = ({ onSuccess }: FormCadastroProps) => {
    const [perfis, setPerfis] = useState<perfilData[]>([]);
    const [setores, setSetores] = useState<OptionSelectPaginate[]>([]);
    const [searchSetores, setSearchSetores] = useState("");
    const [selectedSetores, setSelectedSetores] = useState<OptionSelectPaginate[]>([]);

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            cpf: "",
            dataNascimento: "",
            sexo: "M",
            senha: "",
            senhaConfirm: "",
            idPerfil: "",
            idSetores: [],
        },
    });

    async function onSubmit(data: FormData) {
        try {
            const params = {
                nome: data.nome,
                nascimento: data.dataNascimento,
                sexo: data.sexo,
                cpf: data.cpf,
                senha: data.senha,
                id_perfil: Number(data.idPerfil),
                setores: data.idSetores.map(Number),
            };
            await useCreateProfissionaisService.execute(params);
            form.reset();
            setSelectedSetores([]);
            onSuccess();
        } catch (error) {
            errorHandler(error);
        }
    }

    async function getPerfis() {
        try {
            const response = await ListPerfis.execute("");
            setPerfis(response.data);
        } catch (error) {
            errorHandler(error);
        }
    }

    async function listSetores() {
        try {
            const response = await useGetSetores.execute({ nome: searchSetores });
            const setoresOptions = response.data.map((setor) => ({
                label: setor.Nome,
                value: setor.Id.toString(),
            }));
            setSetores(setoresOptions);
        } catch (error) {
            errorHandler(error);
        }
    }

    const addSetor = (opt?: OptionSelectPaginate | null) => {
        if (!opt) return;
        const ids = form.getValues("idSetores") || [];
        // evita duplicidade
        if (ids.includes(opt.value)) return;

        form.setValue("idSetores", [...ids, opt.value], { shouldValidate: true, shouldDirty: true });
        setSelectedSetores((prev) => {
            if (prev.some((s) => s.value === opt.value)) return prev;
            return [...prev, opt];
        });
    };

    const removeSetor = (value: string) => {
        const ids = form.getValues("idSetores") || [];
        const newIds = ids.filter((id) => id !== value);
        form.setValue("idSetores", newIds, { shouldValidate: true, shouldDirty: true });

        setSelectedSetores((prev) => prev.filter((s) => s.value !== value));
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (searchSetores) listSetores();
        }, 750);
        return () => clearTimeout(debounce);
    }, [searchSetores]);

    useEffect(() => {
        getPerfis();
    }, []);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4 p-6">
                <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Seu nome completo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>CPF</FormLabel>
                            <FormControl>
                                <InputMask
                                    mask="999.999.999-99"
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="000.000.000-00"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="dataNascimento"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Data de Nascimento</FormLabel>
                            <FormControl>
                                <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sexo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Sexo</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full border rounded px-3 py-2">
                                        <SelectValue placeholder="Selecione o sexo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="M">Masculino</SelectItem>
                                        <SelectItem value="F">Feminino</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="senha"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input placeholder="Insira a senha" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="senhaConfirm"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirme a senha</FormLabel>
                            <FormControl>
                                <Input placeholder="Confirme a senha" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="idPerfil"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perfil</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="w-full border rounded px-3 py-2">
                                        <SelectValue placeholder="Selecione o perfil do profissional" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {perfis.map((perfil) => (
                                            <SelectItem key={perfil.Id} value={perfil.Id.toString()}>
                                                {perfil.Nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="idSetores"
                    render={() => (
                        <FormItem>
                            <FormControl>
                                <>
                                    <SelectPaginate
                                        inputValue={searchSetores}
                                        label="Pesquise pelo Setor."
                                        options={setores}
                                        placeholder=""
                                        onInputValueChange={(e) => setSearchSetores(e)}
                                        setSelecionadoSelect={(opt) => {
                                            addSetor(opt); setSetores([]);
                                            setSearchSetores("");
                                        }}
                                        clearInput={() => {
                                            setSetores([]);
                                            setSearchSetores("");
                                        }}
                                    />
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {selectedSetores.map((s) => (
                                            <span
                                                key={s.value}
                                                className="inline-flex items-center rounded-full border border-[#136f63] px-2 py-1 text-sm"
                                            >
                                                {s.label}
                                                <button
                                                    type="button"
                                                    className="ml-2 leading-none hover:text-red-600"
                                                    onClick={() => removeSetor(s.value)}
                                                    aria-label={`Remover ${s.label}`}
                                                    title={`Remover ${s.label}`}
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="w-full flex justify-end mt-8 col-span-3">
                    <Button type="submit" className="w-full md:w-1/2">
                        Enviar
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export { FormCadastro };
