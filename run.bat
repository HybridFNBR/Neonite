@echo off

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo NodeJS is not installed. Downloading NodeJS, Make sure to follow the installers instructions
    powershell -Command "Start-Process 'https://nodejs.org/dist/v22.8.0/node-v22.8.0-x64.msi' -Wait"
    echo then re-open the batch file when NodeJS has been installed!
    pause
    exit /b
)

if not exist node_modules (call npm i && call npm install sails -g)
title NeoniteV2
node app.js
cmd /k
