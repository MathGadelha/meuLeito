import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { createSetorInPut } from "./postSetor.dto";

class createSetorService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: createSetorInPut): Promise<void> {
        const response = await this.api.post<void>("/setores", { nome: params.nome });

        return response.data;
    }
}

const useCreateSetorService = new createSetorService(http);

export { useCreateSetorService };
