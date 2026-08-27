import { NextResponse } from 'next/server';
import { DenunciaRepository } from '@/src/repository/DenunciaRepository';
import { DenunciaService } from '@/src/services/DenunciaService';

const service = new DenunciaService(
    new DenunciaRepository()
);

// BUSCAR POR ID
export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const denuncia =
            await service.buscarPorId(id);

        return NextResponse.json(denuncia, {
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

        const denuncia =
            await service.atualizar(
                id,
                body.assunto,
                body.id_pessoa,
                body.id_setor
            );

        return NextResponse.json(denuncia, {
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

        const denuncia =
            await service.excluir(id);

        return NextResponse.json(denuncia, {
            status: 200
        });

    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}