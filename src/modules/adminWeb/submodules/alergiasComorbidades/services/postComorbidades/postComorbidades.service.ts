import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { createComorbidadeInPut } from "./postComorbidade.dto";

class createComorbidadeService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: createComorbidadeInPut): Promise<void> {
        const response = await this.api.post<void>("/comorbidades", { nome: params.nome });

        return response.data;
    }
}

const useCreateComorbidadeService = new createComorbidadeService(http);

export { useCreateComorbidadeService };
