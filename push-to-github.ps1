# Script para fazer push do projeto para o GitHub
# Execute: .\push-to-github.ps1

param(
    [Parameter(Mandatory=$true)]
    [string]$GitHubUsername
)

Write-Host "🚀 Conectando ao GitHub..." -ForegroundColor Green
Write-Host ""

# Adicionar remote
Write-Host "Adicionando remote do GitHub..." -ForegroundColor Cyan
git remote add origin "https://github.com/$GitHubUsername/photo-editor-ai.git"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote adicionado com sucesso!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Remote já existe ou houve um erro. Verificando..." -ForegroundColor Yellow
    git remote set-url origin "https://github.com/$GitHubUsername/photo-editor-ai.git"
}

Write-Host ""
Write-Host "📤 Enviando código para o GitHub..." -ForegroundColor Cyan
Write-Host ""

# Fazer push
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Código enviado com sucesso para o GitHub!" -ForegroundColor Green
    Write-Host "🌐 Acesse: https://github.com/$GitHubUsername/photo-editor-ai" -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "❌ Erro ao fazer push. Verifique:" -ForegroundColor Red
    Write-Host "   1. Se você está autenticado no GitHub" -ForegroundColor Yellow
    Write-Host "   2. Se o repositório existe no GitHub" -ForegroundColor Yellow
    Write-Host "   3. Se você tem permissão para fazer push" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "💡 Dica: Você pode precisar usar um Personal Access Token como senha" -ForegroundColor Cyan
}
