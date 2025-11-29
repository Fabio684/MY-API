# My API - API REST com Node.js, Express e Supabase

Projeto de API REST com CRUD completo, autenticação JWT via Supabase e banco de dados PostgreSQL.

## Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Servidor estará em http://localhost:3001
```

## Configurar Credenciais

1. Copie `.env.example` para `.env`:
```bash
cp .env.example .env
```

2. Preencha com suas credenciais do Supabase:
```
SUPABASE_URL=sua_url
SUPABASE_ANON_KEY=sua_chave_publica
SUPABASE_SERVICE_ROLE_KEY=sua_chave_admin
PORT=3001
```

## Endpoints da API

### Públicos (sem autenticação)
```
GET  /health                 Status da API
GET  /items                  Listar todos os itens
GET  /items/:id              Buscar um item pelo ID
```

### Protegidos (requer token JWT)
```
POST   /items                Criar novo item
PUT    /items/:id            Atualizar item
PATCH  /items/:id            Atualização parcial
DELETE /items/:id            Deletar item
```

**Enviar token:**
```
Authorization: Bearer seu_token_jwt
```

## Exemplos de Uso

### Listar itens
```bash
curl http://localhost:3001/items
```

### Criar item (requer token)
```bash
curl -X POST http://localhost:3001/items \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{"title":"Novo Item","description":"Descrição"}'
```

### Buscar um item
```bash
curl http://localhost:3001/items/seu_id
```

### Atualizar item (requer token)
```bash
curl -X PUT http://localhost:3001/items/seu_id \
  -H "Authorization: Bearer seu_token" \
  -H "Content-Type: application/json" \
  -d '{"title":"Título Atualizado","description":"Nova descrição"}'
```

### Deletar item (requer token)
```bash
curl -X DELETE http://localhost:3001/items/seu_id \
  -H "Authorization: Bearer seu_token"
```

## Cliente Web de Teste

Abra em seu navegador: `http://localhost:3001`

Interface completa para testar todos os endpoints sem usar curl.

## Obter Token JWT

1. Vá para seu dashboard Supabase
2. Em "Authentication" > "Users", crie um novo usuário
3. Copie o token JWT retornado
4. Cole no cliente web ou use em requisições com curl

## Tabela no Supabase

Tabela `items` com os campos:
- `id` (UUID) - Chave primária
- `title` (texto) - Obrigatório
- `description` (texto) - Opcional
- `created_at` (timestamp) - Automático

## Deploy no Render

1. Crie repositório no GitHub e faça push:
```bash
git init
git add .
git commit -m "feat: API REST"
git remote add origin https://github.com/seu_usuario/my-api.git
git push -u origin main
```

2. Acesse https://dashboard.render.com/ e crie Web Service:
   - Conecte seu GitHub
   - Build: `npm install`
   - Start: `npm start`

3. Configure variáveis de ambiente no painel Render:
```
SUPABASE_URL=sua_url
SUPABASE_ANON_KEY=sua_chave_publica
SUPABASE_SERVICE_ROLE_KEY=sua_chave_admin
PORT=10000
```

4. Deploy automático ao fazer push!

## URL da API Publicada

Após deploy no Render:
```
https://seu-app-xxxx.onrender.com
```

Todos os endpoints funcionam da mesma forma:
```
https://seu-app-xxxx.onrender.com/items
https://seu-app-xxxx.onrender.com/items/id
etc...
```

## Estrutura do Código

```
src/
├─ app.js                        Servidor Express
├─ controllers/items.controller.js   CRUD de items
├─ routes/items.routes.js        Rotas da API
├─ services/supabase.service.js  Conexão com Supabase
├─ middlewares/
│  ├─ auth.middleware.js         Validação JWT
│  └─ error.middleware.js        Tratamento de erros
└─ validators/items.validator.js Validações
```

## Scripts Disponíveis

```bash
npm start      # Executa em produção
npm run dev    # Executa em desenvolvimento (com reload)
npm run lint   # Verifica código com ESLint
```

## Requisitos Atendidos

- ✅ CRUD completo (5 operações)
- ✅ Validação de entrada
- ✅ Tratamento centralizado de erros
- ✅ Códigos HTTP corretos
- ✅ Autenticação JWT
- ✅ Banco de dados PostgreSQL
- ✅ Deploy no Render
- ✅ Cliente web para testes
- ✅ Documentação simples

## Segurança

- Chaves Supabase protegidas em `.env` (não versionado)
- `.env.example` fornecido como template
- Tokens validados em todas as rotas protegidas
- Input validado com express-validator

## Licença

ISC
