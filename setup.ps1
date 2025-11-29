# Setup script for API (Windows PowerShell)

Write-Host "Starting API setup..." -ForegroundColor Green

# 1. Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# 2. Create .env from .env.example
if (!(Test-Path ".env")) {
    Write-Host "Creating .env file..." -ForegroundColor Yellow
    Copy-Item ".env.example" -Destination ".env"
    Write-Host ".env created! Fill in your Supabase credentials." -ForegroundColor Green
} else {
    Write-Host ".env file already exists" -ForegroundColor Green
}

# 3. List folder structure
Write-Host ""
Write-Host "Project structure:" -ForegroundColor Cyan
Get-ChildItem -Path "src" -Recurse -Directory | ForEach-Object {
    Write-Host "  └─ $($_.FullName.Replace($PSScriptRoot + '\', ''))"
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Fill in .env with your Supabase credentials"
Write-Host "2. Run: npm run dev"
Write-Host "3. Test: GET http://localhost:3001/health"
Write-Host ""
Write-Host "For more details, see README.md"
