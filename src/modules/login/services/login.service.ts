import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { LoginInputDto, LoginOutputDto } from "./login.dto";

class LoginService {
	constructor(private readonly api: AxiosInstance) { }

	async execute({
		usuario,
		senha,
	}: LoginInputDto): Promise<LoginOutputDto> {

		const response = await this.api.post<LoginOutputDto>("/login", { login: usuario, senha: senha });

		const { token, ...userData } = response.data;

		localStorage.setItem("@access_token", token);
		localStorage.setItem("@user_data", JSON.stringify(userData));

		return response.data;
	}
}

const loginService = new LoginService(http);

export { loginService };
