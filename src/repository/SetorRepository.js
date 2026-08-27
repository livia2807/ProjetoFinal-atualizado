import prisma from '@/src/lib/prisma';
import { Setor } from '../models/Setor';

export class SetorRepository {

    async salvar(obj) {
        return await prisma.setores.create({
            data: {
                nome: obj.nome
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.setores.findMany();

        return dados.map(d =>
            new Setor(
                d.nome,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dado = await prisma.setores.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!dado) return null;

        return new Setor(
            dado.nome,
            dado.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.setores.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: obj.nome
            }
        });
    }

    async excluir(id) {
        return await prisma.setores.delete({
            where: {
                id: Number(id)
            }
        });
    }
}