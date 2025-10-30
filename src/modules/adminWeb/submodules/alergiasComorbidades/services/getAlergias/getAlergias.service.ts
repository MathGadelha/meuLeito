import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { alergiasInPut, alergiasOutPut } from "./getAlergias.dto";

class getAlergias {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: alergiasInPut): Promise<alergiasOutPut> {
        const response = await this.api.get<alergiasOutPut>("/alergias", { params });

        return response.data;
    }
}

const useGetAlergias = new getAlergias(http);

export { useGetAlergias };