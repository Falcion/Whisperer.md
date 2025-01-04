@echo off

REM Remove kubectl
if exist "%ProgramFiles%\Kubernetes\kubectl.exe" (
    echo Removing kubectl...
    del /F /Q "%ProgramFiles%\Kubernetes\kubectl.exe"
) else (
    echo kubectl not found. Skipping...
)

REM Remove Kubernetes
echo Removing all Kubernetes data...
rmdir /S /Q "%ProgramFiles%\Kubernetes"
rmdir /S /Q "%LOCALAPPDATA%\Kubernetes"
rmdir /S /Q "%USERPROFILE%\.kube"

echo Kubernetes has been fully removed.
