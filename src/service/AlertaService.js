import { Alerta } from "@/src/models/Alerta";

export class AlertaService {

    constructor(repository) {
        this.repository = repository;
    }

    async cadastrar(assunto, id_pessoa) {

        if (!assunto)
            throw new Error(
                "O assunto é obrigatório."
            );

        if (!id_pessoa)
            throw new Error(
                "A pessoa é obrigatória."
            );

        return await this.repository.salvar(
            new Alerta(
                assunto,
                Number(id_pessoa)
            )
        );
    }

    async listar() {
        return await this.repository.listarTodos();
    }

    async buscarPorId(id) {

        const alerta =
            await this.repository.buscarPorId(id);

        if (!alerta)
            throw new Error(
                "Alerta não encontrado."
            );

        return alerta;
    }

    async atualizar(
        id,
        assunto,
        id_pessoa
    ) {

        if (!id)
            throw new Error(
                "ID é obrigatório."
            );

        if (!assunto || !id_pessoa)
            throw new Error(
                "Assunto e pessoa são obrigatórios."
            );

        await this.buscarPorId(id);

        return await this.repository.atualizar(
            id,
            new Alerta(
                assunto,
                Number(id_pessoa),
                id
            )
        );
    }

    async excluir(id) {

        await this.buscarPorId(id);

        return await this.repository.excluir(id);
    }
}