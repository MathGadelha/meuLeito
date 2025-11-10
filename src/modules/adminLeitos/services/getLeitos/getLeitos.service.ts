import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { leitosInPut, leitosOutPut } from "./getLeitos.dto";

class getLeitos {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: leitosInPut): Promise<leitosOutPut> {
        const response = await this.api.get<leitosOutPut>("/leitos", { params });

        return response.data;
    }
}

const useGetLeitos = new getLeitos(http);

export { useGetLeitos };
