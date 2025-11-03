import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { postProfissionaisInput, postProfissionaisOutput } from "./postProfissionais.dto";

class createProfissionaisService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: postProfissionaisInput): Promise<postProfissionaisOutput> {
        const response = await this.api.post<postProfissionaisOutput>("/profissionais", params);

        return response.data;
    }
}

const useCreateProfissionaisService = new createProfissionaisService(http);

export { useCreateProfissionaisService };