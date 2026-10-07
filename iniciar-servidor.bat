@echo off
title Caderno de Erros - Servidor Local
color 0A

echo.
echo ========================================
echo    CADERNO DE ERROS - SERVIDOR LOCAL
echo ========================================
echo.
echo Iniciando servidor local...
echo.
echo O aplicativo estara disponivel em:
echo   http://localhost:8000
echo.
echo Pressione Ctrl+C para parar o servidor
echo ========================================
echo.

REM Tentar Python 3
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Usando Python...
    python -m http.server 8000
    goto :fim
)

REM Tentar Python 2
python2 --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Usando Python 2...
    python2 -m SimpleHTTPServer 8000
    goto :fim
)

REM Tentar Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Python nao encontrado. Tentando npx...
    npx serve -p 8000
    goto :fim
)

REM Tentar PHP
php --version >nul 2>&1
if %errorlevel% equ 0 (
    echo [*] Python e Node nao encontrados. Tentando PHP...
    php -S localhost:8000
    goto :fim
)

REM Nenhum servidor encontrado
echo.
echo [ERRO] Nenhum servidor encontrado!
echo.
echo Para usar este script, instale uma das opcoes:
echo.
echo 1. Python: https://www.python.org/downloads/
echo 2. Node.js: https://nodejs.org/
echo 3. PHP: https://www.php.net/downloads
echo.
echo Ou simplesmente abra o arquivo index.html no navegador!
echo.
pause
goto :fim

:fim
