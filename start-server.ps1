# Laravel Server Start Script
Write-Host "🚀 Starting Laravel Server..." -ForegroundColor Green

# Navigate to api directory
Set-Location "c:\xampp\htdocs\SammiesAptt\api"

# Start server
php artisan serve --port=8000
