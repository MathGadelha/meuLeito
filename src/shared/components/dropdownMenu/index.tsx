import { ActionButton } from "@components/types/ActionButton";
import {
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenu as DropdownMenuWrapper,
} from "../ui/dropdown-menu";

type Props = {
	children: React.ReactNode;
	buttons: ActionButton[];
};

const DropdownMenu = ({ children, buttons }: Props) => {
	return (
		<DropdownMenuWrapper>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent align="center" side="right">
				{buttons.map(({ label, icon, onClick }, i) => (
					<div key={label}>
						<DropdownMenuItem className="gap-2 cursor-pointer" onClick={onClick}>
							{icon}
							{label}
						</DropdownMenuItem>
						{i < buttons.length - 1 && <DropdownMenuSeparator />}
					</div>
				))}
			</DropdownMenuContent>
		</DropdownMenuWrapper>
	);
};

export { DropdownMenu };

