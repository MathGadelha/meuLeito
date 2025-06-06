import logo from "@assets/imgs/logo.png";
import { cn } from "@components/lib/utils";
import { Separator } from "@components/ui/separator";
import { PiArrowRight, PiCaretLeftBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";
import { MdOutlineLogout } from "react-icons/md";
import { DialogLogout } from "@components/dialogLogout";
import { useState } from "react";
import { SidebarButton } from "@customTypes/sidebarButton";
import { LuLayoutDashboard } from "react-icons/lu";

type Props = {
	children: React.ReactNode;
	buttons: SidebarButton[];
};

const SidebarDrawer = ({ children, buttons }: Props) => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const navigate = useNavigate();

	return (
		<div>
			<Sheet modal={true}>
				<SheetTrigger asChild>{children}</SheetTrigger>
				<SheetContent side="left" className="bg-primary text-white">
					<SheetHeader className="overflow-y-auto h-full overflow-x-hidden">
						<SheetTitle className="flex justify-center items-center">
							<img src={logo} alt="Logo" className="w-36 mt-2 mb-5" />
						</SheetTitle>
						<div className="w-full flex justify-center items-center">
							<button
								onClick={() => navigate("/dashboard")}
								className={cn(
									"w-[95%] px-4 py-2 flex items-center justify-center rounded-full bg-secondary text-zinc-700 hover:bg-[#063552] hover:text-white hover:-translate-y-1 focus:-translate-y-1 focus:bg-secondary focus:text-white transition-all"
								)}
							>
								<div className="flex items-center justify-center gap-2">
									<span className="text-3xl">
										<LuLayoutDashboard className="text-white" />
									</span>
									<span className="text-lg text-zinc-50">Abrir dashboard</span>
								</div>
							</button>
						</div>
						<Separator className="bg-secondary" />
						<SheetDescription className="flex flex-col justify-between h-full">
							<div className="space-y-4 py-4">
								{buttons.map(({ icon, label, path, disabled }) => (
									<button
										key={path}
										onClick={() => navigate(path)}
										className={cn(
											"w-[95%] px-4 py-2 flex items-center justify-between rounded-full text-white hover:bg-secondary hover:translate-x-2 focus:translate-x-2 focus:scale-105 transition-all",
											window.location.pathname === path && "bg-secondary",
											disabled &&
											"hover:cursor-default text-white hover:bg-secondary hover:translate-x-0"
										)}
									>
										<div className="flex items-center justify-start gap-4">
											<span className="text-3xl">{icon}</span>
											<span className="text-lg">{label}</span>
										</div>
										<PiArrowRight className="text-lg" />
									</button>
								))}
								<button
									onClick={() => setIsOpenDialog(true)}
									className={cn(
										"w-[95%] px-4 py-2 flex items-center justify-between rounded-full text-white hover:bg-secondary hover:translate-x-2 focus:translate-x-2 transition-all"
									)}
								>
									<div className="flex items-center justify-start gap-4">
										<span className="text-3xl">
											<MdOutlineLogout size={24} />
										</span>
										<span className="text-lg ">Logout</span>
									</div>
									<PiArrowRight className=" text-lg" />
								</button>
							</div>
						</SheetDescription>
						<SheetClose>
							<button className="absolute z-50 bottom-14 -right-1 -mr-4 bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center group hover:bg-slate-200 transition-all">
								<PiCaretLeftBold className="text-2xl text-black" />
							</button>
						</SheetClose>
					</SheetHeader>
				</SheetContent>
			</Sheet>
			{isOpenDialog && (
				<DialogLogout
					isOpen={isOpenDialog}
					onClose={() => setIsOpenDialog(false)}
				/>
			)}
		</div>
	);
};

export { SidebarDrawer };
