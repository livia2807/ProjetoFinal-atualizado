import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;
const prisma = globalForPrisma.__rs_prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.__rs_prisma = prisma;

export async function GET() {
  try {
    const pessoas = await prisma.pessoas.findMany({
      orderBy: { id: 'desc' },
    });

    let setorById = {};
    let cargoById = {};
    try {
      const [setores, cargos] = await Promise.all([
        prisma.setores.findMany(),
        prisma.cargos.findMany(),
      ]);
      setorById = Object.fromEntries(setores.map((s) => [s.id, s]));
      cargoById = Object.fromEntries(cargos.map((c) => [c.id, c]));
    } catch (_) {}

    const lista = pessoas.map((p) => ({
      id: p.id,
      nome: p.nome,
      contato: p.contato,
      email: p.email,
      admissao: p.admissao,
      id_setor: p.id_setor,
      id_cargo: p.id_cargo,
      setor: setorById[p.id_setor]
        ? { id: setorById[p.id_setor].id, nome: setorById[p.id_setor].nome }
        : null,
      cargo: cargoById[p.id_cargo]
        ? { id: cargoById[p.id_cargo].id, nome: cargoById[p.id_cargo].nome }
        : null,
    }));

    return NextResponse.json(lista);
  } catch (e) {
    console.error('[GET /api/pessoas]', e);
    return NextResponse.json(
      { erro: String(e?.message || e), codigo: e?.code || null },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const nome = String(body.nome || '').trim();
    const contato = String(body.contato || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const admissao = body.admissao;
    const id_setor = Number(body.id_setor);
    let id_cargo = body.id_cargo ? Number(body.id_cargo) : null;
    const cargoNome = String(body.cargo || '').trim();

    if (!nome || nome.length < 2) {
      return NextResponse.json({ erro: 'Nome inválido.' }, { status: 400 });
    }
    if (!contato) {
      return NextResponse.json({ erro: 'Contato obrigatório.' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ erro: 'E-mail inválido.' }, { status: 400 });
    }
    if (!admissao) {
      return NextResponse.json({ erro: 'Data obrigatória.' }, { status: 400 });
    }
    if (!id_setor) {
      return NextResponse.json({ erro: 'Selecione um setor.' }, { status: 400 });
    }

    const existe = await prisma.pessoas.findUnique({ where: { email } });
    if (existe) {
      return NextResponse.json(
        { erro: 'Já existe um funcionário com este e-mail.' },
        { status: 400 }
      );
    }

    if (!id_cargo) {
      if (!cargoNome) {
        return NextResponse.json({ erro: 'Informe o cargo.' }, { status: 400 });
      }
      const c = await prisma.cargos.create({ data: { nome: cargoNome } });
      id_cargo = c.id;
    }

    const dataAdmissao = new Date(admissao);
    if (Number.isNaN(dataAdmissao.getTime())) {
      return NextResponse.json({ erro: 'Data inválida.' }, { status: 400 });
    }

    const pessoa = await prisma.pessoas.create({
      data: {
        nome,
        contato,
        email,
        admissao: dataAdmissao,
        id_setor,
        id_cargo,
      },
    });

    return NextResponse.json(pessoa, { status: 201 });
  } catch (e) {
    console.error('[POST /api/pessoas]', e);
    const t = String(e?.message || '');
    if (e?.code === 'P2002' || t.includes('pessoas_email_key')) {
      return NextResponse.json(
        { erro: 'Já existe um funcionário com este e-mail.' },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { erro: String(e?.message || e), codigo: e?.code || null },
      { status: 500 }
    );
  }
}