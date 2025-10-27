@echo off
title DSBCA Backend Server
color 0A

echo ========================================
echo     DSBCA Backend Server Launcher
echo ========================================
echo.
echo Choose backend mode:
echo 1. Development (with MongoDB + Email)
echo 2. Simple Development (in-memory storage)
echo 3. Production (with MongoDB + Email)
echo 4. Open Admin Dashboard
echo 5. Exit
echo.
set /p choice="Enter your choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo Starting Development Backend...
    echo Note: Make sure MongoDB is running and email is configured
    echo.
    npm run dev
) else if "%choice%"=="2" (
    echo.
    echo Starting Simple Development Backend...
    echo Note: Using in-memory storage - data will be lost on restart
    echo.
    npm run dev-simple
) else if "%choice%"=="3" (
    echo.
    echo Starting Production Backend...
    echo Note: Make sure MongoDB is running and email is configured
    echo.
    npm start
) else if "%choice%"=="4" (
    echo.
    echo Opening Admin Dashboard...
    echo Note: Make sure the backend server is running first
    echo.
    start admin-dashboard.html
    echo Dashboard opened in browser
    pause
) else if "%choice%"=="5" (
    echo.
    echo Goodbye!
    exit
) else (
    echo.
    echo Invalid choice. Please try again.
    pause
    call run-backend.bat
)
