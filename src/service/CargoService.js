import { Cargo } from "@/src/models/Cargo";

export class CargoService {

    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(nome) {

        if (!nome || nome.length < 2)
            throw new Error(
                "O nome deve ter no mínimo 2 caracteres."
            );

        return await this.repository.salvar(
            new Cargo(nome)
        );
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {

        const cargo =
            await this.repository.buscarPorId(id);

        if (!cargo)
            throw new Error(
                "Cargo não encontrado."
            );

        return cargo;
    }

    async atualizar(id, nome) {

        if (!id)
            throw new Error(
                "ID é obrigatório."
            );

        if (!nome)
            throw new Error(
                "O nome é obrigatório."
            );

        await this.buscarPorId(id);

        return await this.repository.atualizar(
            id,
            new Cargo(nome, id)
        );
    }

    async excluir(id) {

        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}