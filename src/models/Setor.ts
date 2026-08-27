export class Setor {
    id: number | any;
    nome: String;

    constructor(nome: string, id: any = null) {
        this.id = id;
        this.nome = nome;
    }
}