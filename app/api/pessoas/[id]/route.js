import { NextResponse } from 'next/server';
import { PessoaRepository } from '@/src/repository/PessoaRepository';
import { PessoaService } from '@/src/service/PessoaService';

const service = new PessoaService(
    new PessoaRepository()
);

export async function GET(req, { params }) {

    try {

        const { id } = await params;

        const pessoa =
            await service.buscarPorId(id);

        return NextResponse.json(
            pessoa,
            { status: 200 }
        );

    } catch (e) {

        return NextResponse.json(
            { erro: e.message },
            { status: 404 }
        );
    }
}

export async function PUT(req, { params }) {

    try {

        const { id } = await params;

        const body = await req.json();

        const pessoa =
            await service.atualizar(
                id,
                body.nome,
                body.contato,
                body.email,
                body.admissao,
                body.id_setor,
                body.id_cargo
            );

        return NextResponse.json(
            pessoa,
            { status: 200 }
        );

    } catch (e) {

        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}

export async function DELETE(req, { params }) {

    try {

        const { id } = await params;

        const pessoa =
            await service.excluir(id);

        return NextResponse.json(
            pessoa,
            { status: 200 }
        );

    } catch (e) {

        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}