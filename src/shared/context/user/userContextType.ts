import { user } from "./userType";

type UserContextType = {
	user: {
		value: user;
		set: React.Dispatch<user>;
	};
	perfil: {
		value: string[];
		set: React.Dispatch<string[]>;
	};
	// userData: {
	// 	value: UserData;
	// 	set: React.Dispatch<UserData>;
	// };
};

export type { UserContextType };
