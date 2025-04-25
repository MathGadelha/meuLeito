import { redirect } from "react-router-dom";
import { useVerifyIfHasProfileToAccessModule } from "./useVerifyIfHasProfileToAccessModule";

function useVerifyIfHasProfileToAccessSubModule() {
	const { execute: executeUseVerifyIfHasProfileToAccessModule } =
		useVerifyIfHasProfileToAccessModule();
	function execute(allowedProfiles: string[]) {
		if (!executeUseVerifyIfHasProfileToAccessModule(allowedProfiles))
			throw redirect("/");
		return null;
	}

	return {
		execute,
	};
}

export { useVerifyIfHasProfileToAccessSubModule };
