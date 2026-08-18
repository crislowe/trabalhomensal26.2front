# Sistema de Controle de Estoque - Cafeteria (Front3)

Trabalho acadêmico de Desenvolvimento Web Frontend construído com Angular e Material Design Bootstrap (MDB).

## Descrição do Projeto
Sistema de gerenciamento de estoque para uma cafeteria. Permite cadastrar, listar, editar e excluir produtos (cafés, salgados, doces), com suporte a dois níveis de usuário (Administrador e Usuário Comum).

## Funcionalidades e Requisitos
- **Página de Login**: Autenticação com seleção de perfil (Admin ou Usuário Comum).
- **Usuário Comum**: Modo de leitura. Visualiza os produtos e estoque sem opção de alteração.
- **Administrador**: Possui permissões totais para cadastrar novos produtos, editar itens e excluir registros.
- **CRUD Mockado**: Gerenciamento de dados via `ProdutoService` em memória/localStorage.
- **Roteamento com Children**: Rota pai `/painel` com a estrutura de filhas (`lista`, `novo`, `editar/:id`).
- **MDB Bootstrap**: Interface estritamente baseada no padrão visual nativo do Material Design Bootstrap.

## Como Executar
1. Instalar as dependências: `npm install`
2. Iniciar o servidor local: `npm start` ou `ng serve`
3. Acessar em seu navegador: `http://localhost:4200`
