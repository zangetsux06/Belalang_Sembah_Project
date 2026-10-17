/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - STOCKHOLM METRO DOT MATRIX ENGINE
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Tipografi Dot Matrix Stockholm Metro berkerapatan tinggi,
 * titik-titik sirkular rapat mikro yang membentuk huruf dengan sangat padat,
 * tanpa jarak renggang (tight spacing), memenuhi layar penuh, dan bebas kotak pembungkus.
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
    if (!isPaused && isShowing && Math.random() < 0.22) {
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

    offCtx.fillStyle = "#ffffff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.font = '700 70px "Space Grotesk", "Helvetica Neue", Arial, sans-serif';
    offCtx.fillText("BELALANG SEMBAH", cx, 110);

    const imgSize = 310;
    const imgX = cx - (imgSize / 2);
    const imgY = 190;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      try {
        offCtx.filter = "contrast(1.6) brightness(1.2)";
      } catch (e) {}
      offCtx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
      offCtx.filter = "none";
    } else {
      const catY = imgY + 110;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(cx, catY, 75, 0, Math.PI * 2); offCtx.fill();
      offCtx.beginPath();
      offCtx.moveTo(cx - 65, catY - 35); offCtx.lineTo(cx - 90, catY - 100); offCtx.lineTo(cx - 25, catY - 70); offCtx.closePath(); offCtx.fill();
      offCtx.beginPath();
      offCtx.moveTo(cx + 65, catY - 35); offCtx.lineTo(cx + 90, catY - 100); offCtx.lineTo(cx + 25, catY - 70); offCtx.closePath(); offCtx.fill();
      const wave = Math.sin(time * 0.008) * 20;
      offCtx.lineWidth = 24;
      offCtx.strokeStyle = "#ffffff";
      offCtx.beginPath(); offCtx.moveTo(cx + 70, catY + 10); offCtx.lineTo(cx + 120, catY - 50 + wave); offCtx.stroke();
      offCtx.fillRect(cx - 60, catY + 70, 120, 100);
    }

    offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
    offCtx.lineWidth = 4;
    const pad = 12;
    const bx = imgX - pad, by = imgY - pad, bw = imgSize + pad * 2, bh = imgSize + pad * 2, bLen = 35;
    offCtx.beginPath(); offCtx.moveTo(bx, by + bLen); offCtx.lineTo(bx, by); offCtx.lineTo(bx + bLen, by); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx + bw - bLen, by); offCtx.lineTo(bx + bw, by); offCtx.lineTo(bx + bw, by + bLen); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx, by + bh - bLen); offCtx.lineTo(bx, by + bh); offCtx.lineTo(bx + bLen, by + bh); offCtx.stroke();
    offCtx.beginPath(); offCtx.moveTo(bx + bw - bLen, by + bh); offCtx.lineTo(bx + bw, by + bh); offCtx.lineTo(bx + bw, by + bh - bLen); offCtx.stroke();

    offCtx.font = '700 52px "Space Grotesk", sans-serif';
    offCtx.fillText(". F E A S T", cx, 580);

    offCtx.font = '700 24px "DotGothic16", monospace';
    offCtx.fillStyle = "rgba(255, 255, 255, 0.65)";
    offCtx.fillText("[ 02:13 // VERSE 2 & CHORUS 2 ]", cx, 660);

    offCtx.restore();
  };

  // =========================================================================
  // 🎭 5. REVISI 4 TEMA VISUAL ANIMASI
  // =========================================================================
  const drawMomentScene = (time, curTime, bass) => {
    const cx = width / 2;
    const baseY = height - 15;

    offCtx.save();

    // --- TEMA 1: (02:15.8 - 02:32.4) STALKER & OBSESI BUTA ---
    if (curTime < 152.4) {
      const horizonY = baseY - 240;
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 3;

      for (let rx = -580; rx <= 580; rx += 135) {
        offCtx.beginPath();
        offCtx.moveTo(cx + rx * 0.15, horizonY);
        offCtx.lineTo(cx + rx * 1.35, baseY);
        offCtx.stroke();
      }

      const roadSpeed = (time * 0.12) % 45;
      for (let dy = 0; dy < 240; dy += 45) {
        const yPos = horizonY + dy + roadSpeed;
        if (yPos <= baseY) {
          const spread = ((yPos - horizonY) / 240) * 440;
          offCtx.beginPath();
          offCtx.moveTo(cx - spread, yPos);
          offCtx.lineTo(cx + spread, yPos);
          offCtx.stroke();
        }
      }

      const eyeY = baseY - 160;
      const eyeWidth = 160 + bass * 25;
      const eyeHeight = 65 + bass * 14;

      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      offCtx.beginPath();
      offCtx.moveTo(cx - eyeWidth, eyeY);
      offCtx.quadraticCurveTo(cx, eyeY - eyeHeight, cx + eyeWidth, eyeY);
      offCtx.quadraticCurveTo(cx, eyeY + eyeHeight, cx - eyeWidth, eyeY);
      offCtx.stroke();

      const irisRadius = 36 + bass * 14;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.arc(cx, eyeY, irisRadius, 0, Math.PI * 2);
      offCtx.fill();

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.lineWidth = 4;
      offCtx.beginPath();
      offCtx.moveTo(cx - eyeWidth - 35, eyeY); offCtx.lineTo(cx - eyeWidth - 10, eyeY);
      offCtx.moveTo(cx + eyeWidth + 10, eyeY); offCtx.lineTo(cx + eyeWidth + 35, eyeY);
      offCtx.moveTo(cx, eyeY - eyeHeight - 30); offCtx.lineTo(cx, eyeY - eyeHeight - 10);
      offCtx.moveTo(cx, eyeY + eyeHeight + 10); offCtx.lineTo(cx, eyeY + eyeHeight + 30);
      offCtx.stroke();

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      offCtx.lineWidth = 3.5;
      for (let h = 0; h < 4; h++) {
        const hY = baseY - 260 + (h * 55);
        offCtx.beginPath();
        offCtx.moveTo(cx - 600, hY);
        for (let hx = cx - 600; hx <= cx + 600; hx += 30) {
          const hyOffset = Math.sin(time * 0.003 + hx * 0.012 + h) * 20;
          offCtx.lineTo(hx, hY + hyOffset);
        }
        offCtx.stroke();
      }
    }

    // --- TEMA 2: (02:32.4 - 02:49.0) KESENJANGAN SOSIAL & RADAR INTERSEKSI ---
    else if (curTime < 169.5) {
      const radarY = baseY - 160;
      const radarR = 145 + bass * 20;

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 3.5;
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR * 0.35, 0, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR * 0.7, 0, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR, 0, Math.PI * 2); offCtx.stroke();

      const sweepAngle = time * 0.004;
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 5;
      offCtx.beginPath();
      offCtx.moveTo(cx, radarY);
      offCtx.lineTo(cx + Math.cos(sweepAngle) * radarR, radarY + Math.sin(sweepAngle) * radarR);
      offCtx.stroke();

      const transitPhase = ((curTime - 152.4) / (169.5 - 152.4)) * 2 - 1;
      const blip1X = cx + (transitPhase * 240);
      const blip1Y = radarY - (transitPhase * 75);
      const blip2X = cx - (transitPhase * 240);
      const blip2Y = radarY + (transitPhase * 75);

      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(blip1X, blip1Y, 12, 0, Math.PI * 2); offCtx.fill();
      offCtx.beginPath(); offCtx.arc(blip2X, blip2Y, 12, 0, Math.PI * 2); offCtx.fill();

      if (curTime >= 160.8 && curTime <= 164.8) {
        const ringRipple = ((time * 0.06) % 120);
        offCtx.strokeStyle = "#ffffff";
        offCtx.lineWidth = 5;
        offCtx.beginPath();
        offCtx.arc(cx, radarY, ringRipple, 0, Math.PI * 2);
        offCtx.stroke();
      }

      offCtx.fillStyle = "rgba(255, 255, 255, 0.55)";
      for (let bx = 0; bx < 9; bx++) {
        const bHeight = 22 + Math.sin(time * 0.005 + bx) * 22 + bass * 35;
        offCtx.fillRect(cx - 520 + (bx * 34), baseY - bHeight, 22, bHeight);
      }
      for (let bx = 0; bx < 9; bx++) {
        const bHeight = 70 + Math.sin(time * 0.007 + bx) * 50 + bass * 80;
        offCtx.fillRect(cx + 240 + (bx * 34), baseY - bHeight, 22, bHeight);
      }
    }

    // --- TEMA 3: (02:49.5 - 03:08.6) KULTUS PEMUJAAN BELALANG SEMBAH ---
    else if (curTime < 189.0) {
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      offCtx.lineWidth = 4;
      const altarPulse = bass * 25;
      offCtx.beginPath();
      offCtx.arc(cx, baseY + 20, 260 + altarPulse, Math.PI, Math.PI * 2);
      offCtx.stroke();
      offCtx.beginPath();
      offCtx.arc(cx, baseY + 20, 215 + altarPulse, Math.PI, Math.PI * 2);
      offCtx.stroke();

      for (let a = Math.PI + 0.15; a < Math.PI * 2 - 0.15; a += 0.24) {
        const rx1 = cx + Math.cos(a) * (265 + altarPulse);
        const ry1 = (baseY + 20) + Math.sin(a) * (265 + altarPulse);
        const rx2 = cx + Math.cos(a) * (315 + altarPulse);
        const ry2 = (baseY + 20) + Math.sin(a) * (315 + altarPulse);
        offCtx.beginPath();
        offCtx.moveTo(rx1, ry1);
        offCtx.lineTo(rx2, ry2);
        offCtx.stroke();
      }

      const breathe = Math.sin(time * 0.003) * 8 + bass * 12;
      const antennaWave = Math.sin(time * 0.005) * 18;

      const headY = baseY - 175 + breathe;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx - 40, headY - 45);
      offCtx.lineTo(cx + 40, headY - 45);
      offCtx.closePath();
      offCtx.fill();

      offCtx.beginPath();
      offCtx.arc(cx - 45, headY - 45, 15 + bass * 6, 0, Math.PI * 2);
      offCtx.arc(cx + 45, headY - 45, 15 + bass * 6, 0, Math.PI * 2);
      offCtx.fill();

      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 5;
      offCtx.beginPath();
      offCtx.moveTo(cx - 16, headY - 45);
      offCtx.quadraticCurveTo(cx - 65 + antennaWave, headY - 100, cx - 125 + antennaWave * 1.6, headY - 150);
      offCtx.moveTo(cx + 16, headY - 45);
      offCtx.quadraticCurveTo(cx + 65 - antennaWave, headY - 100, cx + 125 - antennaWave * 1.6, headY - 150);
      offCtx.stroke();

      offCtx.lineWidth = 20;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx, baseY - 50);
      offCtx.stroke();

      offCtx.lineWidth = 14;
      const armPray = Math.sin(time * 0.004) * 18 + bass * 20;
      offCtx.beginPath();
      offCtx.moveTo(cx - 12, headY + 18);
      offCtx.lineTo(cx - 80 - armPray, headY - 18);
      offCtx.lineTo(cx - 40 - armPray * 0.5, headY + 55);
      offCtx.stroke();

      offCtx.beginPath();
      offCtx.moveTo(cx + 12, headY + 18);
      offCtx.lineTo(cx + 80 + armPray, headY - 18);
      offCtx.lineTo(cx + 40 + armPray * 0.5, headY + 55);
      offCtx.stroke();

      offCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
      const bow = Math.sin(time * 0.0035) * 8;
      for (let p = -5; p <= 5; p++) {
        if (Math.abs(p) > 1) {
          const px = cx + (p * 115);
          offCtx.beginPath();
          offCtx.arc(px, baseY - 15 + bow, 28, Math.PI, Math.PI * 2);
          offCtx.fill();
          offCtx.beginPath();
          offCtx.arc(px + (p > 0 ? -28 : 28), baseY - 10, 15, 0, Math.PI * 2);
          offCtx.fill();
        }
      }
    }

    // --- TEMA 4: (03:08.6 - 03:23.0) SUMPAH DARAH & PENGORBANAN FATAL ---
    else {
      const isDissolving = curTime > 198.5;
      const fadeAlpha = isDissolving ? Math.max(0.08, 1 - (curTime - 198.5) / 4.2) : 1;

      offCtx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
      offCtx.strokeStyle = `rgba(255, 255, 255, ${fadeAlpha})`;

      const headY = baseY - 150;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx - 36, headY - 42);
      offCtx.lineTo(cx + 36, headY - 42);
      offCtx.closePath();
      offCtx.fill();

      offCtx.lineWidth = 14;
      offCtx.beginPath();
      offCtx.moveTo(cx - 10, headY + 10);
      offCtx.lineTo(cx - 52, headY - 10);
      offCtx.lineTo(cx - 6, headY + 45);
      offCtx.moveTo(cx + 10, headY + 10);
      offCtx.lineTo(cx + 52, headY - 10);
      offCtx.lineTo(cx + 6, headY + 45);
      offCtx.stroke();

      offCtx.lineWidth = 20;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx, baseY - 42);
      offCtx.stroke();

      offCtx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha * 0.9})`;
      for (let e = 0; e < 60; e++) {
        const ex = (cx - 600) + ((e * 137 + Math.floor(time * 0.3)) % 1200);
        const ey = ((e * 97 + Math.floor(time * 0.35)) % 240) + (baseY - 240);
        offCtx.fillRect(ex, ey, 7, 7);
      }

      if (curTime >= 194.6 && curTime <= 198.0 && Math.random() < 0.3) {
        offCtx.fillRect(0, baseY - 100, width, 8);
      }
    }

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 6. RENDER LIRIK: FORMAT BESAR STOCKHOLM METRO & MEMENUHI LAYAR
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

    if (lines.length === 1) {
      offCtx.font = '700 96px "Space Grotesk", "Helvetica Neue", Arial, sans-serif';
      offCtx.fillText(lines[0], cx, 170);
    } else {
      offCtx.font = '700 84px "Space Grotesk", "Helvetica Neue", Arial, sans-serif';
      offCtx.fillText(lines[0], cx, 125);
      offCtx.fillText(lines[1], cx, 225);
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
  // ⚡ 8. MESIN UTAMA STOCKHOLM METRO: TITIK RAPAT TANPA JARAK RENGGANG
  // =========================================================================
  const renderDotMatrix = () => {
    const imgData = offCtx.getImageData(0, 0, width, height).data;

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, width, height);

    // SPACING RAPAT MAKSIMAL:
    // step = 5.0, dotRadius = 2.4 -> Jarak renggang antar butiran hanya 0.2px!
    // Titik-titik menyatu padat dan mulus membentuk huruf yang sangat tegas & mudah dibaca
    const step = 5.0;
    const dotRadius = 2.4;

    // Batched paths untuk render puluhan ribu titik secepat kilat (60 FPS)
    const whiteDots = [];
    const redAccentDots = [];
    const brightRedDots = [];
    const midRedDots = [];
    const darkRedDots = [];

    for (let y = step / 2; y < height; y += step) {
      const isTopZone = y < 330; // Zona Lirik & Judul

      for (let x = step / 2; x < width; x += step) {
        const index = (Math.floor(y) * width + Math.floor(x)) * 4;
        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];
        const brightness = (r + g + b) / 3;

        if (brightness > 60) {
          if (isTopZone) {
            if (brightness > 135) {
              whiteDots.push(x, y);
            } else {
              redAccentDots.push(x, y);
            }
          } else {
            if (brightness > 165) {
              brightRedDots.push(x, y);
            } else if (brightness > 105) {
              midRedDots.push(x, y);
            } else {
              darkRedDots.push(x, y);
            }
          }
        }
      }
    }

    // Helper untuk menggambar kelompok titik secara instan
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

    // 1. Gambar Bagian Ilustrasi Atmosferik Bawah
    drawBatch(darkRedDots, "#7a0016", null, 0);
    drawBatch(midRedDots, "#dc143c", null, 0);
    drawBatch(brightRedDots, "#ff1744", "rgba(255, 23, 68, 0.6)", 4);

    // 2. Gambar Bagian Tipografi Lirik Atas (Putih Bersih Stockholm Metro & Akses Crimson)
    drawBatch(redAccentDots, "#ff2a55", "rgba(255, 23, 68, 0.4)", 3);
    drawBatch(whiteDots, "#ffffff", "rgba(255, 23, 68, 0.8)", 4);
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
