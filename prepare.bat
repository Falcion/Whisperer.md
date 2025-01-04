@echo off
setlocal enabledelayedexpansion

:: Variables
set ROOT_DIRECTORY=%~dp0
set EXCLUDING_FOLDERS=node_modules dist venv .git $git $ out bin
set EXCLUDING_VALUES=FALCION PATTERNU PATTERNUGIT PATTERNUGIT.NET

:: Logging functions
:info
echo [INFO] %~1
goto :eof

:error
echo [ERROR] %~1
goto :eof

:: Search function
:search
set "filepath=%~1"
echo Searching in %filepath%
for %%target in (%EXCLUDING_VALUES%) do (
    findstr /i %%target "%filepath%" >nul
    if !errorlevel! == 0 (
        echo Found "%%target" in %filepath%
    )
)
goto :eof

:: Traverse function
:traverse
set "directory=%~1"
echo Traversing directory: %directory%
for /r "%directory%" %%f in (*) do (
    echo Processing file: %%f
    call :search %%f
)
goto :eof

:: Main script
set /p mode="Do you want to update the settings? Y/N/IGNORE: "
if /i "%mode%" neq "IGNORE" (
    set /p params="Enter words separated by a comma: "
    echo Updating settings with: %params%
)

call :traverse %ROOT_DIRECTORY%
pause
