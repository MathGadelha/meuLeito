import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { putProfissionaisInput } from "./putProfissionais.dto";

class EditProfissionaisService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string, params: putProfissionaisInput): Promise<void> {
        await this.api.put(`/profissionais/${id}`, params)
    }
}

const editProfissionaisService = new EditProfissionaisService(http)
export { editProfissionaisService };
