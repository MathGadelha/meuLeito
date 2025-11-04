import { leitosAdmin } from "@modules/adminLeitos/services/getLeitos/getLeitos.dto";
import { ColumnDef } from "@tanstack/react-table";

const columnsLeitos: ColumnDef<leitosAdmin>[] = [
    {
        accessorKey: "leito",
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
                <p>{value}</p>
            );
        },
    },
    // {
    //     accessorKey: "nome",
    //     header: "Paciente",
    //     cell: ({ row }) => {
    //         const value = row.original.ocupado && row.original.paciente ? row.original.paciente.nome : "";
    //         return (
    //             <p>{value}</p>
    //         );
    //     },
    // },
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

export { columnsLeitos };
