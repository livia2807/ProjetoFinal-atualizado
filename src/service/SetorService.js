import { Setor } from "@/src/models/Setor";

export class SetorService {

    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(nome) {

        if (!nome || nome.length < 2)
            throw new Error(
                "O nome deve ter no mínimo 2 caracteres."
            );

        return await this.repository.salvar(
            new Setor(nome)
        );
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {

        const setor =
            await this.repository.buscarPorId(id);

        if (!setor)
            throw new Error(
                "Setor não encontrado."
            );

        return setor;
    }

    async atualizar(id, nome) {

        if (!id)
            throw new Error(
                "ID é obrigatório para atualização."
            );

        if (!nome)
            throw new Error(
                "O nome é obrigatório."
            );

        await this.buscarPorId(id);

        return await this.repository.atualizar(
            id,
            new Setor(nome, id)
        );
    }

    async excluir(id) {

        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}