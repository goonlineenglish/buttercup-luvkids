$nodeDir = "C:\Users\HPC\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.15.0-win-x64"
$env:Path = "$nodeDir;C:\Program Files\Git\cmd;$env:Path"

Set-Location "C:\Users\HPC\.gemini\antigravity\scratch\ButtercupClassForm"

Write-Host "=== Create Pages Project ==="
& npx -y wrangler@latest pages project create buttercup-luvkids-class --production-branch=buttercup-class

Write-Host "`n=== Deploy to Pages ==="
& npx -y wrangler@latest pages deploy . --project-name=buttercup-luvkids-class --commit-dirty=true --branch=buttercup-class
