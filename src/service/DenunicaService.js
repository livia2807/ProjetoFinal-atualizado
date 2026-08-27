import { Denuncia } from "@/src/models/Denuncia";

export class DenunciaService {

    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(
        assunto,
        id_pessoa,
        id_setor
    ) {

        if (!assunto)
            throw new Error(
                "O assunto é obrigatório."
            );

        if (!id_pessoa)
            throw new Error(
                "A pessoa é obrigatória."
            );

        if (!id_setor)
            throw new Error(
                "O setor é obrigatório."
            );

        return await this.repository.salvar(
            new Denuncia(
                assunto,
                Number(id_pessoa),
                Number(id_setor)
            )
        );
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {

        const denuncia =
            await this.repository.buscarPorId(id);

        if (!denuncia)
            throw new Error(
                "Denúncia não encontrada."
            );

        return denuncia;
    }

    async atualizar(
        id,
        assunto,
        id_pessoa,
        id_setor
    ) {

        if (!id)
            throw new Error(
                "ID é obrigatório."
            );

        if (
            !assunto ||
            !id_pessoa ||
            !id_setor
        ) {
            throw new Error(
                "Todos os campos são obrigatórios."
            );
        }

        await this.buscarPorId(id);

        return await this.repository.atualizar(
            id,
            new Denuncia(
                assunto,
                Number(id_pessoa),
                Number(id_setor),
                id
            )
        );
    }

    async excluir(id) {

        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}