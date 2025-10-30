import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { setoresInPut, setoresOutPut } from "./getSetores.dto";

class getSetores {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: setoresInPut): Promise<setoresOutPut> {
        const response = await this.api.get<setoresOutPut>("/setores", { params });

        return response.data;
    }
}

const useGetSetores = new getSetores(http);

export { useGetSetores };
