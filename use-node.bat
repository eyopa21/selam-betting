@echo off
setlocal enabledelayedexpansion

REM Check if .nvmrc file exists
if not exist .nvmrc (
    echo .nvmrc file not found in the current directory.
    exit /b 1
)

REM Read the .nvmrc file
set /p node_version=<.nvmrc

REM Check if the specified Node.js version is installed
nvm list | findstr /C:"v%node_version%" >nul
if %errorlevel% neq 0 (
    echo Node.js version %node_version% is not installed.
    echo Installing Node.js version %node_version%...
    nvm install %node_version%
    if %errorlevel% neq 0 (
        echo Failed to install Node.js version %node_version%.
        exit /b 1
    )
)

REM Use the specified Node.js version
nvm use %node_version%

REM Check if the nvm use command was successful
if errorlevel 1 (
    echo Failed to switch to Node.js version %node_version%.
    exit /b 1
)

echo Successfully switched to Node.js version %node_version%.
