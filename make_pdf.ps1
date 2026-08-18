$edgePath = "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
$htmlFile = Join-Path -Path $PSScriptRoot -ChildPath "guia_logica.html"
$pdfFile = Join-Path -Path $PSScriptRoot -ChildPath "Guia_Tecnico_Cafeteria_Front3.pdf"
$desktopPdf = Join-Path -Path (Split-Path -Parent $PSScriptRoot) -ChildPath "Guia_Tecnico_Cafeteria_Front3.pdf"

$htmlUri = ([System.Uri]$htmlFile).AbsoluteUri

Start-Process -FilePath $edgePath -ArgumentList "--headless", "--disable-gpu", "--no-pdf-header-footer", "--print-to-pdf=`"$pdfFile`"", "`"$htmlUri`"" -Wait

if (Test-Path $pdfFile) {
    Copy-Item -Path $pdfFile -Destination $desktopPdf -Force
}
