param([string]$apiKey, [string]$package)

dotnet nuget push $package -k $apiKey -s https://api.nuget.org/v3/index.json