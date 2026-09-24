import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.__rs_prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.__rs_prisma = prisma;

export async function GET() {
  try {
    const denuncias = await prisma.denuncias.findMany({
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(denuncias);
  } catch (e) {
    console.error('[GET /api/denuncias]', e);
    return NextResponse.json(
      { erro: String(e?.message || e), codigo: e?.code || null },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const denuncia = await prisma.denuncias.create({
      data: {
        assunto: String(body.assunto || '').trim(),
        id_pessoa: Number(body.id_pessoa),
        id_setor: Number(body.id_setor),
      },
    });
    return NextResponse.json(denuncia, { status: 201 });
  } catch (e) {
    console.error('[POST /api/denuncias]', e);
    return NextResponse.json(
      { erro: String(e?.message || e), codigo: e?.code || null },
      { status: 400 }
    );
  }
}