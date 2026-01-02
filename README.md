# 🎨 Editor de Fotos com IA

Uma ferramenta web de edição de fotos que utiliza IA (Google Gemini 2.5 Flash Image via OpenRouter) para processar imagens baseado em prompts de texto.

## 📋 Pré-requisitos

- Node.js (opcional, para servir o frontend localmente)
- n8n instalado e rodando localmente
- Conta no OpenRouter com API Key

## 🚀 Configuração

### 1. Instalar e Configurar n8n

Se você ainda não tem o n8n instalado:

```bash
# Instalar n8n globalmente
npm install -g n8n

# Ou usar npx
npx n8n
```

O n8n estará disponível em: `http://localhost:5678`

### 2. Configurar Variável de Ambiente

Configure a variável de ambiente `OPENROUTER_API_KEY` no n8n:

**Opção 1: Via arquivo .env do n8n**
Crie ou edite o arquivo `.env` na pasta do n8n e adicione:
```
OPENROUTER_API_KEY=sua_api_key_aqui
```

**Opção 2: Via interface do n8n**
1. Acesse `http://localhost:5678`
2. Vá em Settings > Environment Variables
3. Adicione `OPENROUTER_API_KEY` com sua chave da OpenRouter

### 3. Importar Workflow no n8n

1. Acesse o n8n em `http://localhost:5678`
2. Clique em "Workflows" no menu lateral
3. Clique no botão "Import from File" ou "Import from URL"
4. Selecione o arquivo `n8n-workflow.json` deste projeto
5. Ative o workflow clicando no toggle no canto superior direito

### 4. Obter URL do Webhook

Após importar e ativar o workflow:

1. Clique no node "Webhook"
2. Copie a URL do webhook (algo como: `http://localhost:5678/webhook/photo-editor`)
3. Atualize a constante `N8N_WEBHOOK_URL` no arquivo `script.js` com essa URL

### 5. Servir o Frontend

**Opção 1: Usando os scripts fornecidos (RECOMENDADO)**
```bash
# Windows (PowerShell)
.\start-server.ps1

# Windows (CMD)
start-server.bat

# Linux/Mac
python -m http.server 8000
```

**Opção 2: Usando Python diretamente**
```bash
# Python 3
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000
```

**Opção 3: Usando Node.js (http-server)**
```bash
# Instalar http-server globalmente
npm install -g http-server

# Executar
http-server -p 8000
```

**Opção 4: Usando Live Server (VS Code)**
- Instale a extensão "Live Server" no VS Code
- Clique com botão direito em `index.html` e selecione "Open with Live Server"

Acesse o site em: `http://localhost:8000`

⚠️ **IMPORTANTE**: Certifique-se de que o servidor está rodando antes de acessar o site no navegador!

## 📁 Estrutura do Projeto

```
projeto-teste/
├── index.html          # Página principal
├── styles.css          # Estilos da interface
├── script.js           # Lógica JavaScript e comunicação com n8n
├── n8n-workflow.json   # Workflow do n8n para importar
└── README.md          # Este arquivo
```

## 🔧 Como Funciona

1. **Frontend (HTML/CSS/JS)**
   - Interface para upload de imagem
   - Campo de texto para o prompt
   - Envia dados via FormData para o webhook do n8n

2. **Backend (n8n Workflow)**
   - **Webhook Node**: Recebe POST com imagem e prompt
   - **Code Node**: Processa dados e prepara payload para OpenRouter
   - **HTTP Request Node**: Envia requisição para OpenRouter API
   - **Code Node**: Processa resposta e retorna ao frontend

3. **OpenRouter + Gemini**
   - Recebe imagem em base64 e prompt
   - Processa usando Google Gemini 2.5 Flash Image
   - Retorna resultado processado

## 🎯 Como Usar

1. Abra o site no navegador
2. Faça upload de uma imagem (clique ou arraste)
3. Digite um prompt descrevendo o que deseja fazer (ex: "Remova o fundo", "Aplique filtro vintage", "Melhore a qualidade")
4. Clique em "Processar Imagem"
5. Aguarde o processamento e veja o resultado

## 🔑 Obter API Key do OpenRouter

1. Acesse [https://openrouter.ai/](https://openrouter.ai/)
2. Crie uma conta ou faça login
3. Vá em "Keys" no menu
4. Crie uma nova API Key
5. Copie a chave e configure no n8n (veja passo 2 acima)

## ⚠️ Troubleshooting

### Erro: "ERR_CONNECTION_REFUSED" ou site não carrega
- **Certifique-se de que o servidor está rodando!**
- Execute `python -m http.server 8000` ou use os scripts `start-server.bat` / `start-server.ps1`
- Verifique se a porta 8000 não está sendo usada por outro aplicativo
- Tente usar outra porta: `python -m http.server 8080` (e atualize a URL no navegador)

### Erro: "Erro ao processar imagem"
- Verifique se o n8n está rodando
- Confirme que o workflow está ativado
- Verifique se a URL do webhook em `script.js` está correta
- Confirme que a variável `OPENROUTER_API_KEY` está configurada

### Erro: "Imagem e prompt são obrigatórios"
- Certifique-se de fazer upload de uma imagem
- Verifique se o prompt não está vazio

### Erro de CORS
- Se estiver servindo de um domínio diferente, pode ser necessário configurar CORS no n8n
- Ou use um servidor local na mesma porta

### Workflow não recebe dados
- Verifique se o webhook está ativado no n8n
- Confirme que está usando POST (não GET)
- Verifique os logs de execução no n8n

## 📝 Notas

- O modelo usado é `google/gemini-2.5-flash-image` via OpenRouter
- As imagens são enviadas em base64
- O workflow retorna a resposta processada pelo Gemini
- Todos os dados são processados localmente (n8n local)

## 🔄 Próximos Passos

- Adicionar suporte para download da imagem processada
- Melhorar tratamento de erros
- Adicionar preview da imagem processada
- Suporte para múltiplas imagens
- Histórico de processamentos
