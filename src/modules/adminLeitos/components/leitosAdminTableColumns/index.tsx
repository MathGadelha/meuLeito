import { leitosAdmin } from "@modules/adminLeitos/services/getLeitos/getLeitos.dto";
// import { LeitoSelected } from "@modules/leitos/types/leitoSelected";
import { ColumnDef } from "@tanstack/react-table";

const columnsLeitosAdmin: ColumnDef<leitosAdmin>[] = [
    {
        accessorKey: "label",
        header: "Leito",
        cell: ({ row }) => {
            const value = row.original.Nome
            return (
                <p>{value}</p>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const value = row.original.Status;
            return (
                <p className="bg-yellow">{value}</p>
            );
        },
    },
    {
        accessorKey: "setor",
        header: "Setor",
        cell: ({ row }) => {
            const value = row.original.nome_setor;
            return (
                <p>{value}</p>
            );
        },
    },
];

export { columnsLeitosAdmin };
