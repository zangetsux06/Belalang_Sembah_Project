# Analisis & Resep Dapur: Colored ASCII Lyric Visualizer

## 1. Konsep Utama ("Rahasia Dapur")
Visual di dalam video tersebut **bukan** diketik manual per baris karakter, melainkan hasil **Real-Time Pixel-to-ASCII Post-Processing** (sering disebut *Colored ASCII Art Shader/Renderer*).

Ada 2 cara kerja di balik layar yang bisa diterapkan oleh AI ke proyek lirik Anda:
1. **Metode Video-to-ASCII (Persis di Video):** Memutar file video lirik (`.mp4`) secara tersembunyi di elemen `<video>`, menggambarnya ke `<canvas>` beresolusi rendah, lalu menerjemahkan setiap piksel menjadi karakter teks berwarna.
2. **Metode Procedural Canvas-to-ASCII (Untuk Proyek Lirik Berbasis Kode):** Menggambar teks lirik dan animasi terlebih dahulu di atas *offscreen* `<canvas>` 2D biasa, lalu menjalankan fungsi konversi piksel-ke-ASCII yang sama pada *canvas* tersebut setiap *frame*.

---

## 2. Bedah Kode Asli dari Video (`index.html`)

Berikut adalah rekonstruksi kode inti yang terlihat pada detik `00:03 - 00:08` di video:

```javascript
// Palet karakter berdasarkan tingkat kecerahan (gelap ke terang)
const charsFixed = [
  " ", ".", ":", "-", "=", "+", "*", "#", "%", "@",
  ["$", "&", "8"], ["W", "M", "B"]
];

let chars = [...charsFixed];
let charsLength = chars.length;
const MAX_COLOR_INDEX = 650; // Ambang batas normalisasi kecerahan

const updateCanvas = () => {
  const w = canvas.width;   // Resolusi rendah, misal: 120 - 160px
  const h = canvas.height;  // Resolusi rendah, misal: 60 - 90px
  
  // Mengambil frame dari sumber (bisa berupa <video> atau offscreen <canvas>)
  ctx.drawImage(sourceElement, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;

  let outputText = "";
  for (let y = 0; y < h; y++) {
    let row = "";
    for (let x = 0; x < w; x++) {
      const index = (x + y * w) * 4;
      const [r, g, b] = data.slice(index, index + 3);
      const c = (r + g + b) / 3; // Rata-rata kecerahan (grayscale)

      // Mapping kecerahan piksel ke indeks array karakter
      const charIndex = Math.floor(
        (charsLength * ((c * 100) / MAX_COLOR_INDEX)) / 100
      );
      
      const result = chars[charIndex];
      // Efek jitter/shimmer: jika elemen berupa array, pilih karakter acak tiap frame
      const char = Array.isArray(result)
        ? result[Math.floor(Math.random() * result.length)]
        : result;

      // Render karakter dengan warna RGB asli dari piksel
      row += `<span style="color: rgb(${r}, ${g}, ${b})">${
        char ?? "&nbsp;"
      }</span>`;
    }
    outputText += `<div>${row}</div>`;
  }
  
  asciiContainer.innerHTML = outputText;
  requestAnimationFrame(updateCanvas);
};
```

---

## 3. Elemen Kunci Pembentuk Efek Visual

1. **Downsampling (Resolusi Grid Rendah):**
   Ukuran `canvas.width` dan `canvas.height` sengaja dibuat kecil (sekitar `120x65` piksel). Satu piksel pada *canvas* mewakili satu karakter huruf di layar.
2. **Dynamic Shimmer (Efek Berkedip Hidup):**
   Perhatikan baris `Array.isArray(result)`. Karena sebagian item di `charsFixed` berupa *sub-array* (misal `["*", "+", "#"]`), setiap *frame* kode akan mengacak simbol yang tampil meskipun gambarnya diam. Ini memberi kesan *retro terminal* yang hidup.
3. **CSS Styling Wajib:**
   Agar susunan karakter membentuk gambar dan tipografi yang presisi (tidak gepeng atau renggang), kontainer HTML wajib menggunakan:
   ```css
   #ascii-container {
     background-color: #000;
     font-family: 'Courier New', monospace;
     font-size: 8px;       /* Disesuaikan dengan ukuran layar */
     line-height: 8px;     /* Harus sama atau sedikit lebih kecil dari font-size */
     letter-spacing: 2px;  /* Menyeimbangkan rasio aspek karakter monospace */
     white-space: pre;
     overflow: hidden;
   }
   ```

---

## 4. Instruksi Prompt untuk AI (Antigravity)

Salin instruksi di bawah ini saat melampirkan dokumen ini ke proyek Anda:

> **Instruksi Evolusi Proyek:**
> 1. Jangan tampilkan teks lirik HTML biasa secara langsung.
> 2. Buat sebuah **Offscreen 2D Canvas** beresolusi rendah (misal `140x80`).
> 3. Render semua teks lirik, transisi warna, dan siluet/ilustrasi pendukung ke dalam *Offscreen Canvas* tersebut sesuai *timestamp* lagu.
> 4. Terapkan *pipeline* `updateCanvas` di atas untuk membaca `getImageData()` dari *Offscreen Canvas* dan mengubahnya menjadi grid karakter ASCII berwarna (`<span style="color:rgb(...)">`) dengan efek *random character jitter* setiap *frame*.
> 5. Pastikan piksel gelap (`c < 15`) dirender sebagai `&nbsp;` tanpa tag `<span>` berlebih agar performa DOM tetap ringan di 60 FPS.