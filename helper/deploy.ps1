# -r -release
param (
    [switch]$Release
)
cargo b --release
$build_mode = "release"

$dist_path = "dist"
New-Item $dist_path -ItemType Directory -Force

$target = "target\$build_mode"
$version = Get-Content $target\version.txt

$bins = Get-ChildItem $target -Filter "*.exe"

$bins | ForEach-Object {
    if ($_.BaseName.Contains("client")) {
        $copy_path = "{0}\{1}-{2}{3}" -f $dist_path, $_.BaseName, $version, $_.Extension
        Copy-Item $_.FullName $copy_path
        scp.exe $copy_path root@local:/root/.noah/lm-fe-libs/serve_pack
    }

}