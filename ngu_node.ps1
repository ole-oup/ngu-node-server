$pathToChrome = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
# $startmode = '--kiosk'
$startPage = 'http://localhost:3000'

Start-Process -FilePath $pathToChrome -ArgumentList $startmode, $startPage

node index.js
