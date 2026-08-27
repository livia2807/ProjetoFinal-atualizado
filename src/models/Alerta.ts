export class Alerta {
    id: number | any;
    assunto: String;
    id_pessoa: number;

    constructor(
        assunto: string,
        id_pessoa: number,
        id: any = null
    ) {
        this.id = id;
        this.assunto = assunto;
        this.id_pessoa = id_pessoa;
    }
}