import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";

const formSchema = z.object({
    nome: z.string().min(2, "Nome obrigatório"),
    usuario: z.string().min(3, "Usuário obrigatório"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    cpf: z
        .string()
        .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, "CPF inválido (ex: 123.456.789-10)"),
    dataNascimento: z.string().regex(
        /^\d{4}\-\d{2}\-\d{2}$/,
        "Data inválida (formato: AAAA-MM-DD)"
    ),
});

// Infiere o tipo TypeScript baseado no schema
type FormData = z.infer<typeof formSchema>;

const FormCadastro = () => {
    // Configura o useForm com o resolver do zod
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            usuario: "",
            senha: "",
            cpf: "",
            dataNascimento: "",
        },
    });

    // Função disparada quando o formulário for enviado e válido
    function onSubmit(data: FormData) {
        alert(JSON.stringify(data, null, 2));
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
                    name="usuario"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome de usuário" {...field} />
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
                                <Input type="password" placeholder="Sua senha" {...field} />
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
                <div className="w-full flex justify-end mt-8">
                    <Button type="submit" className="w-1/2">
                        Enviar
                    </Button>
                </div>

            </form>
        </Form>
    );
}

export { FormCadastro };