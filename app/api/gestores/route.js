import { NextResponse } from 'next/server';
import prisma from '@/src/lib/prisma';

export async function POST(req) {
  try {
    const body = await req.json();
    const { nome, email, senha } = body;

    if (!nome || nome.length < 2) {
      return NextResponse.json(
        { erro: 'O nome deve ter no mínimo 2 caracteres.' },
        { status: 400 }
      );
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { erro: 'Informe um e-mail válido.' },
        { status: 400 }
      );
    }
    if (!senha || senha.length < 4) {
      return NextResponse.json(
        { erro: 'A senha deve ter no mínimo 4 caracteres.' },
        { status: 400 }
      );
    }

    const existente = await prisma.gestores.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (existente) {
      return NextResponse.json(
        { erro: 'Já existe um gestor com este e-mail.' },
        { status: 400 }
      );
    }

    const gestor = await prisma.gestores.create({
      data: {
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        senha: senha,
      },
    });

    return NextResponse.json(
      { id: gestor.id, nome: gestor.nome, email: gestor.email },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json(
      { erro: e.message || 'Erro ao cadastrar gestor' },
      { status: 500 }
    );
  }
}