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

const formSchema = z.object({
    nome: z.string().min(2, "Nome obrigatório"),
    cpf: z.string(),
    dataNascimento: z.string().regex(
        /^\d{4}\-\d{2}\-\d{2}$/,
        "Data inválida (formato: AAAA-MM-DD)"
    ),
    sexo: z.enum(["M", "F"], { message: "Selecione o sexo" }),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    senhaConfirm: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    idPerfil: z.string().min(1, "Selecione o perfil do usuário"),
});

type FormData = z.infer<typeof formSchema>;

type FormCadastroProps = {
    onSuccess: () => void;
};

const FormCadastro = ({ onSuccess }: FormCadastroProps) => {

    const [perfis, setPerfis] = useState<perfilData[]>([]);

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
                id_perfil: Number(data.idPerfil)
            }
            await useCreateProfissionaisService.execute(params)
            form.reset();
            onSuccess();
        } catch (error) {
            errorHandler(error);
        }
    }

    async function getPerfis() {
        try {
            const params = {
                nome: ""
            }
            const response = await ListPerfis.execute(params.nome);

            // const treatedPerfil: OptionSelectPaginate[] = response.data.map((item) => ({
            //     value: item.Id.toString(),
            //     label: treatsText(item.Nome),
            // }));

            setPerfis(response.data);
        } catch (error) {
            errorHandler(error);
        }
    }

    useEffect(() => {
        getPerfis();
    }, []);

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-3 gap-4 p-6"
            >
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
                <div className="w-full flex justify-end mt-8 col-span-2">
                    <Button type="submit" className="w-1/2">
                        Enviar
                    </Button>
                </div>

            </form>
        </Form>
    );
}

export { FormCadastro };