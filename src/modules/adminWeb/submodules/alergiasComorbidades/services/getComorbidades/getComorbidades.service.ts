import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { comorbidadesInPut, comorbidadesOutPut } from "./getComorbidades.dto";

class getComorbidades {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: comorbidadesInPut): Promise<comorbidadesOutPut> {
        const response = await this.api.get<comorbidadesOutPut>("/comorbidades", { params });

        return response.data;
    }
}

const useGetComorbidades = new getComorbidades(http);

export { useGetComorbidades };