import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { listProfissionaisInput, listProfissionaisOutput } from "./listProfissionais.dto";

class listProfissionais {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: listProfissionaisInput): Promise<listProfissionaisOutput> {
        const response = await this.api.get<listProfissionaisOutput>("/profissionais", { params });

        return response.data;
    }
}

const ListProfissionais = new listProfissionais(http);

export { ListProfissionais };