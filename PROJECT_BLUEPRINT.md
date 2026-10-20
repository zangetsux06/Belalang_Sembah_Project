# 🧠 MEMORI & CETAK BIRU PROYEK (COLORED ASCII LYRIC VISUALIZER)
> **Dokumentasi Lengkap, Arsitektur Sistem, dan Panduan Pembuatan Versi Lagu Baru**  
> *Proyek Rujukan: Belalang Sembah (.Feast / Hindia) — ASCII Lyric Visualizer*

---

## 📌 1. Ikhtisar Proyek & Filosofi Desain

Proyek ini adalah **Real-Time Pixel-to-ASCII Lyric Visualizer** yang berjalan secara mandiri (*standalone*) menggunakan teknologi web standar (**HTML5, CSS3, dan JavaScript Vanilla**) tanpa library eksternal (zero-dependency).

### Filosofi Utama:
1. **Estetika Terminal Retro-Futuristik Bersih:** Layar 100% hitam pekat murni (`#000000`), teks menggunakan font monospace terminal tajam, dan karakter ASCII bertindak sebagai "piksel hidup" yang berpendar dinamis.
2. **Karakter ASCII Berbobot Halus (Anti-Overcrowding):** Menghindari ASCII yang terlalu tebal atau berhimpitan seperti blok kotak, diganti dengan kamus karakter bertingkat luminansi yang terbaca jelas layaknya teks cetak.
3. **Penceritaan Melalui Warna (Color Narrative):** Warna lirik berubah secara dramatis mengikuti tema dan emosi lagu (misal: bisik-bisik merah obsesif, realitas putih dingin, hingga klimaks merah darah).
4. **Sinkronisasi Presisi & Direct Cut:** Transisi lirik terjadi instan dan tajam mengikuti ketukan musik (*seamless direct cut*), diperkuat dengan hentakan *glitch* digital tanpa jeda *fade* yang lambat.
5. **Fisika Partikel Reaktif:** Partikel bara api melayang organik, serta tetesan darah (*blood drips*) yang mengucur menempel presisi di dasar goresan huruf teks dengan fisika akselerasi gravitasi mulus.

---

## 📂 2. Struktur File & Peran Masing-Masing

```text
├── index.html                                  # Kerangka DOM, preconnect font, dan elemen audio
├── style.css                                   # Styling layar penuh hitam, tipografi monospace, animasi glitch CSS
├── visualizer.js                               # Mesin inti (Shader Pixel-to-ASCII, Audio Analyser, Partikel, Config)
├── cover.jpg                                   # Gambar album / logo band untuk adegan Intro Banner
├── Feast - Belalang Sembah (...).mp3          # File audio lagu utama (.mp3)
├── lirik_belalang_sembah_timestamps.txt        # Referensi catatan lirik & detik timestamp lagu
└── PROJECT_BLUEPRINT.md                        # Panduan replikasi untuk membuat lagu baru
```

---

## ⚙️ 3. Arsitektur Mesin (Pixel-to-ASCII Pipeline)

Mesin ini bekerja dengan siklus rendering 60 FPS menggunakan `requestAnimationFrame`:

1. **Offscreen Canvas (Resolusi Virtual 160 × 68):**
   * Berfungsi sebagai kanvas gambar tak terlihat di latar belakang.
   * Semua grafik (teks font Google, foto album, efek tetesan darah, bara api) digambar ke kanvas ini dengan API Canvas 2D biasa (`fillText`, `drawImage`, `fillRect`).
2. **Pindai Piksel (`getImageData`):**
   * Mengambil data piksel mentah RGBA setiap *frame*.
3. **Kuantisasi Warna & Karakter Shimmer:**
   * Setiap piksel dikonversi ke tingkat kecerahan: `c = r + g + b`.
   * Jika piksel gelap murni (`c < 22`), langsung dicetak karakter spasi kosong `" "` tanpa tag HTML untuk performa kilat.
   * Jika piksel memiliki warna, nilai `c` dipetakan ke indeks array karakter `charsFixed`. Karakter bertipe array akan diacak sedikit (*shimmer effect*) untuk memberikan kesan hidup.
   * Warna dikelompokkan (*quantized*) per interval 4 piksel dan digabungkan menjadi blok *run-length* untuk meminimalkan jumlah tag `<span>` di DOM.
