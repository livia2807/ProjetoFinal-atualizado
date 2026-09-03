import { NextResponse } from 'next/server';
import { SetorRepository } from '@/src/repository/SetorRepository';
import { SetorService } from '@/src/service/SetorService';

const service = new SetorService(
    new SetorRepository()
);

// BUSCAR POR ID
export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const setor = await service.buscarPorId(id);

        return NextResponse.json(setor, {
            status: 200
        });

    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 404 }
        );
    }
}

// ATUALIZAR
export async function PUT(req, { params }) {
    try {
        const { id } = await params;

        const body = await req.json();

        const setor = await service.atualizar(
            id,
            body.nome
        );

        return NextResponse.json(setor, {
            status: 200
        });

    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}

// EXCLUIR
export async function DELETE(req, { params }) {
    try {
        const { id } = await params;

        const setor = await service.excluir(id);

        return NextResponse.json(setor, {
            status: 200
        });

    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}