import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.__rs_prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.__rs_prisma = prisma;

export async function GET() {
  try {
    const alertas = await prisma.alertas.findMany({
      orderBy: { id: 'desc' },
    });
    return NextResponse.json(alertas);
  } catch (e) {
    console.error('[GET /api/alertas]', e);
    return NextResponse.json(
      { erro: String(e?.message || e), codigo: e?.code || null },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const alerta = await prisma.alertas.create({
      data: {
        assunto: String(body.assunto || '').trim(),
        id_pessoa: Number(body.id_pessoa),
      },
    });
    return NextResponse.json(alerta, { status: 201 });
  } catch (e) {
    console.error('[POST /api/alertas]', e);
    return NextResponse.json(
      { erro: String(e?.message || e), codigo: e?.code || null },
      { status: 400 }
    );
  }
}