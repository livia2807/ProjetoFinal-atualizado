import prisma from '@/src/lib/prisma';
import { Cargo } from '../models/Cargo';

export class CargoRepository {

    async salvar(obj) {
        return await prisma.cargos.create({
            data: {
                nome: obj.nome
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.cargos.findMany();

        return dados.map(d =>
            new Cargo(
                d.nome,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dado = await prisma.cargos.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!dado) return null;

        return new Cargo(
            dado.nome,
            dado.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.cargos.update({
            where: {
                id: Number(id)
            },
            data: {
                nome: obj.nome
            }
        });
    }

    async excluir(id) {
        return await prisma.cargos.delete({
            where: {
                id: Number(id)
            }
        });
    }
}