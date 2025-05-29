import { usuariosData } from "@modules/adminWeb/types/usuarios.dto";
import { LeitoSelected } from "@modules/leitos/types/leitoSelected";
import { ColumnDef } from "@tanstack/react-table";

const columnsUsuarios: ColumnDef<usuariosData>[] = [
    {
        accessorKey: "usuario",
        header: "Usuário",
        cell: ({ row }) => {
            const value = row.original.usuario;
            return (
                <p>{value}</p>
            );
        },
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const value = row.original.email;
            return (
                <p>{value}</p>
            );
        },
    },
    {
        accessorKey: "dataNascimento",
        header: "Data de Nascimento",
        cell: ({ row }) => {
            const value = new Date(row.original.dataNascimento).getDate() + "/" +
                (new Date(row.original.dataNascimento).getMonth() + 1) + "/" +
                new Date(row.original.dataNascimento).getFullYear();

            return (
                <p>{value}</p>
            );
        },
    },
    {
        accessorKey: "cpf",
        header: "CPF",
        cell: ({ row }) => {
            const value = row.original.cpf;
            return (
                <p>{value}</p>
            );
        },
    },
];

export { columnsUsuarios };
