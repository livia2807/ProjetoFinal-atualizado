# RotaSegura — Next.js

Projeto RotaSegura convertido para Next.js, com componentes, hooks, interfaces e dados mocados separados.

## Estrutura principal

- `app/` — páginas e estilos globais
- `app/cadastro/` — página visual de cadastro de funcionário
- `components/` — componentes da aplicação
- `hooks/` — lógica original da aplicação
- `interfaces/` — tipos TypeScript
- `data/` — dados mocados

## Executar

```bash
npm install
npm run dev
```

A aplicação principal fica em `http://localhost:3000` e o cadastro visual em `http://localhost:3000/cadastro`.

O formulário de cadastro é somente visual nesta etapa; a lógica existente de login, denúncias e alertas não foi alterada.
