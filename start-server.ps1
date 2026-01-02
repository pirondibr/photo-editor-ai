Write-Host "Iniciando servidor local na porta 8000..." -ForegroundColor Green
Write-Host ""
Write-Host "Acesse: http://localhost:8000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor" -ForegroundColor Yellow
Write-Host ""
python -m http.server 8000
