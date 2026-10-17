/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - DYNAMIC ASCII ART VISUALIZER
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin render visualizer ASCII multi-momen dinamis dengan
 * sinkronisasi audio real-time, logo album art resmi .Feast, tipografi lirik besar,
 * dan animasi visual atmosferik yang hidup.
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (VERSE 2 & CHORUS 2)
  // =========================================================================
  // - text     : Kalimat lirik yang ingin ditampilkan (otomatis terbungkus rapi ke tengah)
  // - startSec : Detik audio vokal mulai (contoh: 135.8 = menit 02:15.8)
  // - endSec   : Detik audio vokal selesai (contoh: 139.6 = menit 02:19.6)
  // - font     : Gaya font khusus (Playfair Display, Cinzel, Montserrat)
  // - showMs   : Durasi tampil jika audio belum bersuara (fallback)
  // - hideMs   : Jeda layar sebelum baris berikutnya (fallback)
  // =========================================================================
  const config = {
    lyrics: [
      // --- MOMENT 1 (02:15.8 - 02:32.4): STALKER & OBSESI BUTA (VERSE 2A) ---
      {
        text: "Jumlah rambutmu 'kan kuhafal mati",
        startSec: 135.8,
        endSec: 139.6,
        showMs: 3800,
        hideMs: 400,
        font: 'italic 700 21px "Playfair Display", "Georgia", serif'
      },
      {
        text: "Rute pulangmu telah kupelajari",
        startSec: 140.0,
        endSec: 143.8,
        showMs: 3800,
        hideMs: 400,
        font: 'italic 700 21px "Playfair Display", "Georgia", serif'
      },
      {
        text: "Kutahu nama anak kita nanti",
        startSec: 144.2,
        endSec: 147.8,
        showMs: 3600,
        hideMs: 400,
        font: 'italic 700 21px "Playfair Display", "Georgia", serif'
      },
      {
        text: "Suatu saat kau pasti mengerti",
        startSec: 148.2,
        endSec: 152.0,
        showMs: 3800,
        hideMs: 400,
        font: 'italic 700 21px "Playfair Display", "Georgia", serif'
      },

      // --- MOMENT 2 (02:32.4 - 02:49.0): KESENJANGAN SOSIAL & RADAR APLIKASI (VERSE 2B) ---
      {
        text: "Walau upahku dalam sebulan",
        startSec: 152.4,
        endSec: 156.0,
        showMs: 3600,
        hideMs: 400,
        font: 'bold 21px "Cinzel", "Times New Roman", serif'
      },
      {
        text: "Hanya porsimu dalam sehari",
        startSec: 156.4,
        endSec: 160.4,
        showMs: 4000,
        hideMs: 400,
        font: 'bold 21px "Cinzel", "Times New Roman", serif'
      },
      {
        text: "Di dalam app kita bersimpangan",
        startSec: 160.8,
        endSec: 164.8,
        showMs: 4000,
        hideMs: 400,
        font: '900 22px "Montserrat", sans-serif'
      },
      {
        text: "Aku yakin kau bisa mengerti",
        startSec: 164.8,
        endSec: 169.0,
        showMs: 4200,
        hideMs: 500,
        font: '900 22px "Montserrat", sans-serif'
      },

      // --- MOMENT 3 (02:49.5 - 03:08.6): KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
      {
        text: "Maka jadikanku belalang sembah",
        startSec: 169.5,
        endSec: 177.5,
        showMs: 8000,
        hideMs: 500,
        font: 'bold 23px "Cinzel Decorative", "Cinzel", serif'
      },
      {
        text: "Walau sebentar kupercaya indah",
        startSec: 178.0,
        endSec: 184.8,
        showMs: 6800,
        hideMs: 400,
        font: 'bold 23px "Cinzel Decorative", "Cinzel", serif'
      },
      {
        text: "Seberapa banyak, seberapa mahal",
        startSec: 185.2,
        endSec: 188.6,
        showMs: 3400,
        hideMs: 400,
        font: 'bold 22px "Cinzel Decorative", "Cinzel", serif'
      },

      // --- MOMENT 4 (03:08.6 - 03:23.0): SUMPAH DARAH & PENGORBANAN FATAL ---
      {
        text: "Semua 'kan kuberi",
        startSec: 189.0,
        endSec: 191.4,
        showMs: 2400,
        hideMs: 400,
        font: '900 23px "Montserrat", "Impact", sans-serif'
      },
      {
        text: "Semua 'kan kugadai",
        startSec: 191.8,
        endSec: 194.2,
        showMs: 2400,
        hideMs: 400,
        font: '900 23px "Montserrat", "Impact", sans-serif'
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 194.6,
        endSec: 198.0,
        showMs: 3400,
        hideMs: 500,
        font: '900 24px "Montserrat", "Impact", sans-serif'
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 198.5,
        endSec: 202.0,
        showMs: 3500,
        hideMs: 1000,
        font: '900 24px "Montserrat", "Impact", sans-serif'
      }
    ],

    audioStartTime: 133.0, // Mulai detik 133.0 (02:13.0) -> Jeda 2.8 detik untuk Intro Logo & Judul
    audioEndTime: 203.0,   // Selesai detik 203.0 (03:23.0) -> Selesai setelah 'Matikan aku setelah usai'
    isLooping: true
  };

  // =========================================================================
  // 🎮 2. INISIALISASI ELEMEN & AUDIO
  // =========================================================================
  const canvas = document.getElementById("prerender");
  const output = document.getElementById("output");
  const outputWrapper = document.getElementById("output-wrapper");
  const audioElement = document.getElementById("audio-player");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  // Shading karakter ASCII kerapatan tinggi untuk kejelasan teks maksimal
  const charsFixed = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"];
  const charsLength = charsFixed.length;

  // Preload gambar album cover resmi .Feast (Kucing Maneki-Neko & Penyembah)
  const coverImg = new Image();
  coverImg.src = "cover.jpg";

  let currentLyricIndex = 0;
  let lastTime = 0;
  let timeAccumulator = 0;
  let isShowing = true;
  let isPaused = false;
  let isGlitchActive = false;
  let glitchTimeout = null;

  // Web Audio API Analyser untuk responsivitas beat & bass
  let audioCtx = null;
  let analyser = null;
  let dataArray = null;

  const initAudioAnalyser = () => {
    if (audioCtx || !audioElement) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioCtx = new AudioContextClass();
      const source = audioCtx.createMediaElementSource(audioElement);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      dataArray = new Uint8Array(analyser.frequencyBinCount);
    } catch (e) {
      // AudioContext fallback otomatis
    }
  };

  const getBassEnergy = () => {
    if (!analyser || !dataArray) return 0;
    analyser.getByteFrequencyData(dataArray);
    const lowFreq = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    return lowFreq / 255;
  };

  const triggerGlitch = (duration = 140) => {
    isGlitchActive = true;
    if (outputWrapper) outputWrapper.classList.add("glitching");
    clearTimeout(glitchTimeout);
    glitchTimeout = setTimeout(() => {
      isGlitchActive = false;
      if (outputWrapper) outputWrapper.classList.remove("glitching");
    }, duration);
  };

  setInterval(() => {
    if (!isPaused && isShowing && Math.random() < 0.25) {
      triggerGlitch(75);
    }
  }, 4000);

  // =========================================================================
  // 🎵 3. SISTEM PEMUTARAN AUDIO TANPA PESAN DI LAYAR
  // =========================================================================
  const playAudio = () => {
    if (!audioElement) return;
    initAudioAnalyser();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    if (audioElement.currentTime < config.audioStartTime || audioElement.currentTime >= (config.audioEndTime || 9999)) {
      audioElement.currentTime = config.audioStartTime;
    }
    const p = audioElement.play();
    if (p !== undefined) {
      p.then(() => {
        isPaused = false;
      }).catch(() => {
        const unlock = () => {
          if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
          if (audioElement.currentTime < config.audioStartTime || audioElement.currentTime >= (config.audioEndTime || 9999)) {
            audioElement.currentTime = config.audioStartTime;
          }
          audioElement.play().catch(() => {});
          isPaused = false;
          window.removeEventListener("click", unlock);
          window.removeEventListener("keydown", unlock);
        };
        window.addEventListener("click", unlock, { once: true });
        window.addEventListener("keydown", unlock, { once: true });
      });
    }
  };

  const handleUserInteraction = () => {
    if (!audioElement) return;
    initAudioAnalyser();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    if (audioElement.paused) {
      playAudio();
    } else {
      audioElement.pause();
      isPaused = true;
    }
  };

  window.addEventListener("click", handleUserInteraction);
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      handleUserInteraction();
    } else if (e.code === "ArrowRight") {
      e.preventDefault();
      currentLyricIndex = (currentLyricIndex + 1) % config.lyrics.length;
      timeAccumulator = 0;
      isShowing = true;
      triggerGlitch(160);
      if (audioElement && config.lyrics[currentLyricIndex].startSec !== undefined) {
        audioElement.currentTime = config.lyrics[currentLyricIndex].startSec;
      }
    } else if (e.code === "ArrowLeft") {
      e.preventDefault();
      currentLyricIndex = (currentLyricIndex - 1 + config.lyrics.length) % config.lyrics.length;
      timeAccumulator = 0;
      isShowing = true;
      triggerGlitch(160);
      if (audioElement && config.lyrics[currentLyricIndex].startSec !== undefined) {
        audioElement.currentTime = config.lyrics[currentLyricIndex].startSec;
      }
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    playAudio();
  });

  // =========================================================================
  // 🏛️ 4. INTRO LOGO & ALBUM ART .FEAST (DETIK 133.0 - 135.8 / 02:13.0)
  // =========================================================================
  const drawIntroScene = (time, curTime, bass) => {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;

    ctx.save();

    // 1. Gambar Logo / Album Cover Resmi .Feast
    const imgSize = 48;
    const imgX = cx - (imgSize / 2);
    const imgY = 16;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      // Gambar cover asli dari file dengan kontras tinggi untuk detail ASCII optimal
      try {
        ctx.filter = "contrast(1.6) brightness(1.2)";
      } catch (e) {}
      ctx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
      ctx.filter = "none";
    } else {
      // Fallback Vektor Seni ASCII: Kucing Keberuntungan Emas (Maneki-neko) & Penyembah
      const catY = imgY + 12;
      // Kepala Kucing
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(cx, catY, 12, 0, Math.PI * 2);
      ctx.fill();
      // Telinga Kucing Kiri & Kanan
      ctx.beginPath();
      ctx.moveTo(cx - 10, catY - 6);
      ctx.lineTo(cx - 14, catY - 17);
      ctx.lineTo(cx - 4, catY - 11);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(cx + 10, catY - 6);
      ctx.lineTo(cx + 14, catY - 17);
      ctx.lineTo(cx + 4, catY - 11);
      ctx.closePath();
      ctx.fill();
      // Tangan Kucing Kiri Melambai (Maneki-Neko Paw)
      const wave = Math.sin(time * 0.008) * 3;
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(cx + 11, catY + 2);
      ctx.lineTo(cx + 18, catY - 8 + wave);
      ctx.stroke();
      // Kalung Lonceng & Tubuh
      ctx.fillRect(cx - 10, catY + 11, 20, 16);
    }

    // Bingkai Ornamen Gothic / Brackets di Sekeliling Album Art
    ctx.strokeStyle = "rgba(255, 255, 255, 0.75)";
    ctx.lineWidth = 1;
    const framePad = 3;
    const bx = imgX - framePad;
    const by = imgY - framePad;
    const bw = imgSize + framePad * 2;
    const bh = imgSize + framePad * 2;
    const bLen = 8;
    // Sudut Kiri-Atas
    ctx.beginPath(); ctx.moveTo(bx, by + bLen); ctx.lineTo(bx, by); ctx.lineTo(bx + bLen, by); ctx.stroke();
    // Sudut Kanan-Atas
    ctx.beginPath(); ctx.moveTo(bx + bw - bLen, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + bLen); ctx.stroke();
    // Sudut Kiri-Bawah
    ctx.beginPath(); ctx.moveTo(bx, by + bh - bLen); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bLen, by + bh); ctx.stroke();
    // Sudut Kanan-Bawah
    ctx.beginPath(); ctx.moveTo(bx + bw - bLen, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - bLen); ctx.stroke();

    // 2. Tulisan Judul Lagu & Artis
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Header Atas: BELALANG SEMBAH
    ctx.font = 'bold 15px "Cinzel Decorative", "Cinzel", serif';
    ctx.fillText("B E L A L A N G   S E M B A H", cx, 8);

    // Subtitle Bawah: . F E A S T
    ctx.font = '900 11.5px "Montserrat", sans-serif';
    ctx.fillText(". F E A S T", cx, h - 8);

    // Indikator Posisi Momen Waktu
    ctx.font = '700 8.5px "Courier New", monospace';
    ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
    ctx.fillText("[ 02:13 // VERSE 2 & CHORUS ]", cx, h - 18);

    ctx.restore();
  };

  // =========================================================================
  // 🎭 5. REVISI 4 TEMA VISUAL ANIMASI ASCII YANG LEBIH HIDUP & BERAGAM
  // =========================================================================
  const drawMomentScene = (time, curTime, bass) => {
    const cx = canvas.width / 2;
    const baseY = canvas.height - 1;

    ctx.save();

    // --- TEMA 1: (02:15.8 - 02:32.4) STALKER & OBSESI BUTA (MATA, RUTE JALAN, HELAI RAMBUT) ---
    if (curTime < 152.4) {
      // 1. Grid Garis Perspektif Jalanan Malam Menghilang ke Cakrawala ("Rute Pulangmu Telah Kupelajari")
      const horizonY = baseY - 36;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 1;
      
      // Garis jalan perspektif dari cakrawala ke bawah
      for (let rx = -90; rx <= 90; rx += 30) {
        ctx.beginPath();
        ctx.moveTo(cx + rx * 0.15, horizonY);
        ctx.lineTo(cx + rx * 1.3, baseY);
        ctx.stroke();
      }

      // Garis marka jalan meluncur maju (simulasi berkendara / mengikuti target)
      const roadSpeed = (time * 0.05) % 12;
      for (let dy = 0; dy < 36; dy += 8) {
        const yPos = horizonY + dy + roadSpeed;
        if (yPos <= baseY) {
          const spread = ((yPos - horizonY) / 36) * 75;
          ctx.beginPath();
          ctx.moveTo(cx - spread, yPos);
          ctx.lineTo(cx + spread, yPos);
          ctx.stroke();
        }
      }

      // 2. Mata Obsesif Pengintai (The Stalker's Eye) di Tengah
      const eyeY = baseY - 26;
      const eyeWidth = 32 + bass * 4;
      const eyeHeight = 13 + bass * 3;

      // Kelopak Mata Atas & Bawah
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx - eyeWidth, eyeY);
      ctx.quadraticCurveTo(cx, eyeY - eyeHeight, cx + eyeWidth, eyeY);
      ctx.quadraticCurveTo(cx, eyeY + eyeHeight, cx - eyeWidth, eyeY);
      ctx.stroke();

      // Pupil & Iris yang Membesar/Mengecil Mengikuti Hentakan Musik
      const irisRadius = 7 + bass * 3;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(cx, eyeY, irisRadius, 0, Math.PI * 2);
      ctx.fill();

      // Reticle / Bidikan Pengintai di Sekitar Mata
      ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - eyeWidth - 8, eyeY); ctx.lineTo(cx - eyeWidth - 2, eyeY);
      ctx.moveTo(cx + eyeWidth + 2, eyeY); ctx.lineTo(cx + eyeWidth + 8, eyeY);
      ctx.moveTo(cx, eyeY - eyeHeight - 5); ctx.lineTo(cx, eyeY - eyeHeight - 1);
      ctx.moveTo(cx, eyeY + eyeHeight + 1); ctx.lineTo(cx, eyeY + eyeHeight + 5);
      ctx.stroke();

      // 3. Helai Rambut Halus Mengambang Tertiup Angin ("Jumlah Rambutmu 'Kan Kuhafal Mati")
      ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      ctx.lineWidth = 1;
      for (let h = 0; h < 4; h++) {
        const hY = baseY - 38 + (h * 9);
        ctx.beginPath();
        ctx.moveTo(cx - 110, hY);
        for (let hx = cx - 110; hx <= cx + 110; hx += 10) {
          const hyOffset = Math.sin(time * 0.003 + hx * 0.04 + h) * 4;
          ctx.lineTo(hx, hY + hyOffset);
        }
        ctx.stroke();
      }
    }

    // --- TEMA 2: (02:32.4 - 02:49.0) KESENJANGAN SOSIAL & RADAR INTERSEKSI APLIKASI ---
    else if (curTime < 169.5) {
      const radarY = baseY - 24;
      const radarR = 26 + bass * 3;

      // 1. Lingkaran Radar & Sinyal Pemindai ("Di Dalam App Kita Bersimpangan")
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, radarY, radarR * 0.35, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, radarY, radarR * 0.7, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(cx, radarY, radarR, 0, Math.PI * 2); ctx.stroke();

      // Garis sapuan radar yang berputar 360 derajat
      const sweepAngle = time * 0.004;
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx, radarY);
      ctx.lineTo(cx + Math.cos(sweepAngle) * radarR, radarY + Math.sin(sweepAngle) * radarR);
      ctx.stroke();

      // Dua Titik Koordinat Pengguna yang Bersimpangan (Intersecting Blips)
      const transitPhase = ((curTime - 152.4) / (169.5 - 152.4)) * 2 - 1; // Rentang -1 s/d +1
      const blip1X = cx + (transitPhase * 38);
      const blip1Y = radarY - (transitPhase * 14);
      const blip2X = cx - (transitPhase * 38);
      const blip2Y = radarY + (transitPhase * 14);

      ctx.fillStyle = "white";
      ctx.beginPath(); ctx.arc(blip1X, blip1Y, 2.8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(blip2X, blip2Y, 2.8, 0, Math.PI * 2); ctx.fill();

      // Gelombang getar saat bersimpangan tepat di tengah (160.8 - 164.8)
      if (curTime >= 160.8 && curTime <= 164.8) {
        const ringRipple = ((time * 0.03) % 20);
        ctx.strokeStyle = "white";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(cx, radarY, ringRipple, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Bar Spektrum Kesenjangan Upah vs Porsi (Equalizer Kiri vs Kanan)
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      // Kiri: "Walau Upahku Dalam Sebulan" (Bar lebih rendah/berjuang)
      for (let bx = 0; bx < 6; bx++) {
        const bHeight = 4 + Math.sin(time * 0.005 + bx) * 4 + bass * 5;
        ctx.fillRect(cx - 75 + (bx * 7), baseY - bHeight, 5, bHeight);
      }
      // Kanan: "Hanya Porsimu Dalam Sehari" (Bar tinggi menjulang)
      for (let bx = 0; bx < 6; bx++) {
        const bHeight = 14 + Math.sin(time * 0.007 + bx) * 10 + bass * 14;
        ctx.fillRect(cx + 35 + (bx * 7), baseY - bHeight, 5, bHeight);
      }
    }

    // --- TEMA 3: (02:49.5 - 03:08.6) KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
    else if (curTime < 189.0) {
      // 1. Busur Katedral Gothic Altar Suci
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 1;
      const altarPulse = bass * 5;
      ctx.beginPath();
      ctx.arc(cx, baseY + 6, 44 + altarPulse, Math.PI, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, baseY + 6, 36 + altarPulse, Math.PI, Math.PI * 2);
      ctx.stroke();

      // 16 Sinar Altar Memancar Keluar
      for (let a = Math.PI + 0.15; a < Math.PI * 2 - 0.15; a += 0.28) {
        const rx1 = cx + Math.cos(a) * (45 + altarPulse);
        const ry1 = (baseY + 6) + Math.sin(a) * (45 + altarPulse);
        const rx2 = cx + Math.cos(a) * (52 + altarPulse);
        const ry2 = (baseY + 6) + Math.sin(a) * (52 + altarPulse);
        ctx.beginPath();
        ctx.moveTo(rx1, ry1);
        ctx.lineTo(rx2, ry2);
        ctx.stroke();
      }

      // 2. Belalang Sembah Hidup (Living Majestic Mantis)
      const breathe = Math.sin(time * 0.003) * 1.4 + bass * 2;
      const antennaWave = Math.sin(time * 0.005) * 3.2;

      // Kepala Segitiga
      const headY = baseY - 24 + breathe;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx - 7, headY - 8);
      ctx.lineTo(cx + 7, headY - 8);
      ctx.closePath();
      ctx.fill();

      // Sepasang Mata Majemuk Menyala Tajam (Merespons kick drum)
      ctx.beginPath();
      ctx.arc(cx - 8, headY - 8, 2.7 + bass * 1.2, 0, Math.PI * 2);
      ctx.arc(cx + 8, headY - 8, 2.7 + bass * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // Antena Panjang Meliuk Lentur
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      ctx.moveTo(cx - 3, headY - 8);
      ctx.quadraticCurveTo(cx - 12 + antennaWave, headY - 17, cx - 22 + antennaWave * 1.6, headY - 25);
      ctx.moveTo(cx + 3, headY - 8);
      ctx.quadraticCurveTo(cx + 12 - antennaWave, headY - 17, cx + 22 - antennaWave * 1.6, headY - 25);
      ctx.stroke();

      // Batang Dada Prothorax
      ctx.lineWidth = 3.8;
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx, baseY - 10);
      ctx.stroke();

      // Cakar Raptorial Terlipat Berdoa "Sembah" yang Bergerak Ritmik
      ctx.lineWidth = 2.6;
      const armPray = Math.sin(time * 0.004) * 3.5 + bass * 4;
      // Cakar Kiri
      ctx.beginPath();
      ctx.moveTo(cx - 2, headY + 3);
      ctx.lineTo(cx - 16 - armPray, headY - 3);
      ctx.lineTo(cx - 8 - armPray * 0.5, headY + 10);
      ctx.stroke();
      // Cakar Kanan
      ctx.beginPath();
      ctx.moveTo(cx + 2, headY + 3);
      ctx.lineTo(cx + 16 + armPray, headY - 3);
      ctx.lineTo(cx + 8 + armPray * 0.5, headY + 10);
      ctx.stroke();

      // 3. Kerumunan Penyembah yang Sujud (Sesuai Cover Album .Feast)
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      const bow = Math.sin(time * 0.0035) * 1.5;
      // Deretan jemaah bersujud di sisi kiri dan kanan
      for (let p = -5; p <= 5; p++) {
        if (Math.abs(p) > 1) {
          const px = cx + (p * 18);
          // Punggung orang sujud
          ctx.beginPath();
          ctx.arc(px, baseY - 3 + bow, 6, Math.PI, Math.PI * 2);
          ctx.fill();
          // Kepala sujud ke tanah
          ctx.beginPath();
          ctx.arc(px + (p > 0 ? -6 : 6), baseY - 2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // --- TEMA 4: (03:08.6 - 03:23.0) SUMPAH DARAH, PENGORBANAN FATAL & PELEBURAN KE ANGKASA ---
    else {
      const isDissolving = curTime > 198.5;
      const fadeAlpha = isDissolving ? Math.max(0.08, 1 - (curTime - 198.5) / 4.2) : 1;

      ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
      ctx.strokeStyle = `rgba(255, 255, 255, ${fadeAlpha})`;

      // Cakar Fatal Strike: Menutup dan Menusuk ke Dalam
      const headY = baseY - 22;
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx - 6, headY - 7);
      ctx.lineTo(cx + 6, headY - 7);
      ctx.closePath();
      ctx.fill();

      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - 2, headY + 2);
      ctx.lineTo(cx - 9, headY - 2);
      ctx.lineTo(cx - 1, headY + 8);
      ctx.moveTo(cx + 2, headY + 2);
      ctx.lineTo(cx + 9, headY - 2);
      ctx.lineTo(cx + 1, headY + 8);
      ctx.stroke();

      ctx.lineWidth = 3.6;
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx, baseY - 8);
      ctx.stroke();

      // Hujan Badai Partikel Abu & Bara Api yang Beterbangan
      ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha * 0.9})`;
      for (let e = 0; e < 42; e++) {
        const ex = (cx - 90) + ((e * 23 + Math.floor(time * 0.07)) % 180);
        const ey = ((e * 19 + Math.floor(time * 0.09)) % 38) + (baseY - 38);
        ctx.fillRect(ex, ey, 1.4, 1.4);
      }

      // Gelombang Glitch Kehancuran (Fatal Climax)
      if (curTime >= 194.6 && curTime <= 198.0 && Math.random() < 0.3) {
        ctx.fillRect(0, baseY - 15, canvas.width, 1.5);
      }
    }

    ctx.restore();
  };

  // =========================================================================
  // ✍️ 6. RENDER LIRIK BESAR: PROPORSIONAL DI LAYAR LAPTOP, ANTI-TERPOTONG
  // =========================================================================
  const drawLyricText = (item) => {
    if (!item || !item.text) return;

    const w = canvas.width;
    const text = item.text;
    const words = text.split(" ");

    let fontStr = item.font || 'bold 21px "Cinzel", "Segoe UI", sans-serif';
    ctx.font = fontStr;

    // Auto Word-Wrap ke dalam baris yang proporsional
    let lines = [];
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + " " + word;
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth < w - 28) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    // Auto-scale dinamis jika ada baris yang melampaui lebar kanvas
    const maxLineWidth = Math.max(...lines.map(l => ctx.measureText(l).width));
    if (maxLineWidth > w - 28) {
      const ratio = (w - 28) / maxLineWidth;
      const match = fontStr.match(/(\d+(\.\d+)?)px/);
      if (match) {
        const originalSize = parseFloat(match[1]);
        const newSize = Math.floor(originalSize * ratio);
        fontStr = fontStr.replace(/(\d+(\.\d+)?)px/, `${newSize}px`);
        ctx.font = fontStr;
      }
    }

    ctx.fillStyle = "white"; // Putih di kanvas = Merah menyala bercahaya di ASCII
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lineHeight = 21;
    const totalHeight = lines.length * lineHeight;
    // Posisikan teks di zona atas kanvas secara seimbang (y = 6 s/d 32)
    const startY = 17 - (totalHeight / 2) + (lineHeight / 2);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], w / 2, startY + (i * lineHeight));
    }
  };

  // =========================================================================
  // 🎨 7. RENDER CANVAS UTAMA
  // =========================================================================
  const drawCanvas = (time) => {
    const w = canvas.width;
    const h = canvas.height;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);

    // Dapatkan detik audio saat ini
    let curTime = config.audioStartTime;
    if (audioElement && !audioElement.paused && audioElement.duration > 0) {
      curTime = audioElement.currentTime;
    } else {
      const item = config.lyrics[currentLyricIndex];
      const dur = item ? item.showMs : 3800;
      const frac = Math.min(1, Math.max(0, timeAccumulator / dur));
      curTime = item ? (item.startSec + frac * (item.endSec - item.startSec)) : config.audioStartTime;
    }

    const bass = getBassEnergy();

    // 1. Cek Apakah Masih di Zona Intro (Detik 133.0 s/d 135.8 = Menit 02:13)
    if (curTime < 135.8) {
      drawIntroScene(time, curTime, bass);
      return;
    }

    // 2. Gambar 4 Tema Momen Suasana di Bagian Bawah
    drawMomentScene(time, curTime, bass);

    // 3. Gambar Teks Lirik Besar di Bagian Atas
    if (isShowing) {
      const currentItem = config.lyrics[currentLyricIndex];
      if (currentItem) {
        drawLyricText(currentItem);
      }
    }
  };

  // =========================================================================
  // ⚡ 8. LOOP ANIMASI ASCII REAL-TIME
  // =========================================================================
  const updateASCII = (time) => {
    if (!isPaused) {
      if (audioElement && !audioElement.paused && audioElement.duration > 0) {
        const curTime = audioElement.currentTime;

        // Cek batas akhir klip
        if (config.audioEndTime && curTime >= config.audioEndTime) {
          if (config.isLooping) {
            audioElement.currentTime = config.audioStartTime;
            currentLyricIndex = 0;
            isShowing = true;
            triggerGlitch(180);
          } else {
            isPaused = true;
            audioElement.pause();
          }
          return;
        }

        // Sinkronisasi Lirik
        let matched = false;
        for (let i = 0; i < config.lyrics.length; i++) {
          const item = config.lyrics[i];
          if (item.startSec !== undefined && item.endSec !== undefined) {
            if (curTime >= item.startSec && curTime <= item.endSec) {
              if (currentLyricIndex !== i) {
                currentLyricIndex = i;
                triggerGlitch(150);
              }
              isShowing = true;
              matched = true;
              break;
            } else if (i < config.lyrics.length - 1 && curTime > item.endSec && curTime < config.lyrics[i + 1].startSec) {
              currentLyricIndex = i;
              isShowing = false;
              matched = true;
              break;
            } else if (i === config.lyrics.length - 1 && curTime > item.endSec) {
              currentLyricIndex = i;
              isShowing = false;
              matched = true;
              break;
            }
          }
        }

        if (!matched && curTime < 135.8) {
          isShowing = false; // Saat intro, teks lirik disembunyikan agar logo tampil penuh
        }
      } else {
        // Fallback jika audio ditahan browser
        if (lastTime === 0) lastTime = time;
        const deltaTime = time - lastTime;
        timeAccumulator += deltaTime;

        const currentLyric = config.lyrics[currentLyricIndex];
        const currentPhaseDuration = isShowing ? currentLyric.showMs : currentLyric.hideMs;

        if (timeAccumulator > currentPhaseDuration) {
          timeAccumulator = 0;
          if (isShowing) {
            isShowing = false;
          } else {
            isShowing = true;
            currentLyricIndex++;
            if (currentLyricIndex >= config.lyrics.length) {
              currentLyricIndex = config.isLooping ? 0 : config.lyrics.length - 1;
            }
            triggerGlitch(150);
          }
        }
      }
    }
    lastTime = time;

    drawCanvas(time);

    const w = canvas.width;
    const h = canvas.height;
    const data = ctx.getImageData(0, 0, w, h).data;

    let outputText = "";
    
    for (let y = 0; y < h; y += 2) { // Sampling y step=2 untuk proporsi sempurna rasio monospace
      let row = "";
      for (let x = 0; x < w; x++) {
        const index = (x + y * w) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const c = (r + g + b) / 3;

        if (c < 22) {
          row += " ";
        } else {
          let char;
          if (isGlitchActive && Math.random() < 0.16) {
            const glitchGlyphs = ["†", "‡", "§", "ø", "X", "✦", "#", "!", "?"];
            char = glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)];
          } else {
            const charIndex = Math.floor((charsLength * c) / 255);
            const safeCharIndex = Math.min(Math.max(charIndex, 0), charsLength - 1);
            char = charsFixed[safeCharIndex];
          }

          // Pewarnaan Merah Obsesif: Teks menyala terang, aset atmosferik mendukung secara sinematik
          let charColor, glow;
          if (c > 185) {
            // Teks Lirik / Judul Intro bercahaya tajam
            const brightReds = ["#ff1744", "#ff2a55", "#ff003b", "#ff3366"];
            charColor = brightReds[(x + y) % brightReds.length];
            glow = `0 0 5px ${charColor}, 0 0 12px rgba(255, 23, 68, 0.75)`;
          } else if (c > 120) {
            // Siluet tubuh atmosferik / cover album
            const midReds = ["#e50914", "#dc143c", "#c00028"];
            charColor = midReds[(x + y) % midReds.length];
            glow = `0 0 3px rgba(220, 20, 60, 0.5)`;
          } else if (c > 60) {
            // Garis detail halus / sinar radar
            charColor = "#a80020";
            glow = "none";
          } else {
            charColor = "#550010";
            glow = "none";
          }

          if (glow !== "none") {
            row += `<span style="color:${charColor};text-shadow:${glow};">${char}</span>`;
          } else {
            row += `<span style="color:${charColor};">${char}</span>`;
          }
        }
      }
      outputText += row + "\n";
    }

    output.innerHTML = outputText;

    requestAnimationFrame(updateASCII);
  };

  requestAnimationFrame(updateASCII);
})();