4. **Auto-Responsive Fit to Screen:**
   * Fungsi `fitAsciiToScreen()` di CSS & JS otomatis menghitung rasio lebar & tinggi jendela layar pengguna agar seluruh matriks 160×68 pas di viewport tanpa memicu scrollbar horizontal maupun vertikal.

---

## 🎛️ 4. Panduan Skema Konfigurasi (`config` di `visualizer.js`)

Semua data lagu, lirik, waktu, dan warna diatur dalam objek `config`:

```javascript
const config = {
  // Pengaturan Rentang Audio Global
  audioStartTime: 133.0, // Detik lagu mulai diputar saat visualizer dibuka
  audioEndTime: 202.5,   // Detik lagu selesai (otomatis loop kembali ke start)
  isLooping: true,       // Putar ulang otomatis terus menerus

  // Daftar Baris Lirik
  lyrics: [
    {
      text: "Judul Baris Lirik",           // Teks lirik yang tampil di layar
      startSec: 140.0,                     // [PENTING] Detik mulai muncul
      endSec: 144.2,                       // [PENTING] Detik berganti ke baris berikutnya
      showMs: 4200,                        // Durasi milidetik (fallback jika audio dipause)
      fontFamily: '"Space Grotesk", sans-serif', // Font keluarga untuk baris ini
      fontStyle: "700",                    // Ketebalan font (700 = bold tegas, hindari 900)
      fontSize: 14,                        // Ukuran font dasar (14-18px)
      color: "#ff1744",                    // Warna solid teks (Hex / RGB)
      singleLine: false,                   // Kunci paksa 1 baris utuh (anti turun ke baris 2)
      dramatic: false,                     // Efek transisi glitch intens jika true
      bleeding: false                      // Aktifkan simulasi tetesan darah jika true
    },
    // ... baris lirik berikutnya
  ]
};
```

---

## 🚀 5. Panduan Langkah demi Langkah: Membuat Versi Lagu Baru

Jika ingin membuat visualizer untuk lagu lain (misal: *Feast - Peradaban*, *Hindia - Rumah ke Rumah*, *The Strokes*, dsb.):

### Langkah 1: Gandakan / Salin Folder Proyek
1. Buat folder baru di bawah `songs/`, misalnya `c:\Users\user\Zael\songs\Nama_Lagu_Baru\`.
2. Salin seluruh file (`index.html`, `style.css`, `visualizer.js`) ke folder baru tersebut.

### Langkah 2: Siapkan Aset Media Baru
1. **Audio MP3:**
   * Masukkan file lagu format `.mp3` ke folder baru tersebut.
   * Ubah nama filenya menjadi `audio.mp3` atau sesuaikan pada tag `<audio>` di `index.html`.
2. **Cover Gambar (Opsional):**
   * Masukkan gambar album/logo dengan nama `cover.jpg` (rasio kotak 1:1 direkomendasikan).

### Langkah 3: Siapkan Catatan Timestamp Lirik
Dengarkan lagu dan catat detik mulai dan berakhir tiap kalimat lirik:
* Baris 1: Mulai `01:10.0` (70.0 detik) - Selesai `01:15.5` (75.5 detik)
* Baris 2: Mulai `01:15.5` (75.5 detik) - Selesai `01:20.0` (80.0 detik)

### Langkah 4: Sesuaikan `config` di `visualizer.js`
1. Buka `visualizer.js`.
2. Atur `audioStartTime` ke detik bagian yang ingin Anda visualisasikan (misal awal lagu `0.0` atau bagian Verse/Reff).
3. Atur `audioEndTime` ke detik bagian akhir visualizer.
4. Ganti isi array `lyrics: [ ... ]` dengan lirik lagu baru beserta detik `startSec` dan `endSec`-nya.

### Langkah 5: Tentukan Palet Warna & Nuansa Emosi
Ganti properti `color` pada masing-masing lirik sesuai tema lagu:
* **Tema Api / Amarah / Darah:** `#ff1744` (Crimson), `#e60026`, `#ff5252`.
* **Tema Bersih / Dingin / Monokrom:** `#ffffff` (Putih), `#e0e0e0`, `#81d4fa` (Ice Blue).
* **Tema Cyberpunk / Neon:** `#00e5ff` (Cyan), `#ff007f` (Neon Magenta), `#76ff03` (Lime).
* **Tema Alam / Kalm:** `#00e676` (Mint Emerald), `#ffd600` (Amber Gold).

