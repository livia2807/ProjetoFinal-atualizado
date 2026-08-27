import { NextResponse } from 'next/server';
import { SetorRepository } from '@/src/repository/SetorRepository';
import { SetorService } from '@/src/services/SetorService';

const service = new SetorService(
    new SetorRepository()
);

export async function GET() {

    try {

        const setores =
            await service.listar();

        return NextResponse.json(
            setores,
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

        const setor =
            await service.cadastrar(
                body.nome
            );

        return NextResponse.json(
            setor,
            { status: 201 }
        );

    } catch (e) {

        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}