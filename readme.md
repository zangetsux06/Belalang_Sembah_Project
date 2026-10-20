# Belalang Sembah - Real-Time Colored ASCII Lyric Visualizer

Proyek visualisasi lirik lagu dinamis berbasis **HTML5, CSS3, dan Vanilla JavaScript (Pixel-to-ASCII)** yang dirancang dengan estetika terminal retro-futuristik, palet warna tematik (Color Narrative), efek glitch dinamis, serta simulasi partikel tetesan darah untuk lagu **"Belalang Sembah"** oleh **.Feast / Hindia**.

Repository: [https://github.com/zangetsux06/Belalang_Sembah_Project.git](https://github.com/zangetsux06/Belalang_Sembah_Project.git)

---

## 🚀 Cara Menjalankan

1. Buka folder proyek ini di **VS Code**.
2. Klik kanan pada file [**`index.html`**](file:///c:/Users/user/Zael/songs/Belalang_Sembah/index.html) lalu pilih **"Open with Live Server"**.
3. Halaman visualizer akan langsung terbuka di browser.
4. **Catatan Audio Browser:** Klik 1x pada layar atau tekan tombol **Spasi** untuk membuka izin audio (*autoplay policy*), musik dan lirik ASCII akan langsung berjalan sinkron.

---

## ⌨️ Kontrol Navigasi Keyboard & Mouse

| Tombol / Aksi | Fungsi |
|---|---|
| **Klik Layar** | Play / Pause musik dan animasi |
| **Spasi (`Space`)** | Play / Pause musik dan animasi |
| **Panah Kanan (`→`)** | Lompat ke baris lirik berikutnya + sinkron audio |
| **Panah Kiri (`←`)** | Mundur ke baris lirik sebelumnya + sinkron audio |

---

## 🧠 Cetak Biru & Panduan Versi Lagu Lain

Untuk menduplikasi atau membuat visualizer lirik dengan lagu lain, silakan baca dokumentasi cetak biru lengkap pada:
👉 [**`PROJECT_BLUEPRINT.md`**](file:///c:/Users/user/Zael/songs/Belalang_Sembah/PROJECT_BLUEPRINT.md)

Dokumentasi tersebut memuat:
1. Arsitektur teknis pipeline Pixel-to-ASCII.
2. Penjelasan lengkap setiap opsi konfigurasi (`startSec`, `endSec`, `fontSize`, `color`, `singleLine`, `bleeding`).
3. Panduan langkah demi langkah mengganti lagu dan lirik baru.
4. Solusi atas kendala teknis (font overcrowding, wrapping 1 baris, letter-stroke detection, dan gravity particle physics).
