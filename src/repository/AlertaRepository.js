import prisma from '@/src/lib/prisma';
import { Alerta } from '../models/Alerta';

export class AlertaRepository {

    async salvar(obj) {
        return await prisma.alertas.create({
            data: {
                assunto: obj.assunto,
                id_pessoa: obj.id_pessoa
            }
        });
    }

    async listarTodos() {
        const dados = await prisma.alertas.findMany({
            include: {
                pessoa: true
            }
        });

        return dados.map(d =>
            new Alerta(
                d.assunto,
                d.id_pessoa,
                d.id
            )
        );
    }

    async buscarPorId(id) {
        const dado = await prisma.alertas.findUnique({
            where: {
                id: Number(id)
            }
        });

        if (!dado) return null;

        return new Alerta(
            dado.assunto,
            dado.id_pessoa,
            dado.id
        );
    }

    async atualizar(id, obj) {
        return await prisma.alertas.update({
            where: {
                id: Number(id)
            },
            data: {
                assunto: obj.assunto,
                id_pessoa: obj.id_pessoa
            }
        });
    }

    async excluir(id) {
        return await prisma.alertas.delete({
            where: {
                id: Number(id)
            }
        });
    }
}