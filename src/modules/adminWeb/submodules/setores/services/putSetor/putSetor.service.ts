import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { EditSetorInPut } from "./putSetor.dto";

class EditSetorService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string, params: EditSetorInPut): Promise<void> {
        await this.api.put(`/setores/${id}`, params)
    }
}

const editSetorService = new EditSetorService(http)
export { editSetorService };
