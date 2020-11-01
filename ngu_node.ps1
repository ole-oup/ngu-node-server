$pathToChrome = 'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe'
$tempFolder = '--user-data-dir=c:\temp' # pick a temp folder for user data
$startmode = '--start-fullscreen' # '--kiosk' is another option
$startPage = 'https://stackoverflow.com'

Start-Process -FilePath $pathToChrome -ArgumentList $tempFolder, $startmode, $startPage

node index
