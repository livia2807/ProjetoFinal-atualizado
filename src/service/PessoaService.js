import { Pessoa } from "@/src/models/Pessoa";

export class PessoaService {

    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(
        nome,
        contato,
        email,
        admissao,
        id_setor,
        id_cargo
    ) {

        if (!nome || nome.length < 2)
            throw new Error(
                "O nome deve ter no mínimo 2 caracteres."
            );

        if (!contato)
            throw new Error("O contato é obrigatório.");

        if (!email)
            throw new Error("O e-mail é obrigatório.");

        if (!admissao)
            throw new Error(
                "A data de admissão é obrigatória."
            );

        if (!id_setor)
            throw new Error("O setor é obrigatório.");

        if (!id_cargo)
            throw new Error("O cargo é obrigatório.");

        const pessoa = new Pessoa(
            nome,
            contato,
            email,
            new Date(admissao),
            Number(id_setor),
            Number(id_cargo)
        );

        return await this.repository.salvar(pessoa);
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {

        const pessoa =
            await this.repository.buscarPorId(id);

        if (!pessoa)
            throw new Error(
                "Pessoa não encontrada."
            );

        return pessoa;
    }

    async atualizar(
        id,
        nome,
        contato,
        email,
        admissao,
        id_setor,
        id_cargo
    ) {

        if (!id)
            throw new Error(
                "ID é obrigatório para atualização."
            );

        if (
            !nome ||
            !contato ||
            !email ||
            !admissao ||
            !id_setor ||
            !id_cargo
        ) {
            throw new Error(
                "Todos os campos são obrigatórios."
            );
        }

        await this.buscarPorId(id);

        const pessoaAtualizada = new Pessoa(
            nome,
            contato,
            email,
            new Date(admissao),
            Number(id_setor),
            Number(id_cargo),
            id
        );

        return await this.repository.atualizar(
            id,
            pessoaAtualizada
        );
    }

    async excluir(id) {

        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}