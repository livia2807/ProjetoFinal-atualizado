export class Denuncia {
    id: number | any;
    assunto: String;
    id_pessoa: number;
    id_setor: number;

    constructor(
        assunto: string,
        id_pessoa: number,
        id_setor: number,
        id: any = null
    ) {
        this.id = id;
        this.assunto = assunto;
        this.id_pessoa = id_pessoa;
        this.id_setor = id_setor;
    }
}