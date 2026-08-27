import { NextResponse } from 'next/server';
import { AlertaRepository } from '@/src/repository/AlertaRepository';
import { AlertaService } from '@/src/services/AlertaService';

const service = new AlertaService(
    new AlertaRepository()
);

// BUSCAR POR ID
export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const alerta = await service.buscarPorId(id);

        return NextResponse.json(alerta, {
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

        const alerta = await service.atualizar(
            id,
            body.assunto,
            body.id_pessoa
        );

        return NextResponse.json(alerta, {
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

        const alerta = await service.excluir(id);

        return NextResponse.json(alerta, {
            status: 200
        });

    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}