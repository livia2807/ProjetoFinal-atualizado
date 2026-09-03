'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ListaFuncionarios from '@/components/gestor/ListaFuncionarios'
import api from '@/app/lib/api'

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function carregar() {
      try {
        const res = await api.get('/pessoas')
        setFuncionarios(res.data || [])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    carregar()
  }, [])

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-[#444444] mb-1">
            Registros dos Funcionários
          </h2>
          <p className="text-[#777777] text-sm">
            {loading ? 'Carregando...' : `${funcionarios.length} funcionários no banco de dados`}
          </p>
        </div>

        <Link
          href="/cadastro"
          className="px-4 py-2.5 rounded-xl bg-[#777777] text-white text-sm font-700 hover:bg-[#555555] transition-colors"
        >
          + Novo Funcionário
        </Link>
      </div>

      {loading ? (
        <p>Carregando funcionários...</p>
      ) : (
        <ListaFuncionarios funcionarios={funcionarios} />
      )}
    </div>
  )
}

/*import api from '@/app/lib/api'
import ListaFuncionarios from '@/components/gestor/ListaFuncionarios'

async function getFuncionarios() {
  const res = await api.get('/pessoas')
  return res.data
}

export default async function FuncionariosPage() {
  const funcionarios = await getFuncionarios()

  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-[#444444] mb-1">Registros dos Funcionários</h2>
        <p className="text-[#777777] text-sm">{funcionarios.length} funcionários no banco de dados</p>
      </div>
      {/* Componente extraído como solicitado *//*}
   /*   <ListaFuncionarios funcionarios={funcionarios} />
    </div>
  )
}*/