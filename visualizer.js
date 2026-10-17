/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - STOCKHOLM METRO DOT MATRIX ENGINE
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Tipografi Dot Matrix Stockholm Metro dengan lirik
 * tepat di tengah layar (dead-center), font raksasa yang memenuhi layar,
 * efek atmosferik visual khusus di setiap lirik tanpa tulisan label/nama efek,
 * dan animasi dinamis berbasis konsep video klip resmi .Feast.
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (VERSE 2 & CHORUS 2)
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
    audioEndTime: 203.0,   // Selesai detik 203.0 (03:23.0)
    isLooping: true
  };

  // =========================================================================
  // 🎮 2. INISIALISASI CANVAS STOCKHOLM METRO & OFFSCREEN BUFFER
  // =========================================================================
  const canvas = document.getElementById("matrix-canvas");
  const ctx = canvas.getContext("2d");
  const outputWrapper = document.getElementById("output-wrapper");
  const audioElement = document.getElementById("audio-player");

  const width = 1600;
  const height = 900;
  canvas.width = width;
  canvas.height = height;

  const offCanvas = document.createElement("canvas");
  offCanvas.width = width;
  offCanvas.height = height;
  const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });

  const coverImg = new Image();
  coverImg.src = "cover.jpg";

  let currentLyricIndex = 0;
  let lastTime = 0;
  let timeAccumulator = 0;
  let isShowing = true;
  let isPaused = false;
  let isGlitchActive = false;
  let glitchTimeout = null;

  // Web Audio API Analyser
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
      // Fallback otomatis
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
    if (!isPaused && isShowing && Math.random() < 0.2) {
      triggerGlitch(75);
    }
  }, 4200);

  // =========================================================================
  // 🎵 3. SISTEM PEMUTARAN AUDIO
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

    // 1. Header Atas: B E L A L A N G   S E M B A H (Besar)
    offCtx.fillStyle = "#ffffff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.font = '700 88px "Space Grotesk", "Helvetica Neue", Arial, sans-serif';
    offCtx.fillText("BELALANG SEMBAH", cx, 95);

    // 2. Cover Art / Logo di Tengah
    const imgSize = 400;
    const imgX = cx - (imgSize / 2);
    const imgY = 175;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      try {
        offCtx.filter = "contrast(1.6) brightness(1.2)";
      } catch (e) {}
      offCtx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
      offCtx.filter = "none";
    } else {
      const catY = imgY + 130;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(cx, catY, 95, 0, Math.PI * 2); offCtx.fill();
      offCtx.beginPath();
      offCtx.moveTo(cx - 75, catY - 40); offCtx.lineTo(cx - 105, catY - 120); offCtx.lineTo(cx - 30, catY - 85); offCtx.closePath(); offCtx.fill();
      offCtx.beginPath();
      offCtx.moveTo(cx + 75, catY - 40); offCtx.lineTo(cx + 105, catY - 120); offCtx.lineTo(cx + 30, catY - 85); offCtx.closePath(); offCtx.fill();
      const wave = Math.sin(time * 0.008) * 25;
      offCtx.lineWidth = 28;
      offCtx.strokeStyle = "#ffffff";
      offCtx.beginPath(); offCtx.moveTo(cx + 80, catY + 15); offCtx.lineTo(cx + 140, catY - 60 + wave); offCtx.stroke();
      offCtx.fillRect(cx - 70, catY + 80, 140, 120);
    }

    // Bingkai Ornamen Sudut
    offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    offCtx.lineWidth = 5;
    const pad = 15;
    const bx = imgX - pad, by = imgY - pad, bw = imgSize + pad * 2, bh = imgSize + pad * 2, bLen = 45;
    offCtx.beginPath(); offCtx.moveTo(bx, by + bLen); offCtx.lineTo(bx, by); offCtx.lineTo(bx + bLen, by); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx + bw - bLen, by); offCtx.lineTo(bx + bw, by); offCtx.lineTo(bx + bw, by + bLen); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx, by + bh - bLen); offCtx.lineTo(bx, by + bh); offCtx.lineTo(bx + bLen, by + bh); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx + bw - bLen, by + bh); offCtx.lineTo(bx + bw, by + bh); offCtx.lineTo(bx + bw, by + bh - bLen); offCtx.stroke();

    // 3. Subtitle Bawah
    offCtx.font = '700 68px "Space Grotesk", sans-serif';
    offCtx.fillText(". F E A S T", cx, 680);

    offCtx.restore();
  };

  // =========================================================================
  // 🎭 5. TEMA VISUAL DINAMIS KHUSUS DI SETIAP LIRIK (BEBAS LABEL / BEBAS GELOMBANG)
  // =========================================================================
  const drawMomentScene = (time, curTime, bass) => {
    const cx = width / 2;
    const cy = height / 2;
    const baseY = height - 15;

    offCtx.save();

    // =======================================================================
    // [VERSE 2A: STALKER & OBSESI BUTA]
    // =======================================================================

    // 1. (135.8 - 139.6) "Jumlah rambutmu 'kan kuhafal mati"
    // Visual: Jendela kamar noir berjeruji cahaya lampu kota & siluet helai rambut jatuh perlahan
    if (curTime < 139.8) {
      offCtx.fillStyle = "rgba(255, 255, 255, 0.18)";
      for (let j = 0; j < 8; j++) {
        const jY = 80 + (j * 95);
        offCtx.fillRect(cx - 720, jY, 1440, 40);
      }
      // Siluet helaian rambut lurus elegan melayang jatuh perlahan
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      offCtx.lineWidth = 3;
      for (let h = 0; h < 12; h++) {
        const hx = (cx - 600) + ((h * 117 + Math.floor(time * 0.15)) % 1200);
        const hy = ((h * 83 + Math.floor(time * 0.12)) % 750) + 60;
        offCtx.beginPath();
        offCtx.moveTo(hx, hy);
        offCtx.lineTo(hx - 20, hy + 70);
        offCtx.stroke();
      }
    }

    // 2. (140.0 - 143.8) "Rute pulangmu telah kupelajari"
    // Visual: Garis-garis lurus perspektif jalan raya 3D melaju kencang & tiang lampu jalan kota
    else if (curTime < 144.0) {
      const horizonY = cy + 40;
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 3.5;

      for (let rx = -700; rx <= 700; rx += 140) {
        offCtx.beginPath();
        offCtx.moveTo(cx + rx * 0.08, horizonY);
        offCtx.lineTo(cx + rx * 1.5, baseY);
        offCtx.stroke();
      }

      // Marka jalan meluncur cepat
      const roadSpeed = (time * 0.28) % 75;
      for (let dy = 0; dy < 380; dy += 70) {
        const yPos = horizonY + dy + roadSpeed;
        if (yPos <= baseY) {
          const spread = ((yPos - horizonY) / 380) * 580;
          offCtx.beginPath();
          offCtx.moveTo(cx - spread, yPos);
          offCtx.lineTo(cx + spread, yPos);
          offCtx.stroke();
        }
      }

      // Titik target suar navigasi di cakrawala
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(cx, horizonY, 16 + bass * 10, 0, Math.PI * 2); offCtx.fill();
    }

    // 3. (144.2 - 147.8) "Kutahu nama anak kita nanti"
    // Visual: Cincin pernikahan suci & konstelasi bintang geometris berdenyut dengan bass
    else if (curTime < 148.0) {
      const ringR = 210 + bass * 35;
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      offCtx.lineWidth = 4;
      offCtx.beginPath();
      offCtx.arc(cx, cy, ringR, 0, Math.PI * 2);
      offCtx.stroke();
      offCtx.beginPath();
      offCtx.arc(cx, cy, ringR - 25, 0, Math.PI * 2);
      offCtx.stroke();

      // Sinar bintang geometris lurus memancar
      for (let b = 0; b < 12; b++) {
        const ang = (b * Math.PI) / 6;
        offCtx.beginPath();
        offCtx.moveTo(cx + Math.cos(ang) * (ringR + 10), cy + Math.sin(ang) * (ringR + 10));
        offCtx.lineTo(cx + Math.cos(ang) * (ringR + 65), cy + Math.sin(ang) * (ringR + 65));
        offCtx.stroke();
      }
    }

    // 4. (148.2 - 152.0) "Suatu saat kau pasti mengerti"
    // Visual: Mata Pengintai CCTV Raksasa Membuka Lebar dengan Diafragma Rana Berputar
    else if (curTime < 152.4) {
      const eyeWidth = 240 + bass * 35;
      const eyeHeight = 100 + bass * 20;

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      offCtx.lineWidth = 7;
      offCtx.beginPath();
      offCtx.moveTo(cx - eyeWidth, cy);
      offCtx.quadraticCurveTo(cx, cy - eyeHeight, cx + eyeWidth, cy);
      offCtx.quadraticCurveTo(cx, cy + eyeHeight, cx - eyeWidth, cy);
      offCtx.stroke();

      const irisRadius = 55 + bass * 20;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.arc(cx, cy, irisRadius, 0, Math.PI * 2);
      offCtx.fill();

      // Bilah rana aperture berputar
      const rot = time * 0.003;
      offCtx.save();
      offCtx.translate(cx, cy);
      offCtx.rotate(rot);
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      offCtx.lineWidth = 4;
      for (let s = 0; s < 6; s++) {
        const sa = (s * Math.PI) / 3;
        offCtx.beginPath();
        offCtx.moveTo(Math.cos(sa) * 60, Math.sin(sa) * 60);
        offCtx.lineTo(Math.cos(sa + 0.4) * (eyeWidth + 30), Math.sin(sa + 0.4) * (eyeWidth + 30));
        offCtx.stroke();
      }
      offCtx.restore();
    }

    // =======================================================================
    // [VERSE 2B: KESENJANGAN SOSIAL & RADAR APLIKASI]
    // =======================================================================

    // 5. (152.4 - 156.0) "Walau upahku dalam sebulan"
    // Visual: Partikel koin & lembaran uang jatuh melayang ke bawah ke jurang kegelapan
    else if (curTime < 156.4) {
      offCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
      for (let c = 0; c < 45; c++) {
        const coinX = (cx - 700) + ((c * 97 + Math.floor(time * 0.2)) % 1400);
        const coinY = ((c * 67 + Math.floor(time * 0.25)) % 800) + 50;
        offCtx.fillRect(coinX, coinY, 14, 8); // Siluet uang kertas
      }
    }

    // 6. (156.4 - 160.4) "Hanya porsimu dalam sehari"
    // Visual: Gedung-gedung pencakar langit megah menjulang tinggi di sisi kanan
    else if (curTime < 160.8) {
      offCtx.fillStyle = "rgba(255, 255, 255, 0.65)";
      for (let b = 0; b < 10; b++) {
        const bHeight = 160 + (b * 32) + bass * 60;
        const bx = cx + 220 + (b * 55);
        offCtx.fillRect(bx, baseY - bHeight, 48, bHeight);
        // Jendela gedung kota
        offCtx.fillStyle = "#ffffff";
        for (let wy = baseY - bHeight + 10; wy < baseY - 15; wy += 28) {
          offCtx.fillRect(bx + 10, wy, 12, 12);
          offCtx.fillRect(bx + 26, wy, 12, 12);
        }
        offCtx.fillStyle = "rgba(255, 255, 255, 0.65)";
      }
    }

    // 7. (160.8 - 164.8) "Di dalam app kita bersimpangan"
    // Visual: Dua kartu profil dating app meluncur & bertabrakan di tengah meledakkan riak radar
    else if (curTime < 165.0) {
      const transitPhase = ((curTime - 160.8) / 4.0) * 2 - 1;
      const card1X = cx + (transitPhase * 360) - 90;
      const card2X = cx - (transitPhase * 360) + 90;

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      offCtx.lineWidth = 4;
      // Kartu Kiri
      offCtx.strokeRect(card1X - 70, cy - 110, 140, 220);
      // Kartu Kanan
      offCtx.strokeRect(card2X - 70, cy - 110, 140, 220);

      // Riak Sonar Ledakan di Tengah
      const ripple = ((time * 0.08) % 220);
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      offCtx.beginPath();
      offCtx.arc(cx, cy, ripple, 0, Math.PI * 2);
      offCtx.stroke();
    }

    // 8. (164.8 - 169.0) "Aku yakin kau bisa mengerti"
    // Visual: Meteran spektrum equalizer vertikal bertingkat di kedua sisi layar memuncak ke chorus
    else if (curTime < 169.5) {
      offCtx.fillStyle = "rgba(255, 255, 255, 0.65)";
      for (let s = 0; s < 12; s++) {
        const sHeight = 80 + (s * 25) + bass * 90;
        // Kiri
        offCtx.fillRect(cx - 750 + (s * 32), baseY - sHeight, 24, sHeight);
        // Kanan
        offCtx.fillRect(cx + 750 - (s * 32) - 24, baseY - sHeight, 24, sHeight);
      }
    }

    // =======================================================================
    // [CHORUS 2: KULTUS PEMUJAAN BELALANG SEMBAH]
    // =======================================================================

    // 9. (169.5 - 177.5) "Maka jadikanku belalang sembah"
    // Visual: CHORUS DROP! Altar Katedral Raksasa, Belalang Sembah Hidup Menyembah, & Jemaah Sujud
    else if (curTime < 177.8) {
      // Busur Altar Katedral Megah Menjulang
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 6;
      const altarPulse = bass * 40;
      offCtx.beginPath();
      offCtx.arc(cx, baseY + 30, 360 + altarPulse, Math.PI, Math.PI * 2);
      offCtx.stroke();
      offCtx.beginPath();
      offCtx.arc(cx, baseY + 30, 300 + altarPulse, Math.PI, Math.PI * 2);
      offCtx.stroke();

      // 20 Sinar Altar Lurus Memancar
      for (let a = Math.PI + 0.15; a < Math.PI * 2 - 0.15; a += 0.2) {
        const rx1 = cx + Math.cos(a) * (365 + altarPulse);
        const ry1 = (baseY + 30) + Math.sin(a) * (365 + altarPulse);
        const rx2 = cx + Math.cos(a) * (440 + altarPulse);
        const ry2 = (baseY + 30) + Math.sin(a) * (440 + altarPulse);
        offCtx.beginPath();
        offCtx.moveTo(rx1, ry1);
        offCtx.lineTo(rx2, ry2);
        offCtx.stroke();
      }

      // Tubuh Belalang Sembah Raksasa di Altar
      const breathe = Math.sin(time * 0.003) * 12 + bass * 18;
      const antennaWave = Math.sin(time * 0.005) * 25;

      const headY = baseY - 260 + breathe;
      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx - 50, headY - 55);
      offCtx.lineTo(cx + 50, headY - 55);
      offCtx.closePath();
      offCtx.fill();

      // Sepasang Mata Majemuk Menyala Terang
      offCtx.beginPath();
      offCtx.arc(cx - 58, headY - 55, 20 + bass * 10, 0, Math.PI * 2);
      offCtx.arc(cx + 58, headY - 55, 20 + bass * 10, 0, Math.PI * 2);
      offCtx.fill();

      // Antena Panjang Meliuk
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      offCtx.beginPath();
      offCtx.moveTo(cx - 20, headY - 55);
      offCtx.quadraticCurveTo(cx - 85 + antennaWave, headY - 120, cx - 165 + antennaWave * 1.6, headY - 190);
      offCtx.moveTo(cx + 20, headY - 55);
      offCtx.quadraticCurveTo(cx + 85 - antennaWave, headY - 120, cx + 165 - antennaWave * 1.6, headY - 190);
      offCtx.stroke();

      // Batang Dada Prothorax
      offCtx.lineWidth = 28;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx, baseY - 60);
      offCtx.stroke();

      // Cakar Raptorial Terlipat Berdoa Menyembah
      offCtx.lineWidth = 18;
      const armPray = Math.sin(time * 0.004) * 26 + bass * 28;
      offCtx.beginPath();
      offCtx.moveTo(cx - 18, headY + 25);
      offCtx.lineTo(cx - 110 - armPray, headY - 25);
      offCtx.lineTo(cx - 55 - armPray * 0.5, headY + 75);
      offCtx.stroke();

      offCtx.beginPath();
      offCtx.moveTo(cx + 18, headY + 25);
      offCtx.lineTo(cx + 110 + armPray, headY - 25);
      offCtx.lineTo(cx + 55 + armPray * 0.5, headY + 75);
      offCtx.stroke();

      // Barisan Jemaah Bersujud Menyembah di Dasar (Sesuai Album Art)
      offCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
      const bow = Math.sin(time * 0.0035) * 10;
      for (let p = -5; p <= 5; p++) {
        if (Math.abs(p) > 1) {
          const px = cx + (p * 135);
          offCtx.beginPath();
          offCtx.arc(px, baseY - 20 + bow, 35, Math.PI, Math.PI * 2);
          offCtx.fill();
          offCtx.beginPath();
          offCtx.arc(px + (p > 0 ? -35 : 35), baseY - 14, 20, 0, Math.PI * 2);
          offCtx.fill();
        }
      }
    }

    // 10. (178.0 - 184.8) "Walau sebentar kupercaya indah"
    // Visual: Mandala Geometris Katedral Berputar & Sinar Suci Memancar
    else if (curTime < 185.0) {
      const rot = time * 0.0018;
      offCtx.save();
      offCtx.translate(cx, cy);
      offCtx.rotate(rot);
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 4;
      for (let i = 0; i < 12; i++) {
        offCtx.beginPath();
        offCtx.arc(0, 0, 240 + Math.sin(time * 0.003 + i) * 25, (i * Math.PI) / 6, ((i + 0.6) * Math.PI) / 6);
        offCtx.stroke();
      }
      offCtx.restore();
    }

    // 11. (185.2 - 188.6) "Seberapa banyak, seberapa mahal"
    // Visual: Hujan Butiran Emas & Koin Persembahan Mengalir Deras dari Langit Altar
    else if (curTime < 188.8) {
      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      for (let c = 0; c < 60; c++) {
        const coinX = (cx - 700) + ((c * 83 + Math.floor(time * 0.38)) % 1400);
        const coinY = ((c * 53 + Math.floor(time * 0.48)) % 800) + 50;
        offCtx.beginPath();
        offCtx.arc(coinX, coinY, 7 + (c % 5), 0, Math.PI * 2);
        offCtx.fill();
      }
    }

    // =======================================================================
    // [SUMPAH DARAH & PENGORBANAN FATAL]
    // =======================================================================

    // 12. (189.0 - 191.4) "Semua 'kan kuberi"
    // Visual: Cakar Belalang Melesat Maju Menusuk! Ledakan Gelombang Kejut Sirkular Ganda
    else if (curTime < 191.6) {
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 7;
      const shockWave = ((time * 0.14) % 360);
      offCtx.beginPath();
      offCtx.arc(cx, cy, shockWave, 0, Math.PI * 2);
      offCtx.stroke();
      offCtx.beginPath();
      offCtx.arc(cx, cy, Math.max(0, shockWave - 80), 0, Math.PI * 2);
      offCtx.stroke();
    }

    // 13. (191.8 - 194.2) "Semua 'kan kugadai"
    // Visual: Altar Retak Disayat Kilatan Petir Garis Geometris Merah
    else if (curTime < 194.4) {
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      for (let l = 0; l < 5; l++) {
        const lx = cx - 600 + l * 300;
        offCtx.beginPath();
        offCtx.moveTo(lx, 80);
        offCtx.lineTo(lx + 40, 300);
        offCtx.lineTo(lx - 30, 520);
        offCtx.lineTo(lx + 50, 840);
        offCtx.stroke();
      }
    }

    // 14. (194.6 - 198.0) "Matikan aku setelah usai"
    // Visual: FATAL STRIKE! Cakar Mengunci Menusuk, Badai Abu Membara Berterbangan
    else if (curTime < 198.4) {
      const headY = cy + 40;
      offCtx.fillStyle = "rgba(255, 255, 255, 0.9)";
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx - 45, headY - 50);
      offCtx.lineTo(cx + 45, headY - 50);
      offCtx.closePath();
      offCtx.fill();

      // Cakar Menusuk Mengunci Rapat
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 18;
      offCtx.beginPath();
      offCtx.moveTo(cx - 15, headY + 15);
      offCtx.lineTo(cx - 70, headY - 15);
      offCtx.lineTo(cx - 10, headY + 60);
      offCtx.moveTo(cx + 15, headY + 15);
      offCtx.lineTo(cx + 70, headY - 15);
      offCtx.lineTo(cx + 10, headY + 60);
      offCtx.stroke();

      // Hujan Badai Abu Membara
      offCtx.fillStyle = "#ffffff";
      for (let e = 0; e < 85; e++) {
        const ex = (cx - 750) + ((e * 157 + Math.floor(time * 0.38)) % 1500);
        const ey = ((e * 109 + Math.floor(time * 0.42)) % 800) + 50;
        offCtx.fillRect(ex, ey, 9, 9);
      }

      // Glitch Slices
      if (Math.random() < 0.35) {
        offCtx.fillRect(0, cy + 90, width, 12);
      }
    }

    // 15. (198.5 - 203.0) "Matikan aku setelah usai" (OUTRO PELEBURAN)
    // Visual: DISINTEGRASI KE ANGKASA! Ribuan Partikel Debu Abu Terbang Naik ke Langit
    else {
      const dissolveProgress = Math.min(1, Math.max(0, (curTime - 198.5) / 4.5));
      const fadeAlpha = Math.max(0.04, 1 - dissolveProgress);

      offCtx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
      for (let e = 0; e < 110; e++) {
        const ex = (cx - 750) + ((e * 173 + Math.floor(time * 0.28)) % 1500);
        const ey = baseY - ((e * 37 + Math.floor(time * 0.4)) % 800);
        offCtx.fillRect(ex, ey, 7, 7);
      }
    }

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 6. RENDER LIRIK: TEPAT DI TENGAH PAS (DEAD-CENTER) & FONT RAKSASA
  // =========================================================================
  const drawLyricText = (item) => {
    if (!item || !item.text) return;

    const text = item.text.trim();
    const words = text.split(" ");
    const cx = width / 2;
    const cy = height / 2; // TEPAT DI TENGAH PAS (DEAD-CENTER)

    offCtx.save();
    offCtx.fillStyle = "#ffffff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    let lines = [];
    if (words.length <= 3) {
      lines = [text];
    } else {
      const mid = Math.ceil(words.length / 2);
      lines = [
        words.slice(0, mid).join(" "),
        words.slice(mid).join(" ")
      ];
    }

    const maxW = width * 0.94; // 1500px lebar maksimal

    if (lines.length === 1) {
      // 1 Baris: Font Raksasa 150px
      let size = 150;
      offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      const textWidth = offCtx.measureText(lines[0]).width;
      if (textWidth > maxW) {
        size = Math.floor(size * (maxW / textWidth));
        offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      }
      offCtx.fillText(lines[0], cx, cy);
    } else {
      // 2 Baris: Font Raksasa 125px Mengisi Penuh Tengah Layar
      let size = 125;
      offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      const w1 = offCtx.measureText(lines[0]).width;
      const w2 = offCtx.measureText(lines[1]).width;
      const maxLineWidth = Math.max(w1, w2);
      if (maxLineWidth > maxW) {
        size = Math.floor(size * (maxW / maxLineWidth));
        offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      }
      const lineHeight = Math.floor(size * 1.22);
      offCtx.fillText(lines[0], cx, cy - (lineHeight / 2));
      offCtx.fillText(lines[1], cx, cy + (lineHeight / 2));
    }

    offCtx.restore();
  };

  // =========================================================================
  // 🎨 7. RENDER OFFSCREEN CANVAS
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

    // 1. Zona Intro (Detik 133.0 s/d 135.8 = Menit 02:13)
    if (curTime < 135.8) {
      drawIntroScene(time, curTime, bass);
      return;
    }

    // 2. Gambar Efek Visual Dinamis di Latar Belakang
    drawMomentScene(time, curTime, bass);

    // 3. Gambar Teks Lirik Stockholm Metro RAKSASA Tepat di Tengah Layar (Dead-Center)
    if (isShowing) {
      const currentItem = config.lyrics[currentLyricIndex];
      if (currentItem) {
        drawLyricText(currentItem);
      }
    }
  };

  // =========================================================================
  // ⚡ 8. MESIN UTAMA STOCKHOLM METRO: BUTIRAN RAPAT & PADAT (60 FPS)
  // =========================================================================
  const renderDotMatrix = () => {
    const imgData = offCtx.getImageData(0, 0, width, height).data;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // Grid butiran rapat & padat tanpa jarak renggang
    const step = 5.0;
    const dotRadius = 2.45;

    const whiteDots = [];
    const redAccentDots = [];
    const brightRedDots = [];
    const midRedDots = [];
    const darkRedDots = [];

    for (let y = step / 2; y < height; y += step) {
      for (let x = step / 2; x < width; x += step) {
        const index = (Math.floor(y) * width + Math.floor(x)) * 4;
        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];
        const brightness = (r + g + b) / 3;

        if (brightness > 60) {
          // Lirik putih tebal (#ffffff) terdeteksi otomatis dengan brightness > 140
          if (brightness > 140) {
            whiteDots.push(x, y);
          } else if (brightness > 105) {
            redAccentDots.push(x, y);
          } else if (brightness > 85) {
            brightRedDots.push(x, y);
          } else if (brightness > 70) {
            midRedDots.push(x, y);
          } else {
            darkRedDots.push(x, y);
          }
        }
      }
    }

    const drawBatch = (coords, color, shadowColor, shadowBlur) => {
      if (coords.length === 0) return;
      ctx.save();
      ctx.fillStyle = color;
      if (shadowColor && shadowBlur > 0) {
        ctx.shadowColor = shadowColor;
        ctx.shadowBlur = shadowBlur;
      }
      ctx.beginPath();
      for (let i = 0; i < coords.length; i += 2) {
        const cx = coords[i];
        const cy = coords[i + 1];
        ctx.moveTo(cx + dotRadius, cy);
        ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.restore();
    };

    // 1. Gambar Ilustrasi Atmosferik
    drawBatch(darkRedDots, "#7a0016", null, 0);
    drawBatch(midRedDots, "#dc143c", null, 0);
    drawBatch(brightRedDots, "#ff1744", "rgba(255, 23, 68, 0.6)", 4);

    // 2. Gambar Tipografi Lirik RAKSASA (Putih Bersih Stockholm Metro & Akses Crimson)
    drawBatch(redAccentDots, "#ff2a55", "rgba(255, 23, 68, 0.4)", 3);
    drawBatch(whiteDots, "#ffffff", "rgba(255, 23, 68, 0.8)", 5);
  };

  // =========================================================================
  // 🔄 9. LOOP ANIMASI REAL-TIME
  // =========================================================================
  const updateLoop = (time) => {
    if (!isPaused) {
      if (audioElement && !audioElement.paused && audioElement.duration > 0) {
        const curTime = audioElement.currentTime;

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

        if (!matched && curTime < 135.8) {
          isShowing = false;
        }
      } else {
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

    drawOffscreenCanvas(time);
    renderDotMatrix();

    requestAnimationFrame(updateLoop);
  };

  if (document.fonts) {
    document.fonts.ready.then(() => {
      requestAnimationFrame(updateLoop);
    });
  } else {
    requestAnimationFrame(updateLoop);
  }
})();
