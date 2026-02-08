@echo off
echo Deploying to Netlify...

REM Build the project
npm run build

REM Deploy the dist folder to Netlify
netlify deploy --dir=dist --prod

pause
