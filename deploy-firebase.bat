@echo off
echo ========================================
echo   Deploy Caderno de Erros - Firebase
echo ========================================
echo.
echo Fazendo deploy...
echo.

cd /d "%~dp0"
firebase deploy --only hosting --project caderno-de-erros

echo.
echo ========================================
echo   Deploy concluido!
echo ========================================
echo.
pause
