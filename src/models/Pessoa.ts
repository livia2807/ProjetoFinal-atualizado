export class Pessoa {
    id: number | any;
    nome: String;
    contato: String;
    email: String;
    admissao: Date;
    id_setor: number;
    id_cargo: number;

    constructor(
        nome: string,
        contato: string,
        email: string,
        admissao: Date,
        id_setor: number,
        id_cargo: number,
        id: any = null
    ) {
        this.id = id;
        this.nome = nome;
        this.contato = contato;
        this.email = email;
        this.admissao = admissao;
        this.id_setor = id_setor;
        this.id_cargo = id_cargo;
    }
}