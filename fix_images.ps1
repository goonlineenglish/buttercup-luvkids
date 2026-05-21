$nodeDir = "C:\Users\HPC\AppData\Local\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.15.0-win-x64"
$env:Path = "$nodeDir;C:\Program Files\Git\cmd;$env:Path"

# Fix Class Form
Write-Host "=== Fixing ButtercupClassForm ==="
Set-Location "C:\Users\HPC\.gemini\antigravity\scratch\ButtercupClassForm"
& "C:\Program Files\Git\cmd\git.exe" add index.html
& "C:\Program Files\Git\cmd\git.exe" commit -m "Fix image paths for subfolder routing"
& "C:\Program Files\Git\cmd\git.exe" push
& npx -y wrangler@latest pages deploy . --project-name=buttercup-luvkids-class --commit-dirty=true --branch=buttercup-class

# Fix Main Form
Write-Host "=== Fixing ButtercupForm ==="
Set-Location "C:\Users\HPC\.gemini\antigravity\scratch\ButtercupForm"
& "C:\Program Files\Git\cmd\git.exe" add index.html
& "C:\Program Files\Git\cmd\git.exe" commit -m "Fix image paths for subfolder routing"
& "C:\Program Files\Git\cmd\git.exe" push
& npx -y wrangler@latest pages deploy . --project-name=buttercup-luvkids --commit-dirty=true
