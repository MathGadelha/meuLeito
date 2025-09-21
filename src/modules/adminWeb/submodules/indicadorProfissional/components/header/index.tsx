import { Card } from "@components/ui/card";
import { ApexOptions } from "apexcharts";
import dayjs from "dayjs";
import { useState } from "react";
import ApexChart from "react-apexcharts";
import { GoTasklist } from "react-icons/go";

function HeaderTasks() {
    const [completed, setCompleted] = useState(26);
    const [pending, setPeding] = useState(7);
    const [delayed, setDelayed] = useState(1);
    const [total, setTotal] = useState(34);

    const series = [completed, pending, delayed];

    const date = dayjs().format("DD/MM/YYYY");

    const options: ApexOptions = {
        chart: {
            toolbar: {
                show: true,
                tools: {
                    download: true,
                },
                export: {
                    png: {
                        filename: `Gráfico de acompanhamento ${date}`,
                    },
                    svg: {
                        filename: `Gráfico de acompanhamento ${date}`,
                    },
                    csv: {
                        filename: `Gráfico de acompanhamento ${date}`,
                    },
                },
                offsetY: 10,
                offsetX: -350,
            },
            type: "pie",
        },
        labels: ["Tarefas Concluidas", "Tarefas Pendentes", "Tarefas Atrasadas"],
        legend: {
            position: "right",
            offsetY: 10,
            onItemHover: {
                highlightDataSeries: true,
            },
            markers: {
                size: 10,
            },
            fontSize: "14px",
            height: 100,
        },
        colors: ["#22C55E", "#0EA5E9", "#EF4444"],
        responsive: [
            {
                breakpoint: 100, // 0 - 100
                options: {
                    chart: {
                        width: 200, // 100 - 200
                    },
                    legend: {
                        position: "bottom",
                    },
                },
            },
        ],
    };

    return (
        <header className="w-full bg-white h-fit flex flex-col gap-5">
            <Card className="flex flex-col justify-center items-center p-4 mt-5">
                <div className="flex flex-col w-2/4 items-center">
                    <ApexChart
                        options={options}
                        series={series}
                        type="pie"
                        width={350}
                        height={350}
                    />
                </div>
            </Card>
            <p className="mb-5">Total de chamados: {total}</p>
        </header>
    );
}

export { HeaderTasks };

