import { NextResponse } from 'next/server';
import { CargoRepository } from '@/src/repository/CargoRepository';
import { CargoService } from '@/src/services/CargoService';

const service = new CargoService(
    new CargoRepository()
);

// BUSCAR POR ID
export async function GET(req, { params }) {
    try {
        const { id } = await params;

        const cargo = await service.buscarPorId(id);

        return NextResponse.json(cargo, {
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

        const cargo = await service.atualizar(
            id,
            body.nome
        );

        return NextResponse.json(cargo, {
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

        const cargo = await service.excluir(id);

        return NextResponse.json(cargo, {
            status: 200
        });

    } catch (e) {
        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}