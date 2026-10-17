/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - DYNAMIC ASCII ART VISUALIZER
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin render visualizer ASCII multi-momen dinamis dengan
 * sinkronisasi audio real-time dan tipografi beresolusi tinggi.
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (BISA ANDA EDIT DENGAN MUDAH DI SINI)
  // =========================================================================
  // Parameter per baris lirik:
  // - text     : Kalimat lirik yang ingin ditampilkan (otomatis terbungkus rapi ke tengah)
  // - startSec : Detik audio vokal mulai (contoh: 67.5 = menit 01:07.5)
  // - endSec   : Detik audio vokal selesai (contoh: 72.8 = menit 01:12.8)
  // - font     : Gaya font khusus (tema cinta gelap, romansa obsesif, katedral gothic)
  // - showMs   : Durasi tampil jika audio belum bersuara (5300 = 5.3 detik)
  // - hideMs   : Jeda layar gelap sebelum baris berikutnya (600 = 0.6 detik)
  // =========================================================================
  const config = {
    lyrics: [
      // --- MOMENT 1 (01:07.0 - 01:25.0): FIGURAN BURAM (TEMA CINTA OBSESIF & SULTRY NOIR) ---
      {
        text: "Namun sabun kita berbeda wangi",
        startSec: 67.5,
        endSec: 72.8,
        showMs: 5300,
        hideMs: 600,
        font: 'italic 700 17px "Playfair Display", "Georgia", serif'
      },
      {
        text: "Dan tubuhmu dibalut hal berbeda tiap malam",
        startSec: 73.4,
        endSec: 80.2,
        showMs: 6800,
        hideMs: 600,
        font: 'italic 700 16.5px "Playfair Display", "Georgia", serif'
      },
      {
        text: "Saat ini ku masih figuran buram",
        startSec: 80.8,
        endSec: 85.0,
        showMs: 4200,
        hideMs: 400,
        font: 'italic 700 17px "Playfair Display", "Georgia", serif'
      },

      // --- MOMENT 2 (01:25.0 - 01:45.5): CHORUS 1 (TEMA ADORASI KATEDRAL GOTHIC & KULTUS) ---
      {
        text: "Tapi jadikanku belalang sembah",
        startSec: 85.4,
        endSec: 93.4,
        showMs: 8000,
        hideMs: 400,
        font: 'bold 18px "Cinzel Decorative", "Cinzel", "Times New Roman", serif'
      },
      {
        text: "Walau sebentar kupercaya indah",
        startSec: 93.8,
        endSec: 101.0,
        showMs: 7200,
        hideMs: 400,
        font: 'bold 18px "Cinzel Decorative", "Cinzel", "Times New Roman", serif'
      },
      {
        text: "Seberapa banyak, seberapa mahal",
        startSec: 101.4,
        endSec: 105.4,
        showMs: 4000,
        hideMs: 300,
        font: 'bold 18px "Cinzel", "Cinzel Decorative", "Times New Roman", serif'
      },

      // --- MOMENT 3 (01:45.5 - 02:07.0): MATIKAN AKU (TEMA PENGORBANAN FATAL & SUMPAH DARAH) ---
      {
        text: "Semua 'kan kuberi",
        startSec: 105.7,
        endSec: 107.9,
        showMs: 2200,
        hideMs: 200,
        font: '900 19px "Montserrat", "Impact", "Arial Black", sans-serif'
      },
      {
        text: "Semua 'kan kugadai",
        startSec: 108.1,
        endSec: 110.6,
        showMs: 2500,
        hideMs: 300,
        font: '900 19px "Montserrat", "Impact", "Arial Black", sans-serif'
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 110.9,
        endSec: 114.6,
        showMs: 3700,
        hideMs: 300,
        font: '900 19px "Montserrat", "Impact", "Arial Black", sans-serif'
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 114.9,
        endSec: 118.5,
        showMs: 3600,
        hideMs: 8500,
        font: '900 19px "Montserrat", "Impact", "Arial Black", sans-serif'
      }
    ],

    audioStartTime: 67.0,   // Mulai detik 67.0 (01:07.0)
    audioEndTime: 127.0,     // Selesai detik 127.0 (02:07.0) = Tepat 60 Detik (1 Menit)
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

  let currentLyricIndex = 0;
  let lastTime = 0;
  let timeAccumulator = 0;
  let isShowing = true;
  let isPaused = false;
  let isGlitchActive = false;
  let glitchTimeout = null;

  // Analyser audio untuk responsivitas beat & bass
  let audioCtx = null;
  let analyser = null;
  let dataArray = null;
  let bassIntensity = 0;

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
      // AudioContext fallback otomatis jika di-sandbox
    }
  };

  const getBassEnergy = () => {
    if (!analyser || !dataArray) return 0;
    analyser.getByteFrequencyData(dataArray);
    // Ambil rata-rata frekuensi rendah (bass drum / kick)
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

  // Glitch periodik halus untuk dinamika visual
  setInterval(() => {
    if (!isPaused && isShowing && Math.random() < 0.28) {
      triggerGlitch(80);
    }
  }, 3800);

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
        // Autoplay bersuara ditahan browser sampai ada interaksi user pertama
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

  // Klik di mana saja atau tekan spasi untuk memutar/pause
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
  // 🎭 4. TIGA TEMA MOMEN SUASANA SENI ASCII YANG HIDUP & BERGERAK
  // =========================================================================
  const drawMomentScene = (time, curTime, bass) => {
    const cx = canvas.width / 2;
    const baseY = canvas.height - 1;

    ctx.save();

    // --- TEMA MOMEN 1: (01:07 - 01:25) FIGURAN BURAM & SMOLDERING NOIR ---
    if (curTime < 85.2) {
      // 1. Siluet Gedung Kota Malam di dasar dengan lampu berkerlap-kerlip
      ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      for (let x = 0; x < canvas.width; x += 6) {
        const bHeight = 8 + Math.abs(Math.sin(x * 0.28)) * 8 + (x % 5) * 1.5;
        ctx.fillRect(x, baseY - bHeight, 5, bHeight);

        // Lampu jendela kota malam
        ctx.fillStyle = "white";
        for (let wy = baseY - bHeight + 2; wy < baseY - 2; wy += 4) {
          if ((x + wy + Math.floor(time * 0.002)) % 3 === 0) {
            ctx.fillRect(x + 2, wy, 1.4, 1.4);
          }
        }
        ctx.fillStyle = "rgba(255, 255, 255, 0.45)";
      }

      // 2. Kepulan Asap Rokok / Hawa Misterius Melayang Naik
      ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      ctx.lineWidth = 1.2;
      for (let s = 0; s < 5; s++) {
        const sOffset = (s - 2) * 26;
        ctx.beginPath();
        ctx.moveTo(cx + sOffset, baseY - 10);
        for (let sy = baseY - 10; sy > baseY - 30; sy -= 3) {
          const sx = cx + sOffset + Math.sin(time * 0.003 + sy * 0.18 + s) * 4;
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // 3. Dua Siluet Tangan Menjangkau Satu Sama Lain ("Figuran Buram")
      const reach = Math.sin(time * 0.0025) * 2.5 + bass * 2;
      ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
      // Tangan Kiri
      ctx.fillRect(cx - 36 + reach, baseY - 20, 16, 3);
      ctx.fillRect(cx - 22 + reach, baseY - 22, 7, 2);
      // Tangan Kanan
      ctx.fillRect(cx + 20 - reach, baseY - 20, 16, 3);
      ctx.fillRect(cx + 15 - reach, baseY - 22, 7, 2);
    }

    // --- TEMA MOMEN 2: (01:25 - 01:45.5) ALTAR KATEDRAL BELALANG SEMBAH HIDUP ---
    else if (curTime < 105.5) {
      // 1. Halo Busur Katedral Gothic di Belakang Belalang
      ctx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      ctx.lineWidth = 1;
      const altarPulse = bass * 4;
      ctx.beginPath();
      ctx.arc(cx, baseY + 8, 42 + altarPulse, Math.PI, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, baseY + 8, 34 + altarPulse, Math.PI, Math.PI * 2);
      ctx.stroke();

      // Sinar Altar Memancar
      for (let a = Math.PI + 0.15; a < Math.PI * 2 - 0.15; a += 0.3) {
        const rx1 = cx + Math.cos(a) * (43 + altarPulse);
        const ry1 = (baseY + 8) + Math.sin(a) * (43 + altarPulse);
        const rx2 = cx + Math.cos(a) * (49 + altarPulse);
        const ry2 = (baseY + 8) + Math.sin(a) * (49 + altarPulse);
        ctx.beginPath();
        ctx.moveTo(rx1, ry1);
        ctx.lineTo(rx2, ry2);
        ctx.stroke();
      }

      // 2. Tubuh Belalang Sembah yang Hidup & Bernapas
      const breathe = Math.sin(time * 0.003) * 1.2 + bass * 1.5;
      const antennaWave = Math.sin(time * 0.005) * 2.8;

      // Kepala Segitiga
      const headY = baseY - 22 + breathe;
      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx - 6, headY - 7);
      ctx.lineTo(cx + 6, headY - 7);
      ctx.closePath();
      ctx.fill();

      // Sepasang Mata Majemuk Menyala Merah (Bereaksi pada bass kick)
      ctx.beginPath();
      ctx.arc(cx - 7, headY - 7, 2.5 + bass * 0.8, 0, Math.PI * 2);
      ctx.arc(cx + 7, headY - 7, 2.5 + bass * 0.8, 0, Math.PI * 2);
      ctx.fill();

      // Antena Panjang Meliuk
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 3, headY - 7);
      ctx.quadraticCurveTo(cx - 10 + antennaWave, headY - 15, cx - 18 + antennaWave * 1.5, headY - 22);
      ctx.moveTo(cx + 3, headY - 7);
      ctx.quadraticCurveTo(cx + 10 - antennaWave, headY - 15, cx + 18 - antennaWave * 1.5, headY - 22);
      ctx.stroke();

      // Batang Dada Prothorax
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx, baseY - 9);
      ctx.stroke();

      // Cakar Raptorial Terlipat Berdoa "Sembah" yang Bergerak Ritmik
      ctx.lineWidth = 2.4;
      const armPray = Math.sin(time * 0.004) * 3 + bass * 3;
      // Cakar Kiri
      ctx.beginPath();
      ctx.moveTo(cx - 2, headY + 3);
      ctx.lineTo(cx - 14 - armPray, headY - 3);
      ctx.lineTo(cx - 7 - armPray * 0.5, headY + 9);
      ctx.stroke();
      // Cakar Kanan
      ctx.beginPath();
      ctx.moveTo(cx + 2, headY + 3);
      ctx.lineTo(cx + 14 + armPray, headY - 3);
      ctx.lineTo(cx + 7 + armPray * 0.5, headY + 9);
      ctx.stroke();

      // Sayap & Perut
      ctx.beginPath();
      ctx.moveTo(cx, baseY - 9);
      ctx.lineTo(cx - 10, baseY);
      ctx.lineTo(cx + 10, baseY);
      ctx.closePath();
      ctx.fill();

      // Kaki Laba-laba Panjang
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(cx - 2, baseY - 8);
      ctx.lineTo(cx - 22, baseY - 4);
      ctx.lineTo(cx - 34, baseY);
      ctx.moveTo(cx + 2, baseY - 8);
      ctx.lineTo(cx + 22, baseY - 4);
      ctx.lineTo(cx + 34, baseY);
      ctx.stroke();
    }

    // --- TEMA MOMEN 3: (01:45.5 - 02:07) MATIKAN AKU / PENGORBANAN & HUJAN ABU ---
    else {
      const isDying = curTime > 118.5;
      const fadeAlpha = isDying ? Math.max(0.12, 1 - (curTime - 118.5) / 8) : 1;

      ctx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
      ctx.strokeStyle = `rgba(255, 255, 255, ${fadeAlpha})`;

      const headY = baseY - 20;
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx - 6, headY - 7);
      ctx.lineTo(cx + 6, headY - 7);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx - 6.5, headY - 7, 2.3, 0, Math.PI * 2);
      ctx.arc(cx + 6.5, headY - 7, 2.3, 0, Math.PI * 2);
      ctx.fill();

      // Cakar Mengunci Rapat Menusuk ke Dalam (Fatal Strike)
      ctx.lineWidth = 2.8;
      ctx.beginPath();
      ctx.moveTo(cx - 2, headY + 2);
      ctx.lineTo(cx - 8, headY - 2);
      ctx.lineTo(cx - 1, headY + 8);
      ctx.moveTo(cx + 2, headY + 2);
      ctx.lineTo(cx + 8, headY - 2);
      ctx.lineTo(cx + 1, headY + 8);
      ctx.stroke();

      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(cx, headY);
      ctx.lineTo(cx, baseY - 8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, baseY - 8);
      ctx.lineTo(cx - 9, baseY);
      ctx.lineTo(cx + 9, baseY);
      ctx.closePath();
      ctx.fill();

      // Hujan Abu & Partikel Bara Berjatuhan Menghiasi Langit
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      for (let e = 0; e < 32; e++) {
        const ex = (cx - 65) + ((e * 19 + Math.floor(time * 0.05)) % 130);
        const ey = ((e * 23 + Math.floor(time * 0.08)) % 32) + (baseY - 32);
        ctx.fillRect(ex, ey, 1.4, 1.4);
      }
    }

    ctx.restore();
  };

  // =========================================================================
  // ✍️ 5. RENDER LIRIK: BEBAS BATASAN, FONT OBSESIF, TIDAK PERNAH TERPOTONG
  // =========================================================================
  const drawLyricText = (item) => {
    if (!item || !item.text) return;

    const w = canvas.width;
    const text = item.text;
    const words = text.split(" ");

    // Gunakan font bertema khusus atau default font
    let fontStr = item.font || 'bold 17px "Segoe UI", Arial, sans-serif';
    ctx.font = fontStr;

    // Auto Word-Wrap ke dalam 2 baris proporsional
    let lines = [];
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + " " + word;
      const testWidth = ctx.measureText(testLine).width;

      // Ruang aman: minimal menyisakan 28px ruang kosong di tepi kiri & kanan
      if (testWidth < w - 28) {
        currentLine = testLine;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);

    // Auto-scale dinamis: Jika ada baris yang terlalu panjang, kecilkan font secara halus
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

    const lineHeight = 19;
    const totalHeight = lines.length * lineHeight;
    // Posisikan teks di zona atas kanvas (y = 8 s/d 28)
    const startY = 17 - (totalHeight / 2) + (lineHeight / 2);

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], w / 2, startY + (i * lineHeight));
    }
  };

  // =========================================================================
  // 🎨 6. RENDER CANVAS UTAMA (LIRIK DI ATAS + MOMEN SUASANA DI BAWAH)
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
      const dur = item ? item.showMs : 3000;
      const frac = Math.min(1, Math.max(0, timeAccumulator / dur));
      curTime = item ? (item.startSec + frac * (item.endSec - item.startSec)) : config.audioStartTime;
    }

    // Ambil energi bass real-time dari musik
    const bass = getBassEnergy();

    // 1. Gambar 3 Tema Momen Suasana di Bagian Bawah
    drawMomentScene(time, curTime, bass);

    // 2. Gambar Teks Lirik Bersih di Bagian Atas
    if (isShowing) {
      const currentItem = config.lyrics[currentLyricIndex];
      if (currentItem) {
        drawLyricText(currentItem);
      }
    }
  };

  // =========================================================================
  // ⚡ 7. LOOP ANIMASI ASCII REAL-TIME
  // =========================================================================
  const updateASCII = (time) => {
    if (!isPaused) {
      if (audioElement && !audioElement.paused && audioElement.duration > 0) {
        const curTime = audioElement.currentTime;

        // Cek batas akhir klip 1 menit
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

        if (!matched && config.lyrics.length > 0) {
          if (curTime < config.audioStartTime) {
            audioElement.currentTime = config.audioStartTime;
            isShowing = true;
          }
        }
      } else {
        // Fallback waktu jika audio ditahan browser
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

          // Pewarnaan Merah Obsesif: Teks menyala terang, aset atmosferik mendukung dengan estetika sinematik
          let charColor, glow;
          if (c > 190) {
            // Teks Lirik yang sedang aktif tampil
            const brightReds = ["#ff1744", "#ff2a55", "#ff003b", "#ff3366"];
            charColor = brightReds[(x + y) % brightReds.length];
            glow = `0 0 5px ${charColor}, 0 0 12px rgba(255, 23, 68, 0.75)`;
          } else if (c > 120) {
            // Tubuh siluet ilustrasi atmosfer
            const midReds = ["#e50914", "#dc143c", "#c00028"];
            charColor = midReds[(x + y) % midReds.length];
            glow = `0 0 3px rgba(220, 20, 60, 0.5)`;
          } else if (c > 60) {
            // Sinar altar / detail halus
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
