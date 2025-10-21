import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { postPessoasInput, postPessoasOutput } from "./postPessoas.dto";

class pessoasService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(pessoaBody: postPessoasInput): Promise<postPessoasOutput> {
        const response = await this.api.post<postPessoasOutput>("/pessoas", { pessoaBody });

        return response.data;
    }
}

const PessoasService = new pessoasService(http);

export { PessoasService };
