import prisma from '@/src/lib/prisma';

export class DenunciaRepository {

    async salvar(obj) {
        return await prisma.denuncias.create({
            data: {
                assunto: obj.assunto,
                id_pessoa: Number(obj.id_pessoa),
                id_setor: Number(obj.id_setor),
            },
        });
    }

    async listarTodos() {
        return await prisma.denuncias.findMany({
            orderBy: { id: 'desc' },
        });
    }

    async buscarPorId(id) {
        return await prisma.denuncias.findUnique({
            where: { id: Number(id) },
        });
    }

    async atualizar(id, obj) {
        return await prisma.denuncias.update({
            where: { id: Number(id) },
            data: {
                assunto: obj.assunto,
                id_pessoa: Number(obj.id_pessoa),
                id_setor: Number(obj.id_setor),
            },
        });
    }

    async excluir(id) {
        return await prisma.denuncias.delete({
            where: { id: Number(id) },
        });
    }
}