# 🛡️ RotaSegura

**Segurança no campo é prioridade.**

Sistema web desenvolvido para gestão de segurança do trabalho no meio rural/agropecuário.  
Permite que funcionários reportem riscos (denúncias) e que gestores acompanhem alertas, funcionários e ocorrências em tempo real.

---

## 📋 Sobre o Projeto

O **RotaSegura** é uma aplicação full-stack construída com **Next.js**, focada em facilitar a comunicação e o gerenciamento de riscos de segurança no ambiente de trabalho agrícola.

### Funcionalidades principais

#### 👷 Área do Funcionário
- Login simples por seleção de funcionário
- Painel pessoal
- Registro de novas denúncias/riscos (hazard reports)
- Visualização de alertas recebidos

#### 👔 Área do Gestor
- Login com senha
- Dashboard com visão geral
- Gerenciamento de funcionários
- Acompanhamento e atualização de status das denúncias
- Envio de alertas para funcionários
- Página de cadastro visual de novos funcionários

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia       | Uso                          |
|------------------|------------------------------|
| **Next.js**      | Framework React (App Router) |
| **TypeScript**   | Tipagem estática             |
| **Tailwind CSS** | Estilização                  |
| **Prisma**       | ORM + schema do banco        |
| **MySQL**        | Banco de dados               |
| **SweetAlert2**  | Alertas e feedbacks visuais  |
| **Axios**        | Requisições HTTP             |

---

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
