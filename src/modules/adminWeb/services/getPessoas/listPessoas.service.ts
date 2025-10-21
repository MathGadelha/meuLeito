import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { listPessoasOutput } from "./listPessoas.dto";

class listPessoas {
    constructor(private readonly api: AxiosInstance) { }

    async execute(nome: string): Promise<listPessoasOutput> {
        const response = await this.api.get<listPessoasOutput>("/pessoas", { params: { nome: nome } });

        return response.data;
    }
}

const ListPessoas = new listPessoas(http);

export { ListPessoas };
