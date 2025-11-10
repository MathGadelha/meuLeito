import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { EditAlergiaInPut } from "./putAlergia.dto";
class EditAlergiaService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string, params: EditAlergiaInPut): Promise<void> {
        await this.api.put(`/alergias/${id}`, params)
    }
}

const editAlergiaService = new EditAlergiaService(http)
export { editAlergiaService };
