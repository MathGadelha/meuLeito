import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { PessoasService } from "@modules/adminWeb/services/postPessoas/postPessoas.service";
import { Select } from "@radix-ui/react-select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";

const formSchema = z.object({
    nome: z.string().min(2, "Nome obrigatório"),
    cpf: z
        .string(),
    // .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido (ex: 123.456.789-10)"),
    dataNascimento: z.string().regex(
        /^\d{4}\-\d{2}\-\d{2}$/,
        "Data inválida (formato: AAAA-MM-DD)"
    ),
    sexo: z.enum(["M", "F"], { message: "Selecione o sexo" }),
});

type FormData = z.infer<typeof formSchema>;

const FormCadastro = () => {
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            cpf: "",
            dataNascimento: "",
        },
    });

    async function onSubmit(data: FormData) {
        try {
            const pessoaBody = {
                nome: data.nome,
                nascimento: data.dataNascimento,
                sexo: data.sexo,
                cpf: data.cpf
            }
            await PessoasService.execute(pessoaBody)
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
        }
    }

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
                                <Input placeholder="000.000.000-00" {...field} />
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
                <div className="w-full flex justify-end mt-8">
                    <Button type="submit" className="w-1/2">
                        Enviar
                    </Button>
                    <Button onClick={() => console.log(form.getValues())} className="w-1/2">
                        Ver Valores
                    </Button>
                </div>

            </form>
        </Form>
    );
}

export { FormCadastro };