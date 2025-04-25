import { cn } from "@components/lib/utils";


type IndicadoresProps = {
	indicadores: {
		label: string;
		value: number;
	}[];
};

const Indicadores = (data: IndicadoresProps) => {

	return (
		<div>
			<div className={cn("w-full grid grid-cols-2 gap-4 space-y-4")}>
				{data.indicadores &&
					data.indicadores.length > 0 &&
					data.indicadores.map((indicador, key) => (
						<div key={key} className={cn("w-full h-[124px] col-span-2 border border-gray-200 rounded-xl flex flex-col justify-between p-4 bg-white shadow-lg", key > 0 && "col-span-1")}>
							<div className="flex flex-row items-center justify-start">
								<h2 className="text-zinc-400 text-lg font-medium">{indicador.label}</h2>
							</div>
							<div className="text-3xl font-bold text-start">
								{indicador.value}
							</div>
						</div>
					))
				}
			</div>
		</div>
	);
};

export { Indicadores };
export type { IndicadoresProps }
