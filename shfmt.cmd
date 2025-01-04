@echo off
cd /d %~dp0
shfmt\shfmt_windows_amd64.exe -ns %*
