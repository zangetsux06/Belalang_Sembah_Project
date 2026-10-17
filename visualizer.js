/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - STOCKHOLM METRO DOT MATRIX ENGINE
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Tipografi Dot Matrix Stockholm Metro berkerapatan tinggi,
 * lirik tepat di tengah layar (dead-center) berukuran raksasa, animasi tematik
 * tersinkronisasi presisi sesuai referensi (tangan mengelus rambut, POV jalan raya,
 * uang dollar, mangkok makanan, jam pasir, altar belalang sembah).
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
      // Fallback
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

    // 1. Header Atas: B E L A L A N G   S E M B A H
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
  // 🎭 5. TEMA VISUAL DINAMIS KHUSUS DI SETIAP LIRIK (TERSINKRONISASI PRESISI)
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
    // Visual Referensi SDF WebGL: Siluet kepala & profil perempuan dengan rambut panjang terurai,
    // serta tangan yang menjangkau dan menyisir/mengelus helaian rambutnya dengan lembut.
    if (curTime < 139.8) {
      const womanX = cx - 240;
      const womanY = cy - 40;

      // --- Siluet Profil Perempuan (Kiri) ---
      // Kepala / Batok Kepala
      offCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
      offCtx.beginPath();
      offCtx.arc(womanX, womanY, 78, 0, Math.PI * 2);
      offCtx.fill();

      // Lekukan Profil Wajah (Dahi, Hidung Mungil, Bibir, Dagu)
      offCtx.beginPath();
      offCtx.moveTo(womanX + 45, womanY - 50);
      offCtx.quadraticCurveTo(womanX + 85, womanY - 20, womanX + 95, womanY - 10); // Hidung
      offCtx.quadraticCurveTo(womanX + 80, womanY + 8, womanX + 85, womanY + 16);  // Bibir
      offCtx.quadraticCurveTo(womanX + 70, womanY + 36, womanX + 50, womanY + 45); // Dagu
      offCtx.lineTo(womanX, womanY + 50);
      offCtx.closePath();
      offCtx.fill();

      // Leher & Bahu Ramping
      offCtx.beginPath();
      offCtx.moveTo(womanX + 15, womanY + 45);
      offCtx.lineTo(womanX - 25, womanY + 180);
      offCtx.lineTo(womanX - 220, womanY + 220);
      offCtx.lineTo(womanX - 180, womanY + 50);
      offCtx.closePath();
      offCtx.fill();

      // --- Helaian Rambut Panjang Terurai Bergelombang Lembut ---
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.lineWidth = 8;
      for (let i = 0; i < 9; i++) {
        const laneX = womanX - 55 + (i * 26);
        offCtx.beginPath();
        offCtx.moveTo(laneX, womanY - 60);

        // Aliran rambut mengalir anggun melewati bahu ke bawah
        for (let hy = womanY - 60; hy <= baseY; hy += 25) {
          const wavePhase = hy * 0.015 - time * 0.0035 + (i * 0.45);
          const waveOffset = Math.sin(wavePhase) * 16 + Math.cos(wavePhase * 0.5) * 8;
          // Efek sentuhan tangan: rambut sedikit tertarik saat tangan melintas
          const handInfluence = Math.exp(-Math.pow((hy - (cy + 20)) * 0.012, 2.0));
          const caressShift = Math.sin(time * 0.003) * 18 * handInfluence;

          offCtx.lineTo(laneX + waveOffset + caressShift, hy);
        }
        offCtx.stroke();
      }

      // --- Tangan yang Mengelus Helaian Rambut (Datang dari Kanan) ---
      const handStroke = Math.sin(time * 0.003) * 25;
      const handX = cx + 80 + handStroke;
      const handY = cy + 20 + Math.cos(time * 0.003) * 14;

      // Lengan Bawah & Pergelangan Tangan
      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.lineWidth = 26;
      offCtx.beginPath();
      offCtx.moveTo(cx + 450, handY + 60);
      offCtx.lineTo(handX + 60, handY + 15);
      offCtx.stroke();

      // Telapak Tangan
      offCtx.beginPath();
      offCtx.arc(handX + 35, handY + 10, 32, 0, Math.PI * 2);
      offCtx.fill();

      // Jari-jemari Lembut yang Menyisir & Menggenggam Helaian Rambut
      offCtx.lineWidth = 10;
      // Ibu Jari
      offCtx.beginPath();
      offCtx.moveTo(handX + 30, handY - 15);
      offCtx.quadraticCurveTo(handX - 20, handY - 20, handX - 45, handY - 5);
      offCtx.stroke();

      // Jari Telunjuk
      offCtx.beginPath();
      offCtx.moveTo(handX + 15, handY - 5);
      offCtx.quadraticCurveTo(handX - 55, handY - 5, handX - 90, handY + 10);
      offCtx.stroke();

      // Jari Tengah (Paling Panjang Menyusup ke Rambut)
      offCtx.beginPath();
      offCtx.moveTo(handX + 15, handY + 10);
      offCtx.quadraticCurveTo(handX - 70, handY + 12, handX - 110, handY + 28);
      offCtx.stroke();

      // Jari Manis
      offCtx.beginPath();
      offCtx.moveTo(handX + 15, handY + 25);
      offCtx.quadraticCurveTo(handX - 60, handY + 30, handX - 95, handY + 48);
      offCtx.stroke();

      // Jari Kelingking
      offCtx.beginPath();
      offCtx.moveTo(handX + 15, handY + 38);
      offCtx.quadraticCurveTo(handX - 45, handY + 45, handX - 75, handY + 65);
      offCtx.stroke();
    }

    // 2. (140.0 - 143.8) "Rute pulangmu telah kupelajari"
    // Visual: POV Nyata Mengemudi di Jalan Raya Malam Hari (Mobil Depan, Lampu Belakang Merah, Marka Jalan Cepat)
    else if (curTime < 144.0) {
      const horizonY = cy + 50;

      // Garis Perspektif Jalan Raya 4 Jalur
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 4;
      for (let rx = -700; rx <= 700; rx += 175) {
        offCtx.beginPath();
        offCtx.moveTo(cx + rx * 0.05, horizonY);
        offCtx.lineTo(cx + rx * 1.5, baseY);
        offCtx.stroke();
      }

      // Marka Garis Putus-putus Meluncur Cepat Menghampiri Kamera
      const roadSpeed = (time * 0.35) % 85;
      for (let dy = 0; dy < 380; dy += 75) {
        const yPos = horizonY + dy + roadSpeed;
        if (yPos <= baseY) {
          const spread = ((yPos - horizonY) / 380) * 580;
          offCtx.beginPath();
          offCtx.moveTo(cx - spread, yPos);
          offCtx.lineTo(cx + spread, yPos);
          offCtx.stroke();
        }
      }

      // Kendaraan Mobil 1 (Tepat di Depan di Jalur Tengah-Kiri)
      const car1Y = cy + 190;
      const car1X = cx - 120;
      // Bodi Mobil Belakang
      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.fillRect(car1X - 75, car1Y - 25, 150, 50); // Bodi bawah
      offCtx.fillRect(car1X - 55, car1Y - 65, 110, 42); // Kabin kaca belakang
      offCtx.fillRect(car1X - 85, car1Y + 12, 16, 26);  // Ban kiri
      offCtx.fillRect(car1X + 69, car1Y + 12, 16, 26);  // Ban kanan

      // Sepasang Lampu Belakang Mobil (Taillights Merah Menyala Tajam)
      offCtx.fillStyle = "#ffffff";
      offCtx.fillRect(car1X - 68, car1Y - 18, 28, 14); // Lampu Rem Kiri
      offCtx.fillRect(car1X + 40, car1Y - 18, 28, 14); // Lampu Rem Kanan
      // Plat Nomor
      offCtx.fillRect(car1X - 22, car1Y - 6, 44, 16);

      // Kendaraan Mobil 2 (Di Jalur Kanan Lebih Jauh di Depan)
      const car2Y = cy + 110;
      const car2X = cx + 180;
      offCtx.fillStyle = "rgba(255, 255, 255, 0.65)";
      offCtx.fillRect(car2X - 42, car2Y - 14, 84, 28);
      offCtx.fillRect(car2X - 30, car2Y - 36, 60, 24);
      // Lampu Rem Mobil 2
      offCtx.fillStyle = "#ffffff";
      offCtx.fillRect(car2X - 38, car2Y - 10, 16, 8);
      offCtx.fillRect(car2X + 22, car2Y - 10, 16, 8);

      // Tiang Lampu Jalan Tol di Kiri & Kanan yang Melintas
      const lampSpeed = (time * 0.25) % 180;
      for (let l = 0; l < 4; l++) {
        const ly = horizonY + l * 100 + lampSpeed;
        if (ly <= baseY) {
          const lx1 = cx - 550 - (ly - horizonY) * 0.4;
          const lx2 = cx + 550 + (ly - horizonY) * 0.4;
          offCtx.strokeStyle = "rgba(255, 255, 255, 0.5)";
          offCtx.lineWidth = 3;
          offCtx.beginPath(); offCtx.moveTo(lx1, ly); offCtx.lineTo(lx1, ly - 80); offCtx.stroke();
          offCtx.beginPath(); offCtx.moveTo(lx2, ly); offCtx.lineTo(lx2, ly - 80); offCtx.stroke();
          offCtx.fillStyle = "#ffffff";
          offCtx.beginPath(); offCtx.arc(lx1 + 10, ly - 80, 8, 0, Math.PI * 2); offCtx.fill();
          offCtx.beginPath(); offCtx.arc(lx2 - 10, ly - 80, 8, 0, Math.PI * 2); offCtx.fill();
        }
      }
    }

    // 3. (144.2 - 147.8) "Kutahu nama anak kita nanti"
    // Visual: Cincin Pernikahan Suci Berpendar dengan Dua Siluet Berdampingan
    else if (curTime < 148.0) {
      const ringR = 210 + bass * 35;
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      offCtx.lineWidth = 5;
      offCtx.beginPath(); offCtx.arc(cx, cy, ringR, 0, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, cy, ringR - 25, 0, Math.PI * 2); offCtx.stroke();

      for (let b = 0; b < 12; b++) {
        const ang = (b * Math.PI) / 6;
        offCtx.beginPath();
        offCtx.moveTo(cx + Math.cos(ang) * (ringR + 10), cy + Math.sin(ang) * (ringR + 10));
        offCtx.lineTo(cx + Math.cos(ang) * (ringR + 70), cy + Math.sin(ang) * (ringR + 70));
        offCtx.stroke();
      }
    }

    // 4. (148.2 - 152.0) "Suatu saat kau pasti mengerti"
    // Visual: Mata Pengintai CCTV Raksasa Membuka Lebar dengan Diafragma Rana Berputar
    else if (curTime < 152.4) {
      const eyeWidth = 250 + bass * 35;
      const eyeHeight = 105 + bass * 20;

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      offCtx.lineWidth = 7;
      offCtx.beginPath();
      offCtx.moveTo(cx - eyeWidth, cy);
      offCtx.quadraticCurveTo(cx, cy - eyeHeight, cx + eyeWidth, cy);
      offCtx.quadraticCurveTo(cx, cy + eyeHeight, cx - eyeWidth, cy);
      offCtx.stroke();

      const irisRadius = 55 + bass * 20;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(cx, cy, irisRadius, 0, Math.PI * 2); offCtx.fill();

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
    // Visual: Animasi Uang Dollar ($) Diserahkan / Diberikan ke Tangan Kita
    else if (curTime < 156.4) {
      const moneyX = cx;
      const moneyY = cy + 120;
      const slide = Math.sin(time * 0.004) * 25;

      // Tangan Kiri Menyerahkan Tumpukan Uang Dollar
      offCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
      offCtx.fillRect(moneyX - 420 + slide, moneyY + 25, 180, 45); // Lengan
      offCtx.beginPath();
      offCtx.arc(moneyX - 240 + slide, moneyY + 45, 35, 0, Math.PI * 2);
      offCtx.fill();

      // Lembaran Uang Kertas Dollar ($) yang Sedang Diberikan
      for (let b = 0; b < 3; b++) {
        const bx = moneyX - 110 + (b * 45) + slide;
        const by = moneyY - 30 - (b * 18);
        offCtx.fillStyle = "#ffffff";
        offCtx.fillRect(bx, by, 160, 90);
        offCtx.strokeStyle = "#000000";
        offCtx.lineWidth = 4;
        offCtx.strokeRect(bx + 8, by + 8, 144, 74);
        offCtx.beginPath(); offCtx.arc(bx + 80, by + 45, 22, 0, Math.PI * 2); offCtx.stroke();
        // Simbol Dollar '$' Jelas di Lembaran Uang
        offCtx.fillStyle = "#000000";
        offCtx.font = '700 32px "Space Grotesk", sans-serif';
        offCtx.textAlign = "center";
        offCtx.textBaseline = "middle";
        offCtx.fillText("$", bx + 80, by + 46);
        offCtx.font = '700 16px "Space Grotesk", sans-serif';
        offCtx.fillText("$", bx + 22, by + 22);
        offCtx.fillText("$", bx + 138, by + 68);
      }

      // Tangan Kanan Terbuka Siap Menerima Upah
      offCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
      offCtx.fillRect(moneyX + 240 - slide, moneyY + 50, 180, 45);
      offCtx.beginPath();
      offCtx.arc(moneyX + 220 - slide, moneyY + 65, 38, 0, Math.PI * 2);
      offCtx.fill();
    }

    // 6. (156.4 - 160.4) "Hanya porsimu dalam sehari"
    // Visual: Porsi Mangkok Makanan Mewah Berasap Panas (Steaming Food Bowl)
    else if (curTime < 160.8) {
      const bowlX = cx;
      const bowlY = cy + 180;

      // Mangkok Makanan Keramik Besar
      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.beginPath();
      offCtx.arc(bowlX, bowlY, 150, 0, Math.PI); // Lengkungan Bodi Mangkok
      offCtx.fill();

      // Kaki / Tatakan Mangkok
      offCtx.fillRect(bowlX - 60, bowlY + 145, 120, 25);

      // Bibir Mangkok Bergaris Ornamen
      offCtx.fillStyle = "#ffffff";
      offCtx.fillRect(bowlX - 165, bowlY - 8, 330, 16);

      // Porsi Makanan Melimpah Menggunung di Atas Mangkok
      offCtx.beginPath();
      offCtx.arc(bowlX, bowlY - 8, 140, Math.PI, Math.PI * 2);
      offCtx.fill();

      // Sepasang Sumpit yang Bersandar Menyilang
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 7;
      offCtx.beginPath();
      offCtx.moveTo(bowlX - 190, bowlY - 80);
      offCtx.lineTo(bowlX + 170, bowlY + 20);
      offCtx.moveTo(bowlX - 180, bowlY - 95);
      offCtx.lineTo(bowlX + 180, bowlY + 5);
      offCtx.stroke();

      // Kepulan Uap Panas Menguap dari Porsi Makanan
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      offCtx.lineWidth = 4;
      for (let s = 0; s < 5; s++) {
        const sxOffset = (s - 2) * 55;
        offCtx.beginPath();
        offCtx.moveTo(bowlX + sxOffset, bowlY - 40);
        for (let sy = bowlY - 40; sy > bowlY - 240; sy -= 25) {
          const steamWave = Math.sin(time * 0.005 + sy * 0.03 + s) * 22;
          offCtx.lineTo(bowlX + sxOffset + steamWave, sy);
        }
        offCtx.stroke();
      }
    }

    // 7. (160.8 - 164.8) "Di dalam app kita bersimpangan"
    // Visual: Dua Kartu Profil Dating App Berpapasan di Tengah
    else if (curTime < 165.0) {
      const transitPhase = ((curTime - 160.8) / 4.0) * 2 - 1;
      const card1X = cx + (transitPhase * 360) - 90;
      const card2X = cx - (transitPhase * 360) + 90;

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.55)";
      offCtx.lineWidth = 4;
      offCtx.strokeRect(card1X - 70, cy - 110, 140, 220);
      offCtx.strokeRect(card2X - 70, cy - 110, 140, 220);

      const ripple = ((time * 0.08) % 220);
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      offCtx.beginPath();
      offCtx.arc(cx, cy, ripple, 0, Math.PI * 2);
      offCtx.stroke();
    }

    // 8. (164.8 - 169.0) "Aku yakin kau bisa mengerti"
    // Visual: Meteran Spektrum Equalizer Bertingkat Memuncak ke Chorus
    else if (curTime < 169.5) {
      offCtx.fillStyle = "rgba(255, 255, 255, 0.65)";
      for (let s = 0; s < 12; s++) {
        const sHeight = 80 + (s * 25) + bass * 90;
        offCtx.fillRect(cx - 750 + (s * 32), baseY - sHeight, 24, sHeight);
        offCtx.fillRect(cx + 750 - (s * 32) - 24, baseY - sHeight, 24, sHeight);
      }
    }

    // =======================================================================
    // [CHORUS 2: KULTUS PEMUJAAN BELALANG SEMBAH]
    // =======================================================================

    // 9. (169.5 - 177.5) "Maka jadikanku belalang sembah"
    // Visual: CHORUS DROP! Altar Katedral Raksasa, Belalang Sembah Hidup Menyembah, & Jemaah Sujud
    else if (curTime < 177.8) {
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 6;
      const altarPulse = bass * 40;
      offCtx.beginPath(); offCtx.arc(cx, baseY + 30, 360 + altarPulse, Math.PI, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, baseY + 30, 300 + altarPulse, Math.PI, Math.PI * 2); offCtx.stroke();

      for (let a = Math.PI + 0.15; a < Math.PI * 2 - 0.15; a += 0.2) {
        const rx1 = cx + Math.cos(a) * (365 + altarPulse);
        const ry1 = (baseY + 30) + Math.sin(a) * (365 + altarPulse);
        const rx2 = cx + Math.cos(a) * (440 + altarPulse);
        const ry2 = (baseY + 30) + Math.sin(a) * (440 + altarPulse);
        offCtx.beginPath(); offCtx.moveTo(rx1, ry1); offCtx.lineTo(rx2, ry2); offCtx.stroke();
      }

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

      offCtx.beginPath();
      offCtx.arc(cx - 58, headY - 55, 20 + bass * 10, 0, Math.PI * 2);
      offCtx.arc(cx + 58, headY - 55, 20 + bass * 10, 0, Math.PI * 2);
      offCtx.fill();

      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      offCtx.beginPath();
      offCtx.moveTo(cx - 20, headY - 55);
      offCtx.quadraticCurveTo(cx - 85 + antennaWave, headY - 120, cx - 165 + antennaWave * 1.6, headY - 190);
      offCtx.moveTo(cx + 20, headY - 55);
      offCtx.quadraticCurveTo(cx + 85 - antennaWave, headY - 120, cx + 165 - antennaWave * 1.6, headY - 190);
      offCtx.stroke();

      offCtx.lineWidth = 28;
      offCtx.beginPath(); offCtx.moveTo(cx, headY); offCtx.lineTo(cx, baseY - 60); offCtx.stroke();

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

      offCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
      const bow = Math.sin(time * 0.0035) * 10;
      for (let p = -5; p <= 5; p++) {
        if (Math.abs(p) > 1) {
          const px = cx + (p * 135);
          offCtx.beginPath(); offCtx.arc(px, baseY - 20 + bow, 35, Math.PI, Math.PI * 2); offCtx.fill();
          offCtx.beginPath(); offCtx.arc(px + (p > 0 ? -35 : 35), baseY - 14, 20, 0, Math.PI * 2); offCtx.fill();
        }
      }
    }

    // 10. (178.0 - 184.8) "Walau sebentar kupercaya indah"
    // Visual: Jam Pasir Klasik (Hourglass) dengan Butiran Pasir Menetes Turun (Simbol Waktu Fana)
    else if (curTime < 185.0) {
      const hgX = cx;
      const hgY = cy + 120;
      const hgW = 160;
      const hgH = 260;

      // Pelat Kayu Atas & Bawah Jam Pasir
      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.fillRect(hgX - 105, hgY - (hgH / 2) - 15, 210, 20); // Pelat Atas
      offCtx.fillRect(hgX - 105, hgY + (hgH / 2) - 5, 210, 20);  // Pelat Bawah

      // Tiang Penyangga Samping Kiri & Kanan
      offCtx.lineWidth = 8;
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.beginPath();
      offCtx.moveTo(hgX - 90, hgY - (hgH / 2) + 5);
      offCtx.lineTo(hgX - 90, hgY + (hgH / 2) - 5);
      offCtx.moveTo(hgX + 90, hgY - (hgH / 2) + 5);
      offCtx.lineTo(hgX + 90, hgY + (hgH / 2) - 5);
      offCtx.stroke();

      // Tabung Kaca Jam Pasir (Bentuk Segitiga Atas & Bawah Menyempit di Leher Tengah)
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 5;
      offCtx.beginPath();
      // Kaca Atas
      offCtx.moveTo(hgX - 75, hgY - (hgH / 2) + 5);
      offCtx.lineTo(hgX + 75, hgY - (hgH / 2) + 5);
      offCtx.lineTo(hgX + 12, hgY);
      // Kaca Bawah
      offCtx.lineTo(hgX + 75, hgY + (hgH / 2) - 5);
      offCtx.lineTo(hgX - 75, hgY + (hgH / 2) - 5);
      offCtx.lineTo(hgX - 12, hgY);
      offCtx.closePath();
      offCtx.stroke();

      // Pasir di Tabung Atas (Segitiga Pasir yang Perlahan Berkurang)
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.moveTo(hgX - 58, hgY - 45);
      offCtx.lineTo(hgX + 58, hgY - 45);
      offCtx.lineTo(hgX, hgY - 2);
      offCtx.closePath();
      offCtx.fill();

      // Aliran Pasir Halus Menetes Terus-Menerus di Tengah Leher Kaca
      offCtx.lineWidth = 4;
      offCtx.strokeStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.moveTo(hgX, hgY);
      offCtx.lineTo(hgX, hgY + 80);
      offCtx.stroke();

      // Butiran Pasir Berjatuhan
      for (let d = 0; d < 6; d++) {
        const dy = hgY + 15 + ((d * 18 + Math.floor(time * 0.2)) % 65);
        offCtx.fillRect(hgX - 2, dy, 4, 4);
      }

      // Gundukan Pasir yang Menumpuk di Tabung Bawah
      offCtx.beginPath();
      offCtx.moveTo(hgX - 65, hgY + (hgH / 2) - 6);
      offCtx.lineTo(hgX + 65, hgY + (hgH / 2) - 6);
      offCtx.lineTo(hgX, hgY + 70);
      offCtx.closePath();
      offCtx.fill();
    }

    // 11. (185.2 - 188.6) "Seberapa banyak, seberapa mahal"
    // Visual: Hujan Butiran Emas & Koin Persembahan Mengalir Deras
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
      offCtx.beginPath(); offCtx.arc(cx, cy, shockWave, 0, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, cy, Math.max(0, shockWave - 80), 0, Math.PI * 2); offCtx.stroke();
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
      let size = 150;
      offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      const textWidth = offCtx.measureText(lines[0]).width;
      if (textWidth > maxW) {
        size = Math.floor(size * (maxW / textWidth));
        offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      }
      offCtx.fillText(lines[0], cx, cy);
    } else {
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
