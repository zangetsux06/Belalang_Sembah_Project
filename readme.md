# Belalang Sembah - ASCII Art Lyrics Visualizer

Project visualisasi lirik lagu dinamis berbasis **HTML, CSS, dan JavaScript murni** (ASCII Art) yang dikonfigurasi khusus untuk lagu **"Belalang Sembah"** oleh **Hindia / .Feast**.

Repository ini telah diinisialisasi untuk: [https://github.com/zangetsux06/Belalang_Sembah_Project.git](https://github.com/zangetsux06/Belalang_Sembah_Project.git)

---

## 🚀 Cara Menjalankan dengan Live Server

1. Buka folder project ini di **VS Code**.
2. Klik kanan pada file `index.html` lalu pilih **"Open with Live Server"** (atau klik tombol **Go Live** di pojok kanan bawah VS Code).
3. Halaman visualizer akan langsung terbuka di browser.
4. Lirik lagu akan langsung berjalan secara otomatis.

> **Catatan Pemutaran Musik di Browser:**
> Sebagian besar browser (Chrome, Edge, Firefox) membatasi pemutaran audio otomatis (*autoplay policy*) sebelum ada interaksi pengguna di layar. 
> Jika audio belum bersuara saat dibuka pertama kali, cukup **klik 1x di layar** atau **tekan Spasi**, musik dan animasi lirik akan langsung berjalan sinkron.

---

## 🎵 1. Cara Menambahkan Lagu (Audio MP3)

1. Download lagu **Belalang Sembah** dalam format `.mp3`.
2. Masukkan file mp3 tersebut ke dalam folder project ini (satu folder dengan `index.html`).
3. Beri nama file tersebut:
   - `audio.mp3` **atau** `belalang_sembah.mp3`
4. Jalankan kembali Live Server, lagu akan otomatis diputar bersamaan dengan animasinya!

---

## ✂️ 2. Cara Mengatur Potongan Lirik & Durasi

Buka file `index.html` dan lihat bagian `const config = {` (sekitar baris 200).

Di bagian `lyrics: [ ... ]`, Anda bisa menambahkan, mengurangi, atau memotong lirik sesuai selera:

```javascript
lyrics: [
  { text: "Tapi jadikanku belalang sembah", showMs: 2800, hideMs: 500 },
  { text: "Walau sebentar kupercaya indah", showMs: 2800, hideMs: 500 },
  { text: "Seberapa banyak, seberapa mahal", showMs: 3000, hideMs: 500 },
  { text: "Semua 'kan kuberi",              showMs: 1800, hideMs: 300 },
  { text: "Semua 'kan kugadai",             showMs: 1800, hideMs: 400 },
  { text: "Matikan aku setelah usai",       showMs: 3200, hideMs: 900 }
]
```

- **`text`**: Kalimat atau frasa lirik yang ingin ditampilkan. Teks panjang akan otomatis dibungkus (*word-wrap*) rapi ke tengah layar.
- **`showMs`**: Durasi teks tampil di layar dalam milidetik (contoh: `2800` = 2,8 detik).
- **`hideMs`**: Jeda waktu layar kosong/hitam sebelum baris berikutnya muncul (contoh: `500` = 0,5 detik).

---

## ⏱️ 3. Cara Mengatur Mulai Dari Bagian Tertentu (Offset & Index)

Jika Anda ingin langsung memulai visualizer dari bagian tertentu (misal langsung Chorus atau Verse 2):

### A. Memilih Baris Lirik Awal (`startIndex`)
Ubah nilai `startIndex` pada `config`:
```javascript
// 0 = mulai dari baris lirik pertama
// 2 = mulai dari baris lirik ketiga
// 5 = mulai dari baris lirik keenam
startIndex: 0,
```

### B. Memilih Menit/Detik Audio Mulai (`audioStartTime`)
Ubah nilai `audioStartTime` (dalam satuan **detik**):
```javascript
// 0  = lagu mulai dari detik ke-0 (awal lagu)
// 75 = lagu langsung melompat ke detik 75 (01:15) pas bagian chorus
// 120 = lagu langsung melompat ke menit 02:00
audioStartTime: 0,
```

---

## 🎨 4. Mengubah Tema Warna

Di bagian atas `index.html`, Anda dapat menyesuaikan warna tema pada tag `<style>`:

```css
:root {
  --color-primary: #4ecca3;   /* Warna utama teks ASCII (Mantis Emerald) */
  --color-accent: #a8ff78;    /* Warna aksen highlight */
  --color-glow: rgba(78, 204, 163, 0.4); /* Efek cahaya neon glow */
  --brightness: 1.35;        /* Kecerahan teks */
}
```

Jika ingin visualizer kembali ke monokrom hitam-putih klasik, cukup ubah:
```javascript
useThemeColor: false,
```

---

## ⌨️ Tombol Navigasi Cepat

- **`Spasi` / `Klik Layar`** : Play / Pause animasi visualizer dan lagu.
- **`Panah Kanan (→)`** : Langsung melompat ke baris lirik berikutnya.
- **`Panah Kiri (←)`** : Kembali ke baris lirik sebelumnya.

---

## 📦 Git & GitHub

Repository ini terhubung ke:
- **Repository:** [https://github.com/zangetsux06/Belalang_Sembah_Project.git](https://github.com/zangetsux06/Belalang_Sembah_Project.git)
- **Author / Maintainer:** [zangetsux06](https://github.com/zangetsux06)
