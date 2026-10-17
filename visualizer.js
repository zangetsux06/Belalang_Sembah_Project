/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - STOCKHOLM METRO DOT MATRIX ENGINE
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Tipografi Dot Matrix Stockholm Metro dengan grid titik sirkular
 * beresolusi tinggi, sinkronisasi audio real-time, logo album art .Feast,
 * dan animasi visual atmosferik yang hidup.
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (VERSE 2 & CHORUS 2)
  // =========================================================================
  // - text     : Kalimat lirik yang ingin ditampilkan (otomatis terbungkus rapi ke tengah)
  // - startSec : Detik audio vokal mulai (contoh: 135.8 = menit 02:15.8)
  // - endSec   : Detik audio vokal selesai (contoh: 139.6 = menit 02:19.6)
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
        hideMs: 400
      },
      {
        text: "Rute pulangmu telah kupelajari",
        startSec: 140.0,
        endSec: 143.8,
        showMs: 3800,
        hideMs: 400
      },
      {
        text: "Kutahu nama anak kita nanti",
        startSec: 144.2,
        endSec: 147.8,
        showMs: 3600,
        hideMs: 400
      },
      {
        text: "Suatu saat kau pasti mengerti",
        startSec: 148.2,
        endSec: 152.0,
        showMs: 3800,
        hideMs: 400
      },

      // --- MOMENT 2 (02:32.4 - 02:49.0): KESENJANGAN SOSIAL & RADAR APLIKASI (VERSE 2B) ---
      {
        text: "Walau upahku dalam sebulan",
        startSec: 152.4,
        endSec: 156.0,
        showMs: 3600,
        hideMs: 400
      },
      {
        text: "Hanya porsimu dalam sehari",
        startSec: 156.4,
        endSec: 160.4,
        showMs: 4000,
        hideMs: 400
      },
      {
        text: "Di dalam app kita bersimpangan",
        startSec: 160.8,
        endSec: 164.8,
        showMs: 4000,
        hideMs: 400
      },
      {
        text: "Aku yakin kau bisa mengerti",
        startSec: 164.8,
        endSec: 169.0,
        showMs: 4200,
        hideMs: 500
      },

      // --- MOMENT 3 (02:49.5 - 03:08.6): KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
      {
        text: "Maka jadikanku belalang sembah",
        startSec: 169.5,
        endSec: 177.5,
        showMs: 8000,
        hideMs: 500
      },
      {
        text: "Walau sebentar kupercaya indah",
        startSec: 178.0,
        endSec: 184.8,
        showMs: 6800,
        hideMs: 400
      },
      {
        text: "Seberapa banyak, seberapa mahal",
        startSec: 185.2,
        endSec: 188.6,
        showMs: 3400,
        hideMs: 400
      },

      // --- MOMENT 4 (03:08.6 - 03:23.0): SUMPAH DARAH & PENGORBANAN FATAL ---
      {
        text: "Semua 'kan kuberi",
        startSec: 189.0,
        endSec: 191.4,
        showMs: 2400,
        hideMs: 400
      },
      {
        text: "Semua 'kan kugadai",
        startSec: 191.8,
        endSec: 194.2,
        showMs: 2400,
        hideMs: 400
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 194.6,
        endSec: 198.0,
        showMs: 3400,
        hideMs: 500
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 198.5,
        endSec: 202.0,
        showMs: 3500,
        hideMs: 1000
      }
    ],

    audioStartTime: 133.0, // Mulai detik 133.0 (02:13.0) -> Jeda 2.8 detik untuk Intro Logo & Judul
    audioEndTime: 203.0,   // Selesai detik 203.0 (03:23.0) -> Selesai setelah 'Matikan aku setelah usai'
    isLooping: true
  };

  // =========================================================================
  // 🎮 2. INISIALISASI CANVAS STOCKHOLM METRO & OFFSCREEN BUFFER
  // =========================================================================
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const outputWrapper = document.getElementById("output-wrapper");
  const audioElement = document.getElementById("audio-player");

  const width = 960;
  const height = 540;
  canvas.width = width;
  canvas.height = height;

  // Offscreen Canvas untuk rasterisasi tipografi & animasi sebelum diubah jadi dot matrix
  const offCanvas = document.createElement("canvas");
  offCanvas.width = width;
  offCanvas.height = height;
  const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });

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
    if (!isPaused && isShowing && Math.random() < 0.22) {
      triggerGlitch(75);
    }
  }, 4200);

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

  canvas.addEventListener("click", handleUserInteraction);
  window.addEventListener("click", (e) => {
    if (e.target !== canvas) handleUserInteraction();
  });

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
    const cx = width / 2;

    offCtx.save();

    // 1. Header Atas: B E L A L A N G   S E M B A H
    offCtx.fillStyle = "#ffffff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.font = '700 38px "Space Grotesk", "Helvetica Neue", Arial, sans-serif';
    offCtx.fillText("BELALANG SEMBAH", cx, 65);

    // 2. Cover Art / Logo di Tengah
    const imgSize = 175;
    const imgX = cx - (imgSize / 2);
    const imgY = 115;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      try {
        offCtx.filter = "contrast(1.6) brightness(1.2)";
      } catch (e) {}
      offCtx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
      offCtx.filter = "none";
    } else {
      // Fallback Vektor Seni: Kucing Keberuntungan Emas & Penyembah
      const catY = imgY + 60;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(cx, catY, 44, 0, Math.PI * 2); offCtx.fill();
      offCtx.beginPath();
      offCtx.moveTo(cx - 38, catY - 20); offCtx.lineTo(cx - 52, catY - 60); offCtx.lineTo(cx - 14, catY - 40); offCtx.closePath(); offCtx.fill();
      offCtx.beginPath();
      offCtx.moveTo(cx + 38, catY - 20); offCtx.lineTo(cx + 52, catY - 60); offCtx.lineTo(cx + 14, catY - 40); offCtx.closePath(); offCtx.fill();
      const wave = Math.sin(time * 0.008) * 12;
      offCtx.lineWidth = 14;
      offCtx.strokeStyle = "#ffffff";
      offCtx.beginPath(); offCtx.moveTo(cx + 40, catY + 5); offCtx.lineTo(cx + 68, catY - 30 + wave); offCtx.stroke();
      offCtx.fillRect(cx - 36, catY + 40, 72, 60);
    }

    // Bingkai Ornamen Sudut
    offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    offCtx.lineWidth = 3.5;
    const pad = 10;
    const bx = imgX - pad, by = imgY - pad, bw = imgSize + pad * 2, bh = imgSize + pad * 2, bLen = 25;
    offCtx.beginPath(); offCtx.moveTo(bx, by + bLen); offCtx.lineTo(bx, by); offCtx.lineTo(bx + bLen, by); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx + bw - bLen, by); offCtx.lineTo(bx + bw, by); offCtx.lineTo(bx + bw, by + bLen); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx, by + bh - bLen); offCtx.lineTo(bx, by + bh); offCtx.lineTo(bx + bLen, by + bh); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx + bw - bLen, by + bh); offCtx.lineTo(bx + bw, by + bh); offCtx.lineTo(bx + bw, by + bh - bLen); offCtx.stroke();

    // 3. Subtitle Bawah: . F E A S T
    offCtx.font = '700 32px "Space Grotesk", sans-serif';
    offCtx.fillText(". F E A S T", cx, 345);

    // 4. Metadata Waktu
    offCtx.font = '700 15px "DotGothic16", monospace';
    offCtx.fillStyle = "rgba(255, 255, 255, 0.65)";
    offCtx.fillText("[ 02:13 // VERSE 2 & CHORUS 2 ]", cx, 395);

    offCtx.restore();
  };

  // =========================================================================
  // 🎭 5. REVISI 4 TEMA VISUAL ANIMASI YANG LEBIH HIDUP & BERAGAM
  // =========================================================================
  const drawMomentScene = (time, curTime, bass) => {
    const cx = width / 2;
    const baseY = height - 10;

    offCtx.save();

    // --- TEMA 1: (02:15.8 - 02:32.4) STALKER & OBSESI BUTA (MATA, RUTE JALAN, HELAI RAMBUT) ---
    if (curTime < 152.4) {
      const horizonY = baseY - 165;
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 2.5;

      // Garis jalan perspektif dari cakrawala ke bawah
      for (let rx = -380; rx <= 380; rx += 95) {
        offCtx.beginPath();
        offCtx.moveTo(cx + rx * 0.15, horizonY);
        offCtx.lineTo(cx + rx * 1.35, baseY);
        offCtx.stroke();
      }

      // Marka jalan meluncur maju
      const roadSpeed = (time * 0.12) % 35;
      for (let dy = 0; dy < 165; dy += 32) {
        const yPos = horizonY + dy + roadSpeed;
        if (yPos <= baseY) {
          const spread = ((yPos - horizonY) / 165) * 290;
          offCtx.beginPath();
          offCtx.moveTo(cx - spread, yPos);
          offCtx.lineTo(cx + spread, yPos);
          offCtx.stroke();
        }
      }

      // Mata Obsesif Pengintai di Tengah
      const eyeY = baseY - 110;
      const eyeWidth = 110 + bass * 16;
      const eyeHeight = 44 + bass * 10;

      // Kelopak Mata
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 4.5;
      offCtx.beginPath();
      offCtx.moveTo(cx - eyeWidth, eyeY);
      offCtx.quadraticCurveTo(cx, eyeY - eyeHeight, cx + eyeWidth, eyeY);
      offCtx.quadraticCurveTo(cx, eyeY + eyeHeight, cx - eyeWidth, eyeY);
      offCtx.stroke();

      // Pupil & Iris yang Membesar/Mengecil
      const irisRadius = 24 + bass * 10;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.arc(cx, eyeY, irisRadius, 0, Math.PI * 2);
      offCtx.fill();

      // Reticle Bidikan
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.lineWidth = 3;
      offCtx.beginPath();
      offCtx.moveTo(cx - eyeWidth - 25, eyeY); offCtx.lineTo(cx - eyeWidth - 6, eyeY);
      offCtx.moveTo(cx + eyeWidth + 6, eyeY); offCtx.lineTo(cx + eyeWidth + 25, eyeY);
      offCtx.moveTo(cx, eyeY - eyeHeight - 20); offCtx.lineTo(cx, eyeY - eyeHeight - 6);
      offCtx.moveTo(cx, eyeY + eyeHeight + 6); offCtx.lineTo(cx, eyeY + eyeHeight + 20);
      offCtx.stroke();

      // Helai Rambut Halus Mengambang
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      offCtx.lineWidth = 2.5;
      for (let h = 0; h < 4; h++) {
        const hY = baseY - 180 + (h * 40);
        offCtx.beginPath();
        offCtx.moveTo(cx - 420, hY);
        for (let hx = cx - 420; hx <= cx + 420; hx += 20) {
          const hyOffset = Math.sin(time * 0.003 + hx * 0.015 + h) * 14;
          offCtx.lineTo(hx, hY + hyOffset);
        }
        offCtx.stroke();
      }
    }

    // --- TEMA 2: (02:32.4 - 02:49.0) KESENJANGAN SOSIAL & RADAR INTERSEKSI APLIKASI ---
    else if (curTime < 169.5) {
      const radarY = baseY - 110;
      const radarR = 95 + bass * 14;

      // Lingkaran Radar Pemindai
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 2.5;
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR * 0.35, 0, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR * 0.7, 0, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR, 0, Math.PI * 2); offCtx.stroke();

      // Garis sapuan radar yang berputar 360 derajat
      const sweepAngle = time * 0.004;
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 4;
      offCtx.beginPath();
      offCtx.moveTo(cx, radarY);
      offCtx.lineTo(cx + Math.cos(sweepAngle) * radarR, radarY + Math.sin(sweepAngle) * radarR);
      offCtx.stroke();

      // Dua Titik Koordinat Pengguna yang Bersimpangan
      const transitPhase = ((curTime - 152.4) / (169.5 - 152.4)) * 2 - 1;
      const blip1X = cx + (transitPhase * 150);
      const blip1Y = radarY - (transitPhase * 50);
      const blip2X = cx - (transitPhase * 150);
      const blip2Y = radarY + (transitPhase * 50);

      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(blip1X, blip1Y, 8, 0, Math.PI * 2); offCtx.fill();
      offCtx.beginPath(); offCtx.arc(blip2X, blip2Y, 8, 0, Math.PI * 2); offCtx.fill();

      // Gelombang getar saat bersimpangan di tengah
      if (curTime >= 160.8 && curTime <= 164.8) {
        const ringRipple = ((time * 0.06) % 80);
        offCtx.strokeStyle = "#ffffff";
        offCtx.lineWidth = 3.5;
        offCtx.beginPath();
        offCtx.arc(cx, radarY, ringRipple, 0, Math.PI * 2);
        offCtx.stroke();
      }

      // Bar Spektrum Kesenjangan Upah vs Porsi
      offCtx.fillStyle = "rgba(255, 255, 255, 0.55)";
      // Kiri: "Walau Upahku Dalam Sebulan"
      for (let bx = 0; bx < 8; bx++) {
        const bHeight = 15 + Math.sin(time * 0.005 + bx) * 15 + bass * 25;
        offCtx.fillRect(cx - 350 + (bx * 24), baseY - bHeight, 16, bHeight);
      }
      // Kanan: "Hanya Porsimu Dalam Sehari"
      for (let bx = 0; bx < 8; bx++) {
        const bHeight = 50 + Math.sin(time * 0.007 + bx) * 35 + bass * 55;
        offCtx.fillRect(cx + 160 + (bx * 24), baseY - bHeight, 16, bHeight);
      }
    }

    // --- TEMA 3: (02:49.5 - 03:08.6) KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
    else if (curTime < 189.0) {
      // Busur Katedral Gothic Altar Suci
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      offCtx.lineWidth = 3;
      const altarPulse = bass * 18;
      offCtx.beginPath();
      offCtx.arc(cx, baseY + 15, 175 + altarPulse, Math.PI, Math.PI * 2);
      offCtx.stroke();
      offCtx.beginPath();
      offCtx.arc(cx, baseY + 15, 145 + altarPulse, Math.PI, Math.PI * 2);
      offCtx.stroke();

      // Sinar Altar Memancar
      for (let a = Math.PI + 0.15; a < Math.PI * 2 - 0.15; a += 0.26) {
        const rx1 = cx + Math.cos(a) * (180 + altarPulse);
        const ry1 = (baseY + 15) + Math.sin(a) * (180 + altarPulse);
        const rx2 = cx + Math.cos(a) * (215 + altarPulse);
        const ry2 = (baseY + 15) + Math.sin(a) * (215 + altarPulse);
        offCtx.beginPath();
        offCtx.moveTo(rx1, ry1);
        offCtx.lineTo(rx2, ry2);
        offCtx.stroke();
      }

      // Belalang Sembah Hidup
      const breathe = Math.sin(time * 0.003) * 6 + bass * 8;
      const antennaWave = Math.sin(time * 0.005) * 12;

      // Kepala Segitiga
      const headY = baseY - 120 + breathe;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx - 28, headY - 32);
      offCtx.lineTo(cx + 28, headY - 32);
      offCtx.closePath();
      offCtx.fill();

      // Sepasang Mata Majemuk Menyala Tajam
      offCtx.beginPath();
      offCtx.arc(cx - 32, headY - 32, 10 + bass * 4, 0, Math.PI * 2);
      offCtx.arc(cx + 32, headY - 32, 10 + bass * 4, 0, Math.PI * 2);
      offCtx.fill();

      // Antena Meliuk Lentur
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 3.5;
      offCtx.beginPath();
      offCtx.moveTo(cx - 12, headY - 32);
      offCtx.quadraticCurveTo(cx - 48 + antennaWave, headY - 70, cx - 88 + antennaWave * 1.6, headY - 105);
      offCtx.moveTo(cx + 12, headY - 32);
      offCtx.quadraticCurveTo(cx + 48 - antennaWave, headY - 70, cx + 88 - antennaWave * 1.6, headY - 105);
      offCtx.stroke();

      // Batang Dada Prothorax
      offCtx.lineWidth = 14;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx, baseY - 35);
      offCtx.stroke();

      // Cakar Raptorial Terlipat Berdoa "Sembah"
      offCtx.lineWidth = 9;
      const armPray = Math.sin(time * 0.004) * 12 + bass * 14;
      // Cakar Kiri
      offCtx.beginPath();
      offCtx.moveTo(cx - 8, headY + 12);
      offCtx.lineTo(cx - 56 - armPray, headY - 12);
      offCtx.lineTo(cx - 28 - armPray * 0.5, headY + 38);
      offCtx.stroke();
      // Cakar Kanan
      offCtx.beginPath();
      offCtx.moveTo(cx + 8, headY + 12);
      offCtx.lineTo(cx + 56 + armPray, headY - 12);
      offCtx.lineTo(cx + 28 + armPray * 0.5, headY + 38);
      offCtx.stroke();

      // Deretan Jemaah Sujud
      offCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
      const bow = Math.sin(time * 0.0035) * 5;
      for (let p = -5; p <= 5; p++) {
        if (Math.abs(p) > 1) {
          const px = cx + (p * 75);
          offCtx.beginPath();
          offCtx.arc(px, baseY - 10 + bow, 20, Math.PI, Math.PI * 2);
          offCtx.fill();
          offCtx.beginPath();
          offCtx.arc(px + (p > 0 ? -20 : 20), baseY - 6, 11, 0, Math.PI * 2);
          offCtx.fill();
        }
      }
    }

    // --- TEMA 4: (03:08.6 - 03:23.0) SUMPAH DARAH, PENGORBANAN FATAL & PELEBURAN KE ANGKASA ---
    else {
      const isDissolving = curTime > 198.5;
      const fadeAlpha = isDissolving ? Math.max(0.08, 1 - (curTime - 198.5) / 4.2) : 1;

      offCtx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
      offCtx.strokeStyle = `rgba(255, 255, 255, ${fadeAlpha})`;

      // Cakar Fatal Strike Menusuk
      const headY = baseY - 105;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx - 26, headY - 30);
      offCtx.lineTo(cx + 26, headY - 30);
      offCtx.closePath();
      offCtx.fill();

      offCtx.lineWidth = 10;
      offCtx.beginPath();
      offCtx.moveTo(cx - 8, headY + 8);
      offCtx.lineTo(cx - 36, headY - 8);
      offCtx.lineTo(cx - 4, headY + 32);
      offCtx.moveTo(cx + 8, headY + 8);
      offCtx.lineTo(cx + 36, headY - 8);
      offCtx.lineTo(cx + 4, headY + 32);
      offCtx.stroke();

      offCtx.lineWidth = 14;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx, baseY - 30);
      offCtx.stroke();

      // Hujan Badai Partikel Abu & Bara Api
      offCtx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha * 0.9})`;
      for (let e = 0; e < 50; e++) {
        const ex = (cx - 400) + ((e * 93 + Math.floor(time * 0.2)) % 800);
        const ey = ((e * 67 + Math.floor(time * 0.25)) % 170) + (baseY - 170);
        offCtx.fillRect(ex, ey, 5, 5);
      }

      // Gelombang Glitch
      if (curTime >= 194.6 && curTime <= 198.0 && Math.random() < 0.3) {
        offCtx.fillRect(0, baseY - 70, width, 6);
      }
    }

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 6. RENDER LIRIK: FORMAT STOCKHOLM METRO BESAR & ANTI-TERPOTONG
  // =========================================================================
  const drawLyricText = (item) => {
    if (!item || !item.text) return;

    const text = item.text.trim();
    const words = text.split(" ");
    const cx = width / 2;

    offCtx.save();
    offCtx.fillStyle = "#ffffff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    // Format Stockholm Metro: 1 atau 2 baris proporsional
    let lines = [];
    if (words.length <= 4) {
      lines = [text];
    } else {
      const mid = Math.ceil(words.length / 2);
      lines = [
        words.slice(0, mid).join(" "),
        words.slice(mid).join(" ")
      ];
    }

    if (lines.length === 1) {
      offCtx.font = '700 60px "Space Grotesk", "Helvetica Neue", Arial, sans-serif';
      offCtx.fillText(lines[0], cx, 115);
    } else {
      offCtx.font = '700 52px "Space Grotesk", "Helvetica Neue", Arial, sans-serif';
      offCtx.fillText(lines[0], cx, 85);
      offCtx.fillText(lines[1], cx, 145);
    }

    offCtx.restore();
  };

  // =========================================================================
  // 🎨 7. RENDER OFFSCREEN CANVAS (LIRIK DI ATAS + MOMEN SUASANA DI BAWAH)
  // =========================================================================
  const drawOffscreenCanvas = (time) => {
    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

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

    // 3. Gambar Teks Lirik Stockholm Metro di Bagian Atas
    if (isShowing) {
      const currentItem = config.lyrics[currentLyricIndex];
      if (currentItem) {
        drawLyricText(currentItem);
      }
    }
  };

  // =========================================================================
  // ⚡ 8. MESIN UTAMA STOCKHOLM METRO DOT MATRIX RASTERIZER
  // =========================================================================
  const renderDotMatrix = () => {
    // Ambil data piksel dari offscreen canvas
    const imgData = offCtx.getImageData(0, 0, width, height).data;

    // Bersihkan canvas utama dengan hitam pekat murni #000000
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Konfigurasi Grid Titik Bundar Stockholm Metro (Persis seperti referensi)
    const step = 11;
    const dotRadius = 4.6;

    for (let y = step / 2; y < height; y += step) {
      const isTopZone = y < 220; // Zona Lirik & Judul

      for (let x = step / 2; x < width; x += step) {
        const index = (Math.floor(y) * width + Math.floor(x)) * 4;
        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];
        const brightness = (r + g + b) / 3;

        if (brightness > 60) {
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);

          if (isTopZone) {
            // TIPOGRAFI STOCKHOLM METRO: Titik bundar putih solid dengan pendaran merah obsesif
            if (brightness > 150) {
              ctx.fillStyle = "#ffffff"; // Putih bersih Stockholm Metro
              ctx.shadowColor = "rgba(255, 23, 68, 0.85)";
              ctx.shadowBlur = 6;
            } else {
              ctx.fillStyle = "#ff2a55";
              ctx.shadowColor = "rgba(255, 23, 68, 0.5)";
              ctx.shadowBlur = 4;
            }
          } else {
            // ILUSTRASI ATMOSFERIK: Merah menyala, crimson, dan ruby kultus
            if (brightness > 175) {
              ctx.fillStyle = "#ff1744";
              ctx.shadowColor = "rgba(255, 23, 68, 0.7)";
              ctx.shadowBlur = 5;
            } else if (brightness > 110) {
              ctx.fillStyle = "#dc143c";
              ctx.shadowBlur = 0;
            } else {
              ctx.fillStyle = "#7a0016";
              ctx.shadowBlur = 0;
            }
          }

          ctx.fill();
        }
      }
    }
    ctx.shadowBlur = 0;
  };

  // =========================================================================
  // 🔄 9. LOOP ANIMASI REAL-TIME
  // =========================================================================
  const updateLoop = (time) => {
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
          isShowing = false;
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

    // 1. Gambar ke buffer offscreen
    drawOffscreenCanvas(time);

    // 2. Render dengan mesin titik bundar Stockholm Metro
    renderDotMatrix();

    requestAnimationFrame(updateLoop);
  };

  // Mulai loop saat font Space Grotesk siap
  if (document.fonts) {
    document.fonts.ready.then(() => {
      requestAnimationFrame(updateLoop);
    });
  } else {
    requestAnimationFrame(updateLoop);
  }
})();
