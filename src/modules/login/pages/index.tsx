import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import logo from "@assets/imgs/logo.png";
import { CustomForm } from "@components/customForm";
import { useLoginForm } from "../hooks/useLoginForm";

const Login = () => {
	const { loginCustomForm } = useLoginForm();

	return (
		<div className="flex w-screen h-screen bg-primary">
			<div className="w-11/12 flex flex-col justify-center items-center text-white">
				<div className="w-72 h-64 flex items-center justify-center">
					<img className="w-72 h-64" src={logo} alt="Amar.elo" />
				</div>
				<div className="text-3xl flex flex-col items-center justify-center font-bold my-5">
					<p>Boas-vindas ao sistema</p>
					<p>Meu Leito!</p>
				</div>
			</div>
			<div className="flex w-full justify-center items-center z-40">
				<Card className="rounded-3xl shadow-xl w-1/2 h-3/5 max-h-[360px]">
					<CardHeader>
						<CardTitle>Login</CardTitle>
					</CardHeader>
					<CardContent className="flex items-center justify-center">
						<CustomForm {...loginCustomForm} />
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export { Login };
