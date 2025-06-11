# Earth Texture Download Guide

This guide helps you download high-quality Earth textures for the realistic globe.

## Required Textures

1. **Earth Color Map** (2048x1024 or higher)
   - NASA Blue Marble: https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_2048.jpg
   - Save as: `/public/textures/earth_texture.jpg`

2. **Earth Normal Map** (for surface details)
   - Earth Normal Map: https://www.solarsystemscope.com/textures/download/2k_earth_normal_map.jpg
   - Save as: `/public/textures/earth_normal.jpg`

3. **Earth Specular Map** (for ocean reflection)
   - Earth Specular: https://www.solarsystemscope.com/textures/download/2k_earth_specular_map.jpg
   - Save as: `/public/textures/earth_specular.jpg`

4. **Earth Bump Map** (for elevation)
   - Earth Bump: https://www.solarsystemscope.com/textures/download/2k_earth_bump_map.jpg
   - Save as: `/public/textures/earth_bump.jpg`

5. **Earth Clouds** (animated cloud layer)
   - Earth Clouds: https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg
   - Save as: `/public/textures/earth_clouds.jpg`

6. **Earth Night Lights** (city lights)
   - Earth Night: https://www.solarsystemscope.com/textures/download/2k_earth_nightmap.jpg
   - Save as: `/public/textures/earth_night.jpg`

## Automated Download Script

Run this PowerShell script to download all textures:

```powershell
# Create textures directory if it doesn't exist
$texturesDir = "public/textures"
if (!(Test-Path $texturesDir)) {
    New-Item -ItemType Directory -Path $texturesDir -Force
}

# Download NASA Blue Marble (2K)
Invoke-WebRequest -Uri "https://eoimages.gsfc.nasa.gov/images/imagerecords/57000/57752/land_shallow_topo_2048.jpg" -OutFile "$texturesDir/earth_texture.jpg"

# Download high-quality textures from Solar System Scope
$baseUrl = "https://www.solarsystemscope.com/textures/download"
$textures = @{
    "2k_earth_normal_map.jpg" = "earth_normal.jpg"
    "2k_earth_specular_map.jpg" = "earth_specular.jpg"
    "2k_earth_bump_map.jpg" = "earth_bump.jpg"
    "2k_earth_clouds.jpg" = "earth_clouds.jpg"
    "2k_earth_nightmap.jpg" = "earth_night.jpg"
}

foreach ($texture in $textures.GetEnumerator()) {
    $url = "$baseUrl/$($texture.Key)"
    $output = "$texturesDir/$($texture.Value)"
    Write-Host "Downloading $($texture.Value)..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $output
        Write-Host "✓ Downloaded $($texture.Value)" -ForegroundColor Green
    } catch {
        Write-Host "✗ Failed to download $($texture.Value): $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host "Texture download complete!" -ForegroundColor Cyan
```

## Manual Download Instructions

If the automated script doesn't work, manually download each texture:

1. Open each URL in your browser
2. Right-click and "Save Image As..."
3. Save to the corresponding path in `/public/textures/`
4. Ensure file names match exactly

## Alternative High-Quality Sources

- **NASA Visible Earth**: https://visibleearth.nasa.gov/
- **Solar System Scope**: https://www.solarsystemscope.com/textures/
- **Celestia Motherlode**: https://www.celestiamotherlode.net/
- **Planet Textures**: https://planet-textures.com/

## Optimizing Textures

For better performance, consider:
1. Converting to .webp format for smaller file sizes
2. Creating multiple resolution versions (1K, 2K, 4K)
3. Using texture compression tools
4. Implementing progressive loading
