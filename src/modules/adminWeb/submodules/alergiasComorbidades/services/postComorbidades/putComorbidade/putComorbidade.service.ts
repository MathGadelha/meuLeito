import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { EditComorbidadeInPut } from "./putComorbidade.dto";
class EditComorbidadeService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string, params: EditComorbidadeInPut): Promise<void> {
        await this.api.put(`/comorbidades/${id}`, params)
    }
}

const editComorbidadeService = new EditComorbidadeService(http)
export { editComorbidadeService };
