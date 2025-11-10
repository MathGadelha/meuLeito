import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { createAlergiaInPut } from "./postAlergia.dto";

class createAlergiaService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: createAlergiaInPut): Promise<void> {
        const response = await this.api.post<void>("/alergias", { nome: params.nome });

        return response.data;
    }
}

const useCreateAlergiaService = new createAlergiaService(http);

export { useCreateAlergiaService };
