import prisma from '@/src/lib/prisma';

export class AlertaRepository {

    async salvar(obj) {
        return await prisma.alertas.create({
            data: {
                assunto: obj.assunto,
                id_pessoa: Number(obj.id_pessoa),
            },
        });
    }

    async listarTodos() {
        return await prisma.alertas.findMany({
            orderBy: { id: 'desc' },
        });
    }

    async buscarPorId(id) {
        return await prisma.alertas.findUnique({
            where: { id: Number(id) },
        });
    }

    async atualizar(id, obj) {
        return await prisma.alertas.update({
            where: { id: Number(id) },
            data: {
                assunto: obj.assunto,
                id_pessoa: Number(obj.id_pessoa),
            },
        });
    }

    async excluir(id) {
        return await prisma.alertas.delete({
            where: { id: Number(id) },
        });
    }
}