import { NextResponse } from 'next/server';
import { CargoRepository } from '@/src/repository/CargoRepository';
import { CargoService } from '@/src/services/CargoService';

const service = new CargoService(
    new CargoRepository()
);

export async function GET() {

    try {

        const cargos =
            await service.listar();

        return NextResponse.json(
            cargos,
            { status: 200 }
        );

    } catch (e) {

        return NextResponse.json(
            { erro: e.message },
            { status: 500 }
        );
    }
}

export async function POST(req) {

    try {

        const body = await req.json();

        const cargo =
            await service.cadastrar(
                body.nome
            );

        return NextResponse.json(
            cargo,
            { status: 201 }
        );

    } catch (e) {

        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}