@echo off
echo Installing Kubernetes on Windows...
echo =================================

REM Step 1: Update and install required packages

echo Installing Chocolatey...
powershell -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "Set-ExecutionPolicy Bypass -Scope Process; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"

if %errorlevel% neq 0 (
    echo Failed to install Chocolatey. Exiting.
    exit /b %errorlevel%
)

echo Installing Docker...
choco install docker-desktop -y

if %errorlevel% neq 0 (
    echo Failed to install Docker. Exiting.
    exit /b %errorlevel%
)

echo Installing kubectl...
choco install kubernetes-cli -y

if %errorlevel% neq 0 (
    echo Failed to install kubectl. Exiting.
    exit /b %errorlevel%
)

echo Installing kubeadm...
choco install kubeadm -y

if %errorlevel% neq 0 (
    echo Failed to install kubeadm. Exiting.
    exit /b %errorlevel%
)

REM Step 2: Start Docker service
echo Starting Docker...
net start com.docker.service

if %errorlevel% neq 0 (
    echo Failed to start Docker service. Exiting.
    exit /b %errorlevel%
)

REM Step 3: Initialize Kubernetes cluster
echo Initializing Kubernetes cluster with kubeadm...
kubeadm init

if %errorlevel% neq 0 (
    echo Failed to initialize Kubernetes cluster. Exiting.
    exit /b %errorlevel%
)

REM Step 4: Setup kubeconfig
echo Setting up kubeconfig...
mkdir "%USERPROFILE%\.kube"
copy "%USERPROFILE%\AppData\Local\kubeadm\config" "%USERPROFILE%\.kube\config"

if %errorlevel% neq 0 (
    echo Failed to set up kubeconfig. Exiting.
    exit /b %errorlevel%
)

echo Kubernetes installation complete.
echo =================================
