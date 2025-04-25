import { AxiosInstance } from "axios";
import { http } from "@api/https";
import { LoginInputDto, LoginOutputDto } from "./login.dto";

class LoginService {
	constructor(private readonly api: AxiosInstance) { }

	async execute({
		usuario,
		senha,
		remembe_me,
		isWeb
	}: LoginInputDto): Promise<LoginOutputDto> {

		const response = await this.api.post<LoginOutputDto>("/auth/login", {
			usuario,
			senha,
			isWeb,
		});
		
		const { accessToken, refreshToken, ...userData } = response.data;

		localStorage.setItem("@access_token", accessToken);
		localStorage.setItem("@user_data", JSON.stringify(userData));

		if (remembe_me) {
			localStorage.setItem("@refresh_token", refreshToken);
		}

		return response.data;
	}
}

const loginService = new LoginService(http);

export { loginService };
