import { userType } from "@shared/context/user/userType";

type LoginInputDto = {
	usuario: string;
	senha: string;
};

type LoginOutputDto = {
	usuario: userType;
	token: string;
};

type Perfil = {
	[key in string]: string[];
};

export type { LoginInputDto, LoginOutputDto, Perfil };
