import { NextResponse } from 'next/server';
import { AlertaRepository } from '@/src/repository/AlertaRepository';
import { AlertaService } from '@/src/service/AlertaService';

const service = new AlertaService(
    new AlertaRepository()
);

export async function GET() {

    try {

        const alertas =
            await service.listar();

        return NextResponse.json(
            alertas,
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

        const alerta =
            await service.cadastrar(
                body.assunto,
                body.id_pessoa
            );

        return NextResponse.json(
            alerta,
            { status: 201 }
        );

    } catch (e) {

        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}