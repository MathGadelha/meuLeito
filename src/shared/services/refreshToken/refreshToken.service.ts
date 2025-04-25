import { AxiosInstance } from "axios";
import { RefreshTokenResponse } from "./refreshToken.dto";

class RefreshTokenService {
	async execute(api: AxiosInstance) {
		const config = {
			headers: {
				Authorization: `Bearer ${localStorage.getItem("@refresh_token")}`,
			},
		};

		const result = await api.post<RefreshTokenResponse>(
			"/auth/refresh-token",
			{},
			config
		);

		const { refreshToken, accessToken } = result.data;
		localStorage.setItem("@access_token", accessToken);
		localStorage.setItem("@refresh_token", refreshToken);

		return result.data;
	}
}

const refreshTokenService = new RefreshTokenService();

export { refreshTokenService };
