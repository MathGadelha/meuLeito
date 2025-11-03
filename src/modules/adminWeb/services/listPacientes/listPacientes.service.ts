import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { listPacientesOutput } from "./listPacientes.dto";

class listPacientes {
    constructor(private readonly api: AxiosInstance) { }

    async execute(nome?: string): Promise<listPacientesOutput> {
        const response = await this.api.get<listPacientesOutput>("/pacientes", { params: { nome: nome } });

        return response.data;
    }
}

const ListPacientes = new listPacientes(http);

export { ListPacientes };