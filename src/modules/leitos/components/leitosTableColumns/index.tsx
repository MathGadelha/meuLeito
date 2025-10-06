import { LeitoSelected } from "@modules/leitos/types/leitoSelected";
import { ColumnDef } from "@tanstack/react-table";

const columnsLeitos: ColumnDef<LeitoSelected>[] = [
    {
        accessorKey: "label",
        header: "Leito",
        cell: ({ row }) => {
            const value = row.original.label
            return (
                <p>{value}</p>
            );
        },
    },
    {
        accessorKey: "ocupado",
        header: "Ocupado",
        cell: ({ row }) => {
            const value = row.original.ocupado ? "Sim" : "Não";
            return (
                <p>{value}</p>
            );
        },
    },
    {
        accessorKey: "nome",
        header: "Paciente",
        cell: ({ row }) => {
            const value = row.original.ocupado && row.original.paciente ? row.original.paciente.nome : "";
            return (
                <p>{value}</p>
            );
        },
    },
    {
        accessorKey: "chamados",
        header: "Chamados",
        cell: ({ row }) => {
            const value = row.original.chamados || 0;
            return (
                <p>{value}</p>
            );
        },
    },
];

export { columnsLeitos };
