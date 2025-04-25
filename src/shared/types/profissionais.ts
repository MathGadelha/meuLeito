import { Pagination } from "./pagination.dto";

type ListProfissionaisInPut = Pagination & {
    nome_profissional?: string;
    id?: number;
    page: number;
    size: number;
}

type ListProfissionaisOutPut = {
    data: ProfissionalData[];
    page: number;
    size: number
    total: number;
}

type ExperienciaProfissional = {
    id: number
    nome: string
}

type FormacaoProfissional =  {
    id: number
    nome_curso: string
    tipo_curso: "B" | "M" | "D" | "E" | "O"
    nome_instituicao: string
    data_inicio: Date
    data_termino: Date | null
}

type ProfissionalData = {
    id: number;
    uf_crp: string;
    numero_crp: number;
    descricao_pessoal: string;
    resumo_profissional: string;
    link_video_apresentacao: string;
    link_linkedin: string;
    link_instagram: string;
    experiencias_profissionais: ExperienciaProfissional[]
    formacoes_profissionais: FormacaoProfissional[]
    id_pessoa: number;
    created_by: number;
    updated_by: string;
    deleted_by: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    foto: null;
    id_1: number;
    nome: string;
    cpf: string;
    cnpj: string;
    sexo: string;
    email: string;
    fone: string;
    created_by_1: number;
    updated_by_1: number;
    deleted_by_1: number;
    created_at_1: string;
    updated_at_1: string;
    deleted_at_1: string;
    data_nascimento: string;
}

export type { ListProfissionaisInPut, ListProfissionaisOutPut, ProfissionalData, ExperienciaProfissional, FormacaoProfissional }