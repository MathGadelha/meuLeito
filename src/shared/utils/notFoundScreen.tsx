import image from "@assets/imgs/notFound.png";

function NotFoundScreen() {
	return (
		<div className="w-full justify-center items-center flex flex-col gap-5">
			<img src={image} alt="Not Found" className="w-[250px] h-[250px]" />
			<div className="text-center text-gray-400">
				Escolha uma conversa ao lado.
			</div>
		</div>
	);
}

export { NotFoundScreen };
