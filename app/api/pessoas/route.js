import { NextResponse } from 'next/server';
import { PessoaRepository } from '@/src/repository/PessoaRepository';
import {PessoaService} from '@/src/service/PessoaService';

const service = new PessoaService(
    new PessoaRepository()
);

export async function GET() {

    try {

        const pessoas =
            await service.listar();

        return NextResponse.json(
            pessoas,
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

        const pessoa =
            await service.cadastrar(
                body.nome,
                body.contato,
                body.email,
                body.admissao,
                body.id_setor,
                body.id_cargo
            );

        return NextResponse.json(
            pessoa,
            { status: 201 }
        );

    } catch (e) {

        return NextResponse.json(
            { erro: e.message },
            { status: 400 }
        );
    }
}