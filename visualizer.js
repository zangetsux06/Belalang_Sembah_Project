/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - STOCKHOLM METRO DOT MATRIX ENGINE
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Tipografi Dot Matrix Stockholm Metro berkerapatan tinggi,
 * font besar yang memenuhi layar (screen-filling), efek atmosferik hidup
 * yang bervariasi di tiap lirik, dan sinkronisasi audio real-time.
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

    // 1. Header Atas: B E L A L A N G   S E M B A H (Besar & Megah)
    offCtx.fillStyle = "#ffffff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.font = '700 88px "Space Grotesk", "Helvetica Neue", Arial, sans-serif';
    offCtx.fillText("BELALANG SEMBAH", cx, 95);

    // 2. Cover Art / Logo di Tengah
    const imgSize = 380;
    const imgX = cx - (imgSize / 2);
    const imgY = 170;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      try {
        offCtx.filter = "contrast(1.6) brightness(1.2)";
      } catch (e) {}
      offCtx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
      offCtx.filter = "none";
    } else {
      const catY = imgY + 130;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(cx, catY, 90, 0, Math.PI * 2); offCtx.fill();
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
    offCtx.font = '700 64px "Space Grotesk", sans-serif';
    offCtx.fillText(". F E A S T", cx, 660);

    // 4. Metadata
    offCtx.font = '700 28px "DotGothic16", monospace';
    offCtx.fillStyle = "rgba(255, 255, 255, 0.65)";
    offCtx.fillText("[ 02:13 // VERSE 2 & CHORUS 2 ]", cx, 745);

    offCtx.restore();
  };

  // =========================================================================
  // 🎭 5. TEMA VISUAL DINAMIS & KHUSUS DI SETIAP LIRIK (TIDAK MONOTON)
  // =========================================================================
  const drawMomentScene = (time, curTime, bass) => {
    const cx = width / 2;
    const baseY = height - 15;

    offCtx.save();

    // =======================================================================
    // [VERSE 2A: STALKER & OBSESI BUTA]
    // =======================================================================

    // 1. (135.8 - 139.6) "Jumlah rambutmu 'kan kuhafal mati"
    // Efek: Badai helai rambut satin melayang dinamis dengan counter digital penghitung helai
    if (curTime < 139.8) {
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.75)";
      offCtx.lineWidth = 3.5;
      for (let h = 0; h < 6; h++) {
        const hY = baseY - 280 + (h * 48);
        offCtx.beginPath();
        offCtx.moveTo(cx - 700, hY);
        for (let hx = cx - 700; hx <= cx + 700; hx += 25) {
          const wavePhase = Math.sin(time * 0.0035 + hx * 0.012 + h * 1.5) * 28;
          offCtx.lineTo(hx, hY + wavePhase);
        }
        offCtx.stroke();
      }

      // Counter Telemetri Obsesif
      const hairCount = 142857 + Math.floor((time * 0.08) % 999);
      offCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
      offCtx.font = '700 24px "DotGothic16", monospace';
      offCtx.textAlign = "center";
      offCtx.fillText(`[ MEMORIZED: ${hairCount.toLocaleString()} STRANDS // EXACT ]`, cx, baseY - 60);
    }

    // 2. (140.0 - 143.8) "Rute pulangmu telah kupelajari"
    // Efek: Navigasi GPS jalan raya 3D melaju cepat dengan rambu & pelacak rute pulang
    else if (curTime < 144.0) {
      const horizonY = baseY - 280;
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.45)";
      offCtx.lineWidth = 3.5;

      for (let rx = -680; rx <= 680; rx += 140) {
        offCtx.beginPath();
        offCtx.moveTo(cx + rx * 0.12, horizonY);
        offCtx.lineTo(cx + rx * 1.45, baseY);
        offCtx.stroke();
      }

      // Marka jalan meluncur kencang
      const roadSpeed = (time * 0.22) % 60;
      for (let dy = 0; dy < 280; dy += 55) {
        const yPos = horizonY + dy + roadSpeed;
        if (yPos <= baseY) {
          const spread = ((yPos - horizonY) / 280) * 520;
          offCtx.beginPath();
          offCtx.moveTo(cx - spread, yPos);
          offCtx.lineTo(cx + spread, yPos);
          offCtx.stroke();
        }
      }

      // Titik Target & Indikator Rute Pulang
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(cx, horizonY + 70, 14 + bass * 8, 0, Math.PI * 2); offCtx.fill();
      offCtx.font = '700 22px "DotGothic16", monospace';
      offCtx.fillText("ROUTE: HOMEBOUND // DISTANCE: 0.8 KM // TRACKED", cx, baseY - 50);
    }

    // 3. (144.2 - 147.8) "Kutahu nama anak kita nanti"
    // Efek: Siluet detak jantung berdenyut (heartbeat pulse) dikelilingi spiral konstelasi takdir
    else if (curTime < 148.0) {
      const heartY = baseY - 165;
      const heartScale = 3.6 + bass * 1.5;

      offCtx.save();
      offCtx.translate(cx, heartY);
      offCtx.scale(heartScale, heartScale);

      // Jalur Vektor Hati Berdenyut
      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.beginPath();
      offCtx.moveTo(0, 5);
      offCtx.bezierCurveTo(-15, -15, -25, 0, 0, 25);
      offCtx.bezierCurveTo(25, 0, 15, -15, 0, 5);
      offCtx.fill();
      offCtx.restore();

      // Gelombang Elektrokardiogram (EKG Pulse) di Bawah Jantung
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.7)";
      offCtx.lineWidth = 3.5;
      offCtx.beginPath();
      offCtx.moveTo(cx - 500, baseY - 45);
      for (let x = -500; x <= 500; x += 10) {
        let ekgY = 0;
        const distFromCenter = Math.abs(x);
        if (distFromCenter < 120) {
          ekgY = Math.sin(x * 0.15 + time * 0.01) * 35 * (1 - distFromCenter / 120);
        }
        offCtx.lineTo(cx + x, baseY - 45 + ekgY);
      }
      offCtx.stroke();
    }

    // 4. (148.2 - 152.0) "Suatu saat kau pasti mengerti"
    // Efek: Mata Pengintai Besar Membuka Penuh dengan Reticle Bidikan [LOCKED ON] Berputar
    else if (curTime < 152.4) {
      const eyeY = baseY - 175;
      const eyeWidth = 185 + bass * 30;
      const eyeHeight = 75 + bass * 16;

      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 7;
      offCtx.beginPath();
      offCtx.moveTo(cx - eyeWidth, eyeY);
      offCtx.quadraticCurveTo(cx, eyeY - eyeHeight, cx + eyeWidth, eyeY);
      offCtx.quadraticCurveTo(cx, eyeY + eyeHeight, cx - eyeWidth, eyeY);
      offCtx.stroke();

      const irisRadius = 42 + bass * 16;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.arc(cx, eyeY, irisRadius, 0, Math.PI * 2);
      offCtx.fill();

      // Cincin Bidikan Berputar
      const rot = time * 0.003;
      offCtx.save();
      offCtx.translate(cx, eyeY);
      offCtx.rotate(rot);
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.9)";
      offCtx.lineWidth = 4;
      offCtx.beginPath();
      offCtx.arc(0, 0, eyeWidth + 20, 0, Math.PI * 0.4);
      offCtx.arc(0, 0, eyeWidth + 20, Math.PI * 0.5, Math.PI * 0.9);
      offCtx.arc(0, 0, eyeWidth + 20, Math.PI, Math.PI * 1.4);
      offCtx.arc(0, 0, eyeWidth + 20, Math.PI * 1.5, Math.PI * 1.9);
      offCtx.stroke();
      offCtx.restore();

      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.font = '700 22px "DotGothic16", monospace';
      offCtx.fillText("TARGET: LOCKED_ON // OBSESSION: 100%", cx, baseY - 40);
    }

    // =======================================================================
    // [VERSE 2B: KESENJANGAN SOSIAL & RADAR APLIKASI]
    // =======================================================================

    // 5 & 6. (152.4 - 160.4) "Walau upahku dalam sebulan / Hanya porsimu dalam sehari"
    // Efek: Kesenjangan Ekstrem! Bar kemiskinan rendah di kiri vs Gedung kemewahan menjulang di kanan
    else if (curTime < 160.6) {
      const isPorsiLine = curTime >= 156.4;

      // Sisi Kiri: "Upahku dalam sebulan" (Bar rendah berjuang)
      offCtx.fillStyle = "rgba(255, 255, 255, 0.45)";
      for (let bx = 0; bx < 11; bx++) {
        const bHeight = 25 + Math.sin(time * 0.005 + bx) * 20 + bass * 35;
        offCtx.fillRect(cx - 650 + (bx * 38), baseY - bHeight, 26, bHeight);
      }
      offCtx.font = '700 20px "DotGothic16", monospace';
      offCtx.fillText("UPAH_SEBULAN: MINIMUM", cx - 450, baseY - 120);

      // Sisi Kanan: "Porsimu dalam sehari" (Bar raksasa menjulang megah)
      offCtx.fillStyle = isPorsiLine ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.6)";
      for (let bx = 0; bx < 11; bx++) {
        const bHeight = 120 + Math.sin(time * 0.008 + bx) * 75 + bass * 120;
        offCtx.fillRect(cx + 250 + (bx * 38), baseY - bHeight, 26, bHeight);
      }
      offCtx.fillText("PORSI_SEHARI: LUXURY", cx + 450, baseY - 260);
    }

    // 7. (160.8 - 164.8) "Di dalam app kita bersimpangan"
    // Efek: Tabrakan Radar Aplikasi! Dua titik GPS meluncur, bertabrakan di tengah & meledakkan riak sonar
    else if (curTime < 165.0) {
      const radarY = baseY - 170;
      const radarR = 175 + bass * 25;

      offCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      offCtx.lineWidth = 4;
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR * 0.35, 0, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR * 0.7, 0, Math.PI * 2); offCtx.stroke();
      offCtx.beginPath(); offCtx.arc(cx, radarY, radarR, 0, Math.PI * 2); offCtx.stroke();

      const sweepAngle = time * 0.005;
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      offCtx.beginPath();
      offCtx.moveTo(cx, radarY);
      offCtx.lineTo(cx + Math.cos(sweepAngle) * radarR, radarY + Math.sin(sweepAngle) * radarR);
      offCtx.stroke();

      // Dua Titik GPS Bertabrakan di Tengah
      const transitPhase = ((curTime - 160.8) / 4.0) * 2 - 1;
      const blip1X = cx + (transitPhase * 260);
      const blip1Y = radarY - (transitPhase * 80);
      const blip2X = cx - (transitPhase * 260);
      const blip2Y = radarY + (transitPhase * 80);

      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath(); offCtx.arc(blip1X, blip1Y, 14, 0, Math.PI * 2); offCtx.fill();
      offCtx.beginPath(); offCtx.arc(blip2X, blip2Y, 14, 0, Math.PI * 2); offCtx.fill();

      // Ledakan Riak Gelombang Sonar
      const ripple = ((time * 0.08) % 150);
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      offCtx.beginPath();
      offCtx.arc(cx, radarY, ripple, 0, Math.PI * 2);
      offCtx.stroke();

      offCtx.font = '700 22px "DotGothic16", monospace';
      offCtx.fillText("APP_INTERSECTION: DETECTED // COLLISION POINT", cx, baseY - 40);
    }

    // 8. (164.8 - 169.0) "Aku yakin kau bisa mengerti"
    // Efek: Pita Gelombang Osiloskop Frekuensi Audio Berdenyut Kencang Menjelang Chorus
    else if (curTime < 169.5) {
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 4.5;
      offCtx.beginPath();
      offCtx.moveTo(cx - 700, baseY - 160);
      for (let x = -700; x <= 700; x += 15) {
        const freqY = Math.sin(x * 0.02 + time * 0.008) * Math.cos(x * 0.006) * (60 + bass * 70);
        offCtx.lineTo(cx + x, baseY - 160 + freqY);
      }
      offCtx.stroke();

      offCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
      offCtx.font = '700 24px "DotGothic16", monospace';
      offCtx.fillText("[ FREQUENCY RESONANCE: HARMONIZED // BUILD UP ]", cx, baseY - 50);
    }

    // =======================================================================
    // [CHORUS 2: KULTUS PEMUJAAN BELALANG SEMBAH]
    // =======================================================================

    // 9. (169.5 - 177.5) "Maka jadikanku belalang sembah"
    // Efek: CHORUS DROP! Altar Katedral Raksasa, Belalang Sembah Hidup Menyembah, & Jemaah Sujud
    else if (curTime < 177.8) {
      // Busur Altar Katedral Megah
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      offCtx.lineWidth = 5;
      const altarPulse = bass * 35;
      offCtx.beginPath();
      offCtx.arc(cx, baseY + 25, 280 + altarPulse, Math.PI, Math.PI * 2);
      offCtx.stroke();
      offCtx.beginPath();
      offCtx.arc(cx, baseY + 25, 230 + altarPulse, Math.PI, Math.PI * 2);
      offCtx.stroke();

      // 20 Sinar Altar Memancar Keluar
      for (let a = Math.PI + 0.15; a < Math.PI * 2 - 0.15; a += 0.22) {
        const rx1 = cx + Math.cos(a) * (285 + altarPulse);
        const ry1 = (baseY + 25) + Math.sin(a) * (285 + altarPulse);
        const rx2 = cx + Math.cos(a) * (340 + altarPulse);
        const ry2 = (baseY + 25) + Math.sin(a) * (340 + altarPulse);
        offCtx.beginPath();
        offCtx.moveTo(rx1, ry1);
        offCtx.lineTo(rx2, ry2);
        offCtx.stroke();
      }

      // Tubuh Belalang Sembah Raksasa
      const breathe = Math.sin(time * 0.003) * 10 + bass * 16;
      const antennaWave = Math.sin(time * 0.005) * 22;

      // Kepala Segitiga
      const headY = baseY - 195 + breathe;
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx - 45, headY - 50);
      offCtx.lineTo(cx + 45, headY - 50);
      offCtx.closePath();
      offCtx.fill();

      // Sepasang Mata Majemuk Menyala Terang
      offCtx.beginPath();
      offCtx.arc(cx - 52, headY - 50, 18 + bass * 8, 0, Math.PI * 2);
      offCtx.arc(cx + 52, headY - 50, 18 + bass * 8, 0, Math.PI * 2);
      offCtx.fill();

      // Antena Panjang Meliuk
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      offCtx.beginPath();
      offCtx.moveTo(cx - 18, headY - 50);
      offCtx.quadraticCurveTo(cx - 75 + antennaWave, headY - 110, cx - 145 + antennaWave * 1.6, headY - 170);
      offCtx.moveTo(cx + 18, headY - 50);
      offCtx.quadraticCurveTo(cx + 75 - antennaWave, headY - 110, cx + 145 - antennaWave * 1.6, headY - 170);
      offCtx.stroke();

      // Prothorax Dada
      offCtx.lineWidth = 24;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx, baseY - 55);
      offCtx.stroke();

      // Cakar Raptorial Terlipat Berdoa Menyembah
      offCtx.lineWidth = 16;
      const armPray = Math.sin(time * 0.004) * 22 + bass * 25;
      offCtx.beginPath();
      offCtx.moveTo(cx - 15, headY + 20);
      offCtx.lineTo(cx - 95 - armPray, headY - 20);
      offCtx.lineTo(cx - 48 - armPray * 0.5, headY + 65);
      offCtx.stroke();

      offCtx.beginPath();
      offCtx.moveTo(cx + 15, headY + 20);
      offCtx.lineTo(cx + 95 + armPray, headY - 20);
      offCtx.lineTo(cx + 48 + armPray * 0.5, headY + 65);
      offCtx.stroke();

      // Barisan Jemaah Bersujud Menyembah
      offCtx.fillStyle = "rgba(255, 255, 255, 0.8)";
      const bow = Math.sin(time * 0.0035) * 10;
      for (let p = -5; p <= 5; p++) {
        if (Math.abs(p) > 1) {
          const px = cx + (p * 125);
          offCtx.beginPath();
          offCtx.arc(px, baseY - 18 + bow, 32, Math.PI, Math.PI * 2);
          offCtx.fill();
          offCtx.beginPath();
          offCtx.arc(px + (p > 0 ? -32 : 32), baseY - 12, 18, 0, Math.PI * 2);
          offCtx.fill();
        }
      }
    }

    // 10. (178.0 - 184.8) "Walau sebentar kupercaya indah"
    // Efek: Mandala Katedral Berputar Lambat & Asap Dupa Misterius Naik Melayang
    else if (curTime < 185.0) {
      const mandalaY = baseY - 180;
      const rot = time * 0.0015;

      offCtx.save();
      offCtx.translate(cx, mandalaY);
      offCtx.rotate(rot);
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.65)";
      offCtx.lineWidth = 4;
      for (let i = 0; i < 8; i++) {
        offCtx.beginPath();
        offCtx.arc(0, 0, 160 + Math.sin(time * 0.003 + i) * 20, (i * Math.PI) / 4, ((i + 0.6) * Math.PI) / 4);
        offCtx.stroke();
      }
      offCtx.restore();

      // Kepulan Asap Dupa Suci Melayang
      offCtx.strokeStyle = "rgba(255, 255, 255, 0.5)";
      offCtx.lineWidth = 3.5;
      for (let s = 0; s < 5; s++) {
        const sOffset = (s - 2) * 150;
        offCtx.beginPath();
        offCtx.moveTo(cx + sOffset, baseY - 30);
        for (let sy = baseY - 30; sy > baseY - 300; sy -= 15) {
          const sx = cx + sOffset + Math.sin(time * 0.003 + sy * 0.02 + s) * 25;
          offCtx.lineTo(sx, sy);
        }
        offCtx.stroke();
      }
    }

    // 11. (185.2 - 188.6) "Seberapa banyak, seberapa mahal"
    // Efek: Hujan Koin Emas & Butiran Emas Persembahan Berjatuhan dari Langit Altar
    else if (curTime < 188.8) {
      offCtx.fillStyle = "#ffffff";
      for (let c = 0; c < 50; c++) {
        const coinX = (cx - 650) + ((c * 73 + Math.floor(time * 0.35)) % 1300);
        const coinY = ((c * 47 + Math.floor(time * 0.45)) % 320) + (baseY - 320);
        offCtx.beginPath();
        offCtx.arc(coinX, coinY, 6 + (c % 4), 0, Math.PI * 2);
        offCtx.fill();
      }
      offCtx.font = '700 24px "DotGothic16", monospace';
      offCtx.fillText("[ TRIBUTE OFFERING: CASCADING INTO THE ALTAR ]", cx, baseY - 50);
    }

    // =======================================================================
    // [SUMPAH DARAH & PENGORBANAN FATAL]
    // =======================================================================

    // 12. (189.0 - 191.4) "Semua 'kan kuberi"
    // Efek: Cakar Belalang Melesat Maju Siaga Menyerang! Ledakan Gelombang Hentakan Drum
    else if (curTime < 191.6) {
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 6;
      const shockWave = ((time * 0.12) % 250);
      offCtx.beginPath();
      offCtx.arc(cx, baseY - 180, shockWave, 0, Math.PI * 2);
      offCtx.stroke();

      offCtx.fillStyle = "#ffffff";
      offCtx.font = '700 26px "DotGothic16", monospace';
      offCtx.fillText(">> BLOOD OATH: SURRENDER ALL <<", cx, baseY - 50);
    }

    // 13. (191.8 - 194.2) "Semua 'kan kugadai"
    // Efek: Altar Bergetar Hebat, Sambaran Kilat Glitch Merah Menyayat Layar
    else if (curTime < 194.4) {
      offCtx.strokeStyle = "#ffffff";
      offCtx.lineWidth = 5;
      for (let l = 0; l < 4; l++) {
        const lx = cx - 500 + l * 320;
        offCtx.beginPath();
        offCtx.moveTo(lx, baseY - 320);
        offCtx.lineTo(lx + 30, baseY - 240);
        offCtx.lineTo(lx - 20, baseY - 160);
        offCtx.lineTo(lx + 40, baseY - 40);
        offCtx.stroke();
      }
      offCtx.fillStyle = "#ffffff";
      offCtx.font = '700 26px "DotGothic16", monospace';
      offCtx.fillText(">> SACRIFICE PLEDGED: IRREVERSIBLE <<", cx, baseY - 50);
    }

    // 14. (194.6 - 198.0) "Matikan aku setelah usai"
    // Efek: FATAL STRIKE! Cakar Mengunci Menusuk Mematikan, Badai Abu Membara Meletus
    else if (curTime < 198.4) {
      const headY = baseY - 160;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx - 40, headY - 45);
      offCtx.lineTo(cx + 40, headY - 45);
      offCtx.closePath();
      offCtx.fill();

      // Cakar Menusuk Mengunci Rapat
      offCtx.lineWidth = 16;
      offCtx.beginPath();
      offCtx.moveTo(cx - 12, headY + 12);
      offCtx.lineTo(cx - 60, headY - 12);
      offCtx.lineTo(cx - 8, headY + 50);
      offCtx.moveTo(cx + 12, headY + 12);
      offCtx.lineTo(cx + 60, headY - 12);
      offCtx.lineTo(cx + 8, headY + 50);
      offCtx.stroke();

      offCtx.lineWidth = 22;
      offCtx.beginPath();
      offCtx.moveTo(cx, headY);
      offCtx.lineTo(cx, baseY - 45);
      offCtx.stroke();

      // Hujan Badai Abu Membara
      offCtx.fillStyle = "#ffffff";
      for (let e = 0; e < 70; e++) {
        const ex = (cx - 650) + ((e * 149 + Math.floor(time * 0.35)) % 1300);
        const ey = ((e * 103 + Math.floor(time * 0.4)) % 260) + (baseY - 260);
        offCtx.fillRect(ex, ey, 8, 8);
      }

      // Glitch Horisontal Fatal Climax
      if (Math.random() < 0.35) {
        offCtx.fillRect(0, baseY - 110, width, 10);
      }
    }

    // 15. (198.5 - 203.0) "Matikan aku setelah usai" (OUTRO PELEBURAN)
    // Efek: DISINTEGRASI KE ANGKASA! Seluruh altar & mantis meluruh perlahan menjadi asap debu
    else {
      const dissolveProgress = Math.min(1, Math.max(0, (curTime - 198.5) / 4.5));
      const fadeAlpha = Math.max(0.04, 1 - dissolveProgress);

      offCtx.fillStyle = `rgba(255, 255, 255, ${fadeAlpha})`;
      offCtx.strokeStyle = `rgba(255, 255, 255, ${fadeAlpha})`;

      // Ribuan Partikel Debu Abu Naik Melayang ke Surga
      for (let e = 0; e < 90; e++) {
        const ex = (cx - 700) + ((e * 163 + Math.floor(time * 0.25)) % 1400);
        const ey = baseY - ((e * 33 + Math.floor(time * 0.35)) % 360);
        offCtx.fillRect(ex, ey, 6, 6);
      }

      offCtx.font = '700 24px "DotGothic16", monospace';
      offCtx.fillText("[ AFTERMATH // DISSOLVING INTO EMBERS ]", cx, baseY - 60);
    }

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 6. RENDER LIRIK: FONT BESAR MEMENUHI LAYAR (SCREEN-FILLING)
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

    const maxW = width * 0.92; // 1470px batas aman lebar

    if (lines.length === 1) {
      let size = 125;
      offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      const textWidth = offCtx.measureText(lines[0]).width;
      if (textWidth > maxW) {
        size = Math.floor(size * (maxW / textWidth));
        offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      }
      // Posisikan lirik 1 baris besar di tengah zona atas
      offCtx.fillText(lines[0], cx, 180);
    } else {
      let size = 110;
      offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      const w1 = offCtx.measureText(lines[0]).width;
      const w2 = offCtx.measureText(lines[1]).width;
      const maxLineWidth = Math.max(w1, w2);
      if (maxLineWidth > maxW) {
        size = Math.floor(size * (maxW / maxLineWidth));
        offCtx.font = `700 ${size}px "Space Grotesk", "Helvetica Neue", Arial, sans-serif`;
      }
      const lineHeight = Math.floor(size * 1.18);
      // Posisikan lirik 2 baris besar mengisi penuh zona atas layar
      offCtx.fillText(lines[0], cx, 180 - (lineHeight / 2));
      offCtx.fillText(lines[1], cx, 180 + (lineHeight / 2));
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

    // 2. Gambar Efek Visual Dinamis di Bagian Bawah
    drawMomentScene(time, curTime, bass);

    // 3. Gambar Teks Lirik Stockholm Metro Besar di Bagian Atas
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
      const isTopZone = y < 330;

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
