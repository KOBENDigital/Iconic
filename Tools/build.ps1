# Build project as Release

# You have to intall CSSetup first: https://devblogs.microsoft.com/setup/visual-studio-setup-powershell-module-available/

$instance = Get-VSSetupInstance -All -Prerelease | Select-VSSetupInstance -Require 'Microsoft.Component.MSBuild' -Latest
$installDir = $instance.installationPath
Write-Host "Visual Studio is found at $installDir"

$msBuild = $installDir + '\MSBuild\Current\Bin\MSBuild.exe' # VS2019
if (![System.IO.File]::Exists($msBuild)) {
    $msBuild = $installDir + '\MSBuild\15.0\Bin\MSBuild.exe' # VS2017
    if (![System.IO.File]::Exists($msBuild)) {
        Write-Host "MSBuild doesn't exist. Exit."
        exit 1
    }
}

Write-Host "MSBuild found. Compile the projects."

$params = '..\Iconic.sln', '-property:Configuration=Release', '-verbosity:minimal', '-p:PostBuildEventUseInBuild=false'

& $msBuild $params

# Create Nuget package
.\nuget.exe pack -Build ..\Iconic\Iconic.csproj
Write-Host "Nuget package created."

# Create Umbraco package
Unblock-File -Path .\CreateUmbracoPackage.ps1
powershell -File .\CreateUmbracoPackage.ps1 -packageDirectory ..\Iconic -buildConfiguration Release
Write-Host "Umbraco package created."
