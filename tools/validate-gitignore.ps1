Write-Host "`n🔍 Validating .gitignore consistency..."

$ignoredPaths = @("node_modules", "dist", "build", "out", ".env", ".DS_Store", "*.log")

foreach ($path in $ignoredPaths) {
  $matchedFiles = @(git ls-files $path 2>$null)
  if ($matchedFiles.Count -gt 0) {
    Write-Host "⚠️  '$path' is still tracked by git!" -ForegroundColor Yellow
  } else {
    Write-Host "✅ '$path' is properly ignored."
  }
}

$lines = Get-Content .gitignore | Where-Object { $_ -ne "" -and -not $_.StartsWith("#") }
$duplicates = $lines | Group-Object | Where-Object { $_.Count -gt 1 }

if ($duplicates.Count -gt 0) {
  Write-Host "`n⚠️  Duplicate .gitignore entries found:" -ForegroundColor Yellow
  $duplicates | ForEach-Object { Write-Host " → $($_.Name)" }
} else {
  Write-Host "`n✅ No duplicate entries found in .gitignore."
}

Write-Host "`n🔍 Validation complete."
Write-Host "Please review the output above to ensure your .gitignore is correctly configured."
