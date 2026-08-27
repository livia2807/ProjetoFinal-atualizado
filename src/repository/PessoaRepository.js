import prisma from '@/src/lib/prisma';
import { Pessoa } from '../models/Pessoa';

export class PessoaRepository {

    async salvar(obj) {
        return await prisma.pessoas.create({
            data: {
                nome: obj.nome,
                contato: obj.contato,
                email: obj.email,
                admissao: obj.admissao,
                id_setor: obj.id_setor,
                id_cargo: obj.id_cargo
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.pessoas.findMany({
            include: {
                setor: true,
                cargo: true
            }
        });

        return dados.map(d =>
            new Pessoa(
                d.nome,
                d.contato,
                d.email,
                d.admissao,
                d.id_setor,
                d.id_cargo,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dado = await prisma.pessoas.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                setor: true,
                cargo: true,
                alertas: true,
                denuncias: true
            }
        });

        if (!dado) return null;

        return new Pessoa(
            dado.nome,
            dado.contato,
            dado.email,
            dado.admissao,
            dado.id_setor,
            dado.id_cargo,
            dado.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.pessoas.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: obj.nome,
                contato: obj.contato,
                email: obj.email,
                admissao: obj.admissao,
                id_setor: obj.id_setor,
                id_cargo: obj.id_cargo
            }
        });
    }

    async excluir(id) {
        return await prisma.pessoas.delete({
            where: {
                id: Number(id)
            }
        });
    }
}