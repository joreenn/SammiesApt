# Watch Laravel logs in real-time
Write-Host "Watching Laravel logs... Press Ctrl+C to stop" -ForegroundColor Green
Write-Host "----------------------------------------" -ForegroundColor Gray

Get-Content "storage\logs\laravel.log" -Wait -Tail 20
