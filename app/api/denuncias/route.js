import { NextResponse } from 'next/server';
import { DenunciaRepository } from '@/src/repository/DenunciaRepository';
import { DenunciaService } from '../../../src/service/DenunicaService';

const service = new DenunciaService(
  new DenunciaRepository()
);

export async function GET() {
  try {
    const denuncias = await service.listar();

    return NextResponse.json(
      denuncias,
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

    const denuncia = await service.cadastrar(
      body.descricao,
      body.data,
      body.id_pessoa,
      body.id_setor
    );

    return NextResponse.json(
      denuncia,
      { status: 201 }
    );

  } catch (e) {
    return NextResponse.json(
      { erro: e.message },
      { status: 400 }
    );
  }
}