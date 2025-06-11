# Dotted World Map Texture Guide

Bu rehber, ThreeFiberGlobe bileşeninde kullanılan noktalı dünya haritası texture'ı hakkında bilgi vermektedir.

## Texture Hakkında

- **Dosya adı:** `dotted-world-map.png`
- **Konum:** `/public/textures/dotted-world-map.png`
- **Boyut:** 2048x1024 piksel (önerilen)
- **Format:** PNG (transparent background)
- **Stil:** GitHub-style noktalı dünya haritası 

## Texture Nasıl Oluşturulur?

1. **Seçenek 1: Sağlanan dosyayı kullanın**
   - Proje ile birlikte gelen `dotted-world-map.png` dosyasını kullanın.
   
2. **Seçenek 2: Kendi texture'ınızı oluşturun**
   - Adobe Illustrator, Figma veya Photoshop gibi bir tasarım aracı kullanarak noktalı dünya haritası oluşturun.
   - Her nokta yaklaşık 3-4 piksel çapında olmalıdır.
   - Kıtaların siluetini nokta desenleriyle doldurun.
   - Ardalan şeffaf olmalıdır.
   - 2048x1024 çözünürlükte kaydedin.
   
3. **Seçenek 3: Hazır kaynaklar**
   - GitHub'ın kendi noktalı dünya haritalarını referans alabilirsiniz.
   - Çeşitli stock görseller veya vektör piyasalarından noktalı dünya haritası satın alabilirsiniz.

## Texture'ı Optimize Etme

ThreeFiberGlobe bileşeni, texture'ı optimize etmek için aşağıdaki ayarları kullanır:

```jsx
texture.minFilter = THREE.LinearFilter;
texture.generateMipmaps = false;
texture.anisotropy = 1;
```

Bu ayarlar, texture'ın bellek kullanımını azaltır ve WebGL context loss hatalarını önlemeye yardımcı olur.

## WebGL Optimization

ThreeFiberGlobe bileşeni, WebGL bağlamının kararlılığını sağlamak için çeşitli optimizasyonlar kullanır:

- Düşük DPI ayarı (1x)
- Low-power tercih edilen GPU kullanımı
- WebGL Error Boundary kullanımı
- Component temizliği

Bu optimizasyonlar sayesinde uygulama daha az kaynak tüketir ve daha kararlı çalışır.
