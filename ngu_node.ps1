$pathToChrome = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
$startmode =  '--kiosk'
$startPage = 'http://localhost:3662'

Start-Process -FilePath $pathToChrome -ArgumentList $startmode, $startPage

node index.js
