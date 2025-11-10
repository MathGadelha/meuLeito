import { setorData, userType } from "./userType";

type UserContextType = {
	user: {
		value: userType;
		set: React.Dispatch<userType>;
	};
	perfil: {
		value: string[];
		set: React.Dispatch<string[]>;
	};
	setor: {
		value: setorData;
		set: React.Dispatch<setorData>;
	};
	// userData: {
	// 	value: UserData;
	// 	set: React.Dispatch<UserData>;
	// };
};

export type { UserContextType };
