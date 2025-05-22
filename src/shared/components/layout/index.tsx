import Logo from "@assets/imgs/logo.png";
import { DialogLogout } from "@components/dialogLogout";
import { cn } from "@components/lib/utils";
import { Button } from "@components/ui/button";
import { ScrollArea } from "@components/ui/scroll-area";
import { SidebarButton } from "@customTypes/sidebarButton";
import { useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { PiCaretRightBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { SidebarDrawer } from "./sidebarDrawer";
import { Breadcrumb } from "@components/types/Breadcrumb";
import { Tooltip } from "@components/tooltip";
import { Separator } from "@components/ui/separator";
import { LuLayoutDashboard } from "react-icons/lu";

type Props = {
	children: React.ReactNode;
	sidebarButton: SidebarButton[];
	breadcrumbs?: Breadcrumb[];
	defaultDisabled?: boolean;
};

const Layout = ({
	children,
	sidebarButton,
	breadcrumbs = [],
	defaultDisabled,
}: Props) => {
	const navigate = useNavigate();
	const [isOpenDialog, setIsOpenDialog] = useState(false);

	return (
		<div className="w-full h-screen flex">
			<aside className="w-[5%] flex flex-col items-center gap-6 relative bg-primary transition-all">
				<img src={Logo} alt="Logo" className="w-24 h-20 mt-2 mb-5" />
				<Tooltip side="right" text="Dashboard">
					<button
						onClick={() => navigate("/dashboard")}
						className={cn(
							"w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-zinc-700 text-2xl hover:bg-[#063552] hover:text-zinc-900 focus:bg-[#063552] focus:text-white transition-all",
							window.location.pathname === "/dashboard" &&
								"bg-secondary text-white"
						)}
					>
						<p className="text-slate-100">
							<LuLayoutDashboard />
						</p>
					</button>
				</Tooltip>
				<Separator className="w-2/3 bg-secondary" />
				{sidebarButton.map((item, index) => (
					<Tooltip side="right" text={item.label} key={index}>
						<button
							onClick={() => navigate(item.path)}
							disabled={item.disabled}
							className={cn(
								"w-10 h-10 flex items-center justify-center rounded-full text-white text-2xl hover:bg-[#134b6e] focus:bg-[#134b6e] transition-all",
								window.location.pathname === item.path && "bg-[#134b6e]",
								!defaultDisabled && item.disabled && "hidden",
								defaultDisabled && item.disabled
									? "hover:bg-primary text-[#134b6e] hover:text-[#134b6e]"
									: "hover:bg-none"
							)}
						>
							<p>{item.icon}</p>
						</button>
					</Tooltip>
				))}
				<Tooltip side="right" text="Logout">
					<button
						onClick={() => setIsOpenDialog(true)}
						className={cn(
							"w-10 h-10 flex items-center justify-center rounded-full text-2xl hover:bg-[#063552] focus:text-white transition-all"
						)}
					>
						<p className="text-white">
							<MdOutlineLogout />
						</p>
					</button>
				</Tooltip>
				<SidebarDrawer buttons={sidebarButton}>
					<button className="absolute z-50 bottom-14 -right-1 -mr-4 bg-white w-10 h-10 rounded-full shadow-md shadow-gray-500 flex items-center justify-center group hover:bg-slate-200 transition-all">
						<PiCaretRightBold className="text-2xl text-black" />
					</button>
				</SidebarDrawer>
			</aside>
			<div className="w-[95%] bg-primary">
				<header className="w-full h-[10%] flex items-center justify-between p-4">
					<div className="flex items-center gap-3">
						<Button
							variant="link"
							className="p-0 disabled:opacity-100"
							disabled={breadcrumbs.length === 0}
							onClick={() => navigate("/dashboard")}
						>
							<h1 className="text-2xl font-semibold text-white">Dashboard</h1>
						</Button>
						{breadcrumbs.map((item, index) => (
							<div key={index} className="flex items-center">
								<span className="text-white font-bold mr-3">{">"}</span>
								<Button
									variant="link"
									disabled={index === breadcrumbs.length - 1}
									className="p-0 disabled:opacity-100"
									onClick={() => navigate(item.path)}
								>
									<h2 className="text-2xl font-semibold text-white">
										{item.label}
									</h2>
								</Button>
							</div>
						))}
					</div>
				</header>
				<div className="flex max-w-[99%] min-h-[88%] max-h-[88%] bg-white rounded-3xl shadow-2xl p-4">
					<ScrollArea className="w-full p-4">{children}</ScrollArea>
				</div>
			</div>
			{isOpenDialog && (
				<DialogLogout
					isOpen={isOpenDialog}
					onClose={() => setIsOpenDialog(false)}
				/>
			)}
		</div>
	);
};

export { Layout };
