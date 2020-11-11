$pathToChrome = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
$startPage = 'http://localhost:3000'

Start-Process -FilePath $pathToChrome -ArgumentList $startPage

node index.js
