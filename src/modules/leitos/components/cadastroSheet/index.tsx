import { errorHandler } from "@api/errorHandler";
import { Button } from "@components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { z } from "zod";
import { Sheet, SheetContent } from "@components/ui/sheet";
import { InputMask } from "@components/inputMask";
import { Input } from "@components/ui/input";
import { usePacienteService } from "@modules/adminWeb/services/postPaciente/postPaciente.service";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";

type sheetProp = {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess: () => void;
};

const formSchema = z.object({
    nome: z.string().min(2, "Nome obrigatório"),
    cpf: z.string(),
    dataNascimento: z.string().regex(
        /^\d{4}\-\d{2}\-\d{2}$/,
        "Data inválida (formato: AAAA-MM-DD)"
    ),
    sexo: z.enum(["M", "F"], { message: "Selecione o sexo" }),
});

type FormData = z.infer<typeof formSchema>;

const CadastroSheet = ({ isOpen, onOpenChange, onSuccess }: sheetProp) => {

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
            const params = {
                nome: data.nome,
                nascimento: data.dataNascimento,
                sexo: data.sexo,
                cpf: data.cpf
            }
            await usePacienteService.execute(params)
            form.reset();
            onSuccess();
        } catch (error) {
            errorHandler(error);
        }
    }

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent>
                <p className="font-bold text-xl">Cadastro de Paciente</p>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4 p-6"
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
                        <div className="w-full flex justify-end mt-8 col-span-2">
                            <Button type="submit" className="w-1/2">
                                Enviar
                            </Button>
                        </div>

                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};

export { CadastroSheet };
