# 🌐 Como Publicar no GitHub Pages

## ⚠️ Importante: Configuração do n8n

Antes de publicar no GitHub Pages, você precisa ter o **n8n acessível publicamente** na internet, pois o site hospedado no GitHub Pages não consegue acessar `localhost`.

### Opções para o n8n:

1. **n8n Cloud** (Recomendado - mais fácil)
   - Acesse [https://n8n.io/cloud](https://n8n.io/cloud)
   - Crie uma conta e configure seu workflow
   - Use a URL pública fornecida pelo n8n Cloud

2. **n8n Self-hosted com URL pública**
   - Use serviços como ngrok, Cloudflare Tunnel, ou similar
   - Exemplo com ngrok: `ngrok http 5678`
   - Use a URL pública gerada

3. **Servidor próprio com domínio**
   - Configure seu próprio servidor com n8n
   - Use um domínio próprio

## 🚀 Passo a Passo para Publicar

### Método 1: Via Interface do GitHub (Mais Simples)

1. **Acesse seu repositório no GitHub**
   - Vá para: https://github.com/pirondibr/photo-editor-ai

2. **Vá em Settings**
   - Clique na aba **"Settings"** no topo do repositório

3. **Configure GitHub Pages**
   - No menu lateral esquerdo, clique em **"Pages"**
   - Em **"Source"**, selecione:
     - **Branch**: `main`
     - **Folder**: `/ (root)`
   - Clique em **"Save"**

4. **Aguarde a publicação**
   - O GitHub levará alguns minutos para publicar
   - Você verá uma mensagem: "Your site is live at..."
   - A URL será: `https://pirondibr.github.io/photo-editor-ai/`

5. **Atualize a URL do n8n no código**
   - Edite o arquivo `script.js` no GitHub
   - Altere a constante `N8N_WEBHOOK_URL` para a URL pública do seu n8n
   - Faça commit da alteração

### Método 2: Via GitHub Actions (Automático)

O projeto já inclui um workflow automático (`.github/workflows/pages.yml`) que publica automaticamente quando você faz push para a branch `main`.

1. **O workflow já está configurado!**
   - Basta fazer push de qualquer alteração
   - O GitHub Actions publicará automaticamente

2. **Ativar GitHub Pages**
   - Ainda precisa ativar nas Settings → Pages
   - Selecione "GitHub Actions" como source

## 🔧 Configurar URL do n8n para Produção

### Opção 1: Editar diretamente no código

1. Edite `script.js` no GitHub
2. Altere a linha:
   ```javascript
   const N8N_WEBHOOK_URL = 'https://SUA-URL-PUBLICA-DO-N8N/webhook/photo-editor';
   ```
3. Faça commit

### Opção 2: Usar variável de ambiente (Avançado)

Se você quiser usar diferentes URLs para desenvolvimento e produção, pode usar:

```javascript
const N8N_WEBHOOK_URL = window.N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/photo-editor';
```

E configurar via meta tag no HTML ou variável de ambiente.

## ✅ Verificação

Após publicar:

1. Acesse: `https://pirondibr.github.io/photo-editor-ai/`
2. Verifique se o site carrega corretamente
3. Teste fazer upload de uma imagem
4. Verifique se consegue processar (depende do n8n estar acessível)

## 🔒 CORS e Segurança

⚠️ **Importante**: Se o seu n8n estiver em um domínio diferente do GitHub Pages, você pode precisar configurar CORS no n8n:

1. No n8n, vá em Settings → CORS
2. Adicione `https://pirondibr.github.io` aos domínios permitidos
3. Ou configure para permitir todas as origens (menos seguro, mas mais fácil)

## 🔄 Atualizar o Site

Sempre que você fizer alterações:

1. Faça commit das mudanças
2. Faça push para o GitHub
3. O GitHub Pages atualizará automaticamente (pode levar alguns minutos)

## 📝 Notas

- O GitHub Pages é **gratuito** para repositórios públicos
- O site será acessível em: `https://pirondibr.github.io/photo-editor-ai/`
- Você pode usar um domínio customizado nas Settings → Pages
- O n8n precisa estar acessível publicamente para o site funcionar

## 🆘 Troubleshooting

### Site não carrega
- Verifique se o GitHub Pages está ativado nas Settings
- Aguarde alguns minutos após a primeira publicação
- Verifique se há erros na aba "Actions" do GitHub

### Erro de CORS
- Configure CORS no n8n para permitir o domínio do GitHub Pages
- Verifique se a URL do n8n está correta no `script.js`

### n8n não responde
- Verifique se o n8n está acessível publicamente
- Teste a URL do webhook diretamente no navegador
- Verifique se o workflow está ativado no n8n
