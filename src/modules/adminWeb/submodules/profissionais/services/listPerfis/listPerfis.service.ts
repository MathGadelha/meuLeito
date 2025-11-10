import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { listPerfisOutput } from "./listPerfis.dto";

class listPerfis {
    constructor(private readonly api: AxiosInstance) { }

    async execute(nome?: string): Promise<listPerfisOutput> {
        const response = await this.api.get<listPerfisOutput>("/perfis", { params: { nome: nome } });

        return response.data;
    }
}

const ListPerfis = new listPerfis(http);

export { ListPerfis };