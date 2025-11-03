import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { putLeitosInput } from "./putLeitos.dto";

class EditLeitosService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string, params: putLeitosInput): Promise<void> {
        await this.api.put(`/leitos/${id}`, params)
    }
}

const editLeitosService = new EditLeitosService(http)
export { editLeitosService };
