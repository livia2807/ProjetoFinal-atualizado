import prisma from '@/src/lib/prisma';

export class PessoaRepository {

    async salvar(obj) {
        return await prisma.pessoas.create({
            data: {
                nome: obj.nome,
                contato: obj.contato,
                email: obj.email,
                admissao: obj.admissao,
                id_setor: Number(obj.id_setor),
                id_cargo: Number(obj.id_cargo),
            },
        });
    }

    async listarTodos() {
        const pessoas = await prisma.pessoas.findMany({
            orderBy: { id: 'desc' },
        });

        let setores = [];
        let cargos = [];
        try {
            setores = await prisma.setores.findMany();
            cargos = await prisma.cargos.findMany();
        } catch (_) {}

        const setorById = Object.fromEntries(setores.map((s) => [s.id, s]));
        const cargoById = Object.fromEntries(cargos.map((c) => [c.id, c]));

        return pessoas.map((p) => ({
            id: p.id,
            nome: p.nome,
            contato: p.contato,
            email: p.email,
            admissao: p.admissao,
            id_setor: p.id_setor,
            id_cargo: p.id_cargo,
            setor: setorById[p.id_setor]
                ? { id: setorById[p.id_setor].id, nome: setorById[p.id_setor].nome }
                : null,
            cargo: cargoById[p.id_cargo]
                ? { id: cargoById[p.id_cargo].id, nome: cargoById[p.id_cargo].nome }
                : null,
        }));
    }

    async buscarPorId(id) {
        return await prisma.pessoas.findUnique({
            where: { id: Number(id) },
        });
    }

    async atualizar(id, obj) {
        return await prisma.pessoas.update({
            where: { id: Number(id) },
            data: {
                nome: obj.nome,
                contato: obj.contato,
                email: obj.email,
                admissao: obj.admissao,
                id_setor: Number(obj.id_setor),
                id_cargo: Number(obj.id_cargo),
            },
        });
    }

    async excluir(id) {
        return await prisma.pessoas.delete({
            where: { id: Number(id) },
        });
    }
}