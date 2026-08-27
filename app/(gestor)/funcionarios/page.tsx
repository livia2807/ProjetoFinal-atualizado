import api from '@/app/lib/api'
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
      {/* Componente extraído como solicitado */}
      <ListaFuncionarios funcionarios={funcionarios} />
    </div>
  )
}