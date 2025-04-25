type LoginInputDto = {
	usuario: string;
	senha: string;
	remembe_me?: boolean;
	isWeb: boolean;
};

type LoginOutputDto = {
	id: number;
	id_empresa: number;
	usuario: any;
	perfil: string[];
	accessToken: string;
	id_profissional: number,
	refreshToken: string;
};

type Perfil = {
	[key in string]: string[];
};

export type { LoginInputDto, LoginOutputDto, Perfil };
