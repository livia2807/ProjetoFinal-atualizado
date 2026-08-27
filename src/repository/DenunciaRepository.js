import prisma from '@/src/lib/prisma';
import { Denuncia } from '../models/Denuncia';

export class DenunciaRepository {

    async salvar(obj) {
        return await prisma.denuncias.create({
            data: {
                assunto: obj.assunto,
                id_pessoa: obj.id_pessoa,
                id_setor: obj.id_setor
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.denuncias.findMany({
            include: {
                pessoa: true,
                setor: true
            }
        });

        return dados.map(d =>
            new Denuncia(
                d.assunto,
                d.id_pessoa,
                d.id_setor,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dado = await prisma.denuncias.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!dado) return null;

        return new Denuncia(
            dado.assunto,
            dado.id_pessoa,
            dado.id_setor,
            dado.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.denuncias.update({
            where: {
                id: Number(id)
            },
            data: {
                assunto: obj.assunto,
                id_pessoa: obj.id_pessoa,
                id_setor: obj.id_setor
            }
        });
    }

    async excluir(id) {
        return await prisma.denuncias.delete({
            where: {
                id: Number(id)
            }
        });
    }
}