@echo off
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo NodeJS is not installed. Downloading NodeJS. Trying to install it automatically. Make sure to follow the installer instructions.
    powershell -Command "winget install OpenJS.NodeJS.LTS; if (!$?) { exit 1 }"
    if %ERRORLEVEL% NEQ 0 (
        echo Failed to install NodeJS automatically. Please install NodeJS manually. See https://nodejs.org/en/download/prebuilt-installer
        echo After installing NodeJS, run this script again to continue using NeoniteV2.
        pause
        exit /b 1
    )
)

if not exist node_modules (call npm i && call npm install sails -g)
title NeoniteV2
node app.js
cmd /k
