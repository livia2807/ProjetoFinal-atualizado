export class Cargo {
    id: number | null;
    nome: string;

    constructor(nome: string, id: number | null = null) {
        this.nome = nome;
        this.id = id;
    }
}