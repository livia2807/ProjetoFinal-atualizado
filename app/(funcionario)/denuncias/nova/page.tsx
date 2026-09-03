import FormularioDenuncia from '@/components/funcionario/FormularioDenuncia'

export default function NovaDenunciaPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-display text-2xl text-[#444444] mb-1">Nova Denúncia</h2>
        <p className="text-[#777777] text-sm">Descreva o local ou situação de risco identificada</p>

      </div>
      {/* Lógica extraída para o componente cliente */}
      <FormularioDenuncia />
    </div>
  )
}