### Langkah 6: Atur Adegan Intro (Jika Menggunakan)
Di fungsi `drawIntroScene()`:
* Ganti teks judul `"BELALANG SEMBAH"` menjadi judul lagu baru Anda.
* Ganti teks artis `". F E A S T"` menjadi nama artis lagu Anda.
* Sesuaikan durasi waktu intro (di `visualizer.js`, ganti batas `curTime < 135.8` sesuai detik intro Anda).

---

## 🔬 6. Solusi Masalah Teknis Utama (*Gotchas & Lessons Learned*)

Berikut ringkasan masalah kritis yang berhasil dipecahkan dalam proyek ini dan harus selalu diingat:

### 1. Masalah Font ASCII Terlalu Tebal / Berhimpitan
* **Penyebab:** Menggunakan font weight `900` ("Arial Black" / "Impact") dengan kamus karakter yang terlalu banyak karakter tebal (`@`, `W`, `M`, `#`).
* **Solusi:** Gunakan font Google sans-serif modern seperti **`"Space Grotesk"`** dengan bobot **`700`**, dan setel kamus ASCII bergradasi halus (`charsFixed`) yang mengutamakan titik, strip, angka tipis, dan karakter berongga.

### 2. Masalah Lirik Panjang Turun ke Baris 2 (Word Wrap)
* **Penyebab:** Algoritma pemisah kata (*word-wrap*) otomatis memecah kalimat jika lebarnya melebihi 90% layar kanvas.
* **Solusi:** Tambahkan opsi `singleLine: true` pada item lirik yang wajib 1 baris. Sistem akan otomatis menskalakan ukuran font (`size = Math.floor(size * (maxW / lw))`) agar pas dalam satu baris penuh tanpa pernah terpotong ke bawah.

### 3. Masalah Tetesan Darah Melayang di Ruang Kosong / Margin
* **Penyebab:** Posisi tetesan darah dihitung dengan koordinat acak tanpa memeriksa keberadaan huruf.
* **Solusi:** Gunakan algoritma *Letter-Bottom Scanning*:
  1. Kanvas offscreen membaca area teks dengan `getImageData`.
  2. Untuk setiap kolom X horizontal, scan dari bawah ke atas untuk mencari piksel huruf pertama.
  3. Tetesan darah hanya dapat berakar (*anchored*) pada kolom X yang terbukti memiliki goresan huruf. Spasi antar kata dan margin luar diabaikan 100%.

### 4. Masalah Tetesan Darah Patah-Patah di Resolusi Terminal
* **Penyebab:** Bulir darah jatuh dengan kecepatan tetap tanpa inersia.
* **Solusi:** Terapkan fisika gravitasi halus (`dropVy += 0.042; dropY += dropVy;`) ditambah *motion stretch* (tetesan memanjang 1-2 piksel saat jatuh cepat), serta efek genangan (*floor puddle*) saat menyentuh lantai kanvas.

### 5. Masalah Transisi Jeda / Kedip (Blink / Lag)
* **Penyebab:** Menggunakan animasi CSS `fade-in` / `fade-out` yang menyebabkan layar kosong di antara lirik.
* **Solusi:** Gunakan transisi **Direct Cut** (pergantian instan tanpa jeda kosong), dipermanis dengan hentakan *glitch* digital singkat (120ms untuk lirik biasa, 360ms untuk klimaks).

### 6. Kebijakan Browser Autoplay Audio
* **Penyebab:** Kebijakan keamanan browser modern memblokir pemutaran audio otomatis tanpa gestur pengguna.
* **Solusi:** Pasang *unlock listener* satu kali (`click` atau tombol `Spasi`) yang langsung me-*resume* `AudioContext` dan memulai pemutaran lagu saat pertama kali ditekan.

---

## ⌨️ 7. Kontrol Navigasi Interaktif

Visualizer ini dilengkapi kontrol bawaan untuk navigasi mudah saat pengujian:
* **Klik Layar:** Play / Pause musik dan visual.
* **Spasi (`Space`):** Play / Pause audio.
* **Panah Kanan (`→`):** Melompat langsung ke baris lirik berikutnya beserta sinkronisasi audio.
* **Panah Kiri (`←`):** Mundur ke baris lirik sebelumnya beserta sinkronisasi audio.
