import { cn } from "@components/lib/utils";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import { PiArrowRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export type Props = {
	icon: JSX.Element;
	title: string;
	description: string;
	// moduleAction: moduleAction[];
	path: string;
	disabled?: boolean;
};

const ModuleCard = ({
	icon,
	title,
	description,
	// moduleAction,
	path,
	disabled,
}: Props) => {
	const navigate = useNavigate();
	return (
		<Card
			className={cn(
				"p-2 cursor-pointer transition-all hover:scale-[101%] hover:shadow-lg flex flex-col justify-between h-2/12",
				disabled && "opacity-50 cursor-not-allowed hidden"
			)}
			onClick={() => {
				if (!disabled) navigate(path);
			}}
		>
			<CardHeader>
				<div className="flex items-center justify-between">
					<CardTitle className="flex items-center justify-start gap-2">
						{icon}
						{title}
					</CardTitle>
					<PiArrowRight className="w-5 h-5 text-zinc-800" />
				</div>
				<CardDescription>{description}</CardDescription>
			</CardHeader>
		</Card>
	);
};

export { ModuleCard };

