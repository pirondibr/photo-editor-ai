# 🚀 Como Subir o Projeto no GitHub

## Passo 1: Criar Repositório no GitHub

1. Acesse [https://github.com](https://github.com) e faça login
2. Clique no botão **"+"** no canto superior direito
3. Selecione **"New repository"**
4. Preencha:
   - **Repository name**: `photo-editor-ai` (ou o nome que preferir)
   - **Description**: "Editor de fotos com IA usando Google Gemini via OpenRouter e n8n"
   - **Visibility**: Escolha **Public** ou **Private**
   - **NÃO marque** "Initialize this repository with a README" (já temos um)
5. Clique em **"Create repository"**

## Passo 2: Conectar o Repositório Local ao GitHub

Após criar o repositório no GitHub, você verá instruções. Execute os seguintes comandos no terminal:

```powershell
# Navegue até a pasta do projeto (se ainda não estiver)
cd "c:\Users\Usuario\OneDrive\Documentos\estudio lovable\projeto teste"

# Adicione o remote do GitHub (substitua SEU_USUARIO pelo seu username do GitHub)
git remote add origin https://github.com/SEU_USUARIO/photo-editor-ai.git

# Renomeie a branch para 'main' (padrão do GitHub)
git branch -M main

# Envie o código para o GitHub
git push -u origin main
```

**Nota**: Se você escolheu outro nome para o repositório, substitua `photo-editor-ai` pelo nome que você usou.

## Passo 3: Autenticação

Se for a primeira vez usando Git no seu computador, você pode precisar configurar:

```powershell
# Configurar seu nome e email (se ainda não configurou)
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

### Autenticação no GitHub

O GitHub não aceita mais senhas via HTTPS. Você tem duas opções:

#### Opção 1: Personal Access Token (Recomendado)

1. Vá em GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Clique em "Generate new token (classic)"
3. Dê um nome e selecione o escopo `repo`
4. Copie o token gerado
5. Ao fazer `git push`, use o token como senha quando solicitado

#### Opção 2: SSH (Mais Seguro)

1. Gere uma chave SSH:
```powershell
ssh-keygen -t ed25519 -C "seu.email@example.com"
```

2. Adicione a chave pública ao GitHub:
   - Copie o conteúdo de `~/.ssh/id_ed25519.pub`
   - Vá em GitHub → Settings → SSH and GPG keys → New SSH key
   - Cole a chave e salve

3. Use a URL SSH ao adicionar o remote:
```powershell
git remote set-url origin git@github.com:SEU_USUARIO/photo-editor-ai.git
```

## Comandos Úteis para o Futuro

```powershell
# Ver status das alterações
git status

# Adicionar arquivos alterados
git add .

# Fazer commit
git commit -m "Descrição das alterações"

# Enviar para o GitHub
git push

# Baixar alterações do GitHub
git pull
```

## ✅ Verificação

Após o push, acesse seu repositório no GitHub e verifique se todos os arquivos estão lá:
- ✅ index.html
- ✅ styles.css
- ✅ script.js
- ✅ n8n-workflow.json
- ✅ README.md
- ✅ package.json
- ✅ .gitignore
- ✅ start-server.bat
- ✅ start-server.ps1

## 🎉 Pronto!

Seu projeto está no GitHub! Você pode compartilhar o link do repositório com outras pessoas.
