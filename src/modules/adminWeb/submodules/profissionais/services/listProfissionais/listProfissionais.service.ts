import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { listProfissionaisOutput } from "./listProfissionais.dto";

class listProfissionais {
    constructor(private readonly api: AxiosInstance) { }

    async execute(nome: string): Promise<listProfissionaisOutput> {
        const response = await this.api.get<listProfissionaisOutput>("/profissionais", { params: { nome: nome } });

        return response.data;
    }
}

const ListProfissionais = new listProfissionais(http);

export { ListProfissionais };