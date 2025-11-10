import { AxiosInstance } from "axios";
import { http } from "@api/https";
class FinishChamado {
    constructor(private readonly api: AxiosInstance) { }

    async execute(id: string): Promise<void> {
        await this.api.put(`/chamados/finalizar-chamado/${id}`)
    }
}

const finishChamado = new FinishChamado(http)
export { finishChamado };
