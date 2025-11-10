import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { postLeitosInput } from "./postLeitos.dto";

class LeitosService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: postLeitosInput): Promise<void> {
        const response = await this.api.post<void>("/leitos", params);

        return response.data;
    }
}

const useLeitosService = new LeitosService(http);

export { useLeitosService };