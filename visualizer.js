/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - COLORED ASCII LYRIC VISUALIZER
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Real-Time Pixel-to-ASCII Lyric Visualizer hidup & bernapas
 * terinspirasi simulasi partikel pointillism & spesifikasi teknis colored ASCII.
 * Lirik tepat di tengah layar dengan tema font kurasi per baris, partikel
 * bara melayang organik, dan banner pembuka resmi .Feast.
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (VERSE 2 & CHORUS 2) DENGAN TEMA FONT KHUSUS
  // =========================================================================
  const config = {
    lyrics: [
      // --- MOMENT 1 (02:15.8 - 02:32.4): STALKER & OBSESI BUTA (VERSE 2A) ---
      // PRINSIP FONT: Pada canvas 160x68px, hanya sans-serif bold tebal yang
      // render tajam. Serif/dekoratif hanya untuk lirik chorus sakral yang
      // font-size-nya cukup besar. Semua gradien wajib TERANG (min. #cc*).
      {
        text: "Jumlah rambutmu 'kan kuhafal mati",
        startSec: 135.8,
        endSec: 139.6,
        showMs: 3800,
        hideMs: 400,
        // Obsesi intim, berbisik mengerikan
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff6b8a", "#cc88ff"],
          halo: "rgba(255, 107, 138, 0.30)",
          spark: "#ff6b8a"
        }
      },
      {
        text: "Rute pulangmu telah kupelajari",
        startSec: 140.0,
        endSec: 143.8,
        showMs: 3800,
        hideMs: 400,
        // Surveillance stalker, GPS terminal
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#66ffee", "#88ddff"],
          halo: "rgba(102, 255, 238, 0.28)",
          spark: "#66ffee"
        }
      },
      {
        text: "Kutahu nama anak kita nanti",
        startSec: 144.2,
        endSec: 147.8,
        showMs: 3600,
        hideMs: 400,
        // Delusi pernikahan sepihak, ilusi sakral hangat
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffe066", "#ffaacc"],
          halo: "rgba(255, 224, 102, 0.30)",
          spark: "#ffe066"
        }
      },
      {
        text: "Suatu saat kau pasti mengerti",
        startSec: 148.2,
        endSec: 152.0,
        showMs: 3800,
        hideMs: 400,
        // Keyakinan hipnotik, desakan psikologis
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff5577", "#ff88aa"],
          halo: "rgba(255, 85, 119, 0.30)",
          spark: "#ff5577"
        }
      },

      // --- MOMENT 2 (02:32.4 - 02:49.0): KESENJANGAN SOSIAL & RADAR APLIKASI (VERSE 2B) ---
      {
        text: "Walau upahku dalam sebulan",
        startSec: 152.4,
        endSec: 156.0,
        showMs: 3600,
        hideMs: 400,
        // Kenyataan pahit kelas pekerja — teks WAJIB terang & besar
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffcc44", "#ffaa66"],
          halo: "rgba(255, 204, 68, 0.30)",
          spark: "#ffcc44"
        }
      },
      {
        text: "Hanya porsimu dalam sehari",
        startSec: 156.4,
        endSec: 160.4,
        showMs: 4000,
        hideMs: 400,
        // Jurang kesenjangan sosial
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff5566", "#ff8899"],
          halo: "rgba(255, 85, 102, 0.30)",
          spark: "#ff5566"
        }
      },
      {
        text: "Di dalam app kita bersimpangan",
        startSec: 160.8,
        endSec: 164.8,
        showMs: 4000,
        hideMs: 400,
        // Algoritma dating app digital — masih sans-serif agar terbaca
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff66aa", "#bb88ff"],
          halo: "rgba(255, 102, 170, 0.30)",
          spark: "#66ffdd"
        }
      },
      {
        text: "Aku yakin kau bisa mengerti",
        startSec: 164.8,
        endSec: 169.0,
        showMs: 4200,
        hideMs: 500,
        // Puncak desakan sebelum meledak ke chorus
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffdd44", "#ff6688"],
          halo: "rgba(255, 221, 68, 0.34)",
          spark: "#ffdd44"
        }
      },

      // --- MOMENT 3 (02:49.5 - 03:08.6): KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
      {
        text: "Maka jadikanku belalang sembah",
        startSec: 169.5,
        endSec: 177.5,
        showMs: 8000,
        hideMs: 500,
        // CHORUS KLIMAKS! Sakral — Cinzel besar & terang penuh
        fontFamily: "'Cinzel', serif",
        fontStyle: "900",
        fontSize: 16,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffe066", "#ff6677"],
          halo: "rgba(255, 224, 102, 0.40)",
          spark: "#ffe066"
        }
      },
      {
        text: "Walau sebentar kupercaya indah",
        startSec: 178.0,
        endSec: 184.8,
        showMs: 6800,
        hideMs: 400,
        // Keindahan fana puitis
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ddaaff", "#ffaacc"],
          halo: "rgba(221, 170, 255, 0.30)",
          spark: "#ddaaff"
        }
      },
      {
        text: "Seberapa banyak, seberapa mahal",
        startSec: 185.2,
        endSec: 188.6,
        showMs: 3400,
        hideMs: 400,
        // Transaksi keputusasaan materiil
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffdd55", "#ffaa55"],
          halo: "rgba(255, 221, 85, 0.32)",
          spark: "#ffdd55"
        }
      },

      // --- MOMENT 4 (03:08.6 - 03:23.0): SUMPAH DARAH & PENGORBANAN FATAL ---
      {
        text: "Semua 'kan kuberi",
        startSec: 189.0,
        endSec: 191.4,
        showMs: 2400,
        hideMs: 400,
        // Penyerahan total — putih murni terang, BESAR
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffffff", "#ff6688"],
          halo: "rgba(255, 255, 255, 0.38)",
          spark: "#ff6688"
        }
      },
      {
        text: "Semua 'kan kugadai",
        startSec: 191.8,
        endSec: 194.2,
        showMs: 2400,
        hideMs: 400,
        // Taruhan eksistensi — merah terang, BESAR
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff5566", "#ff8899"],
          halo: "rgba(255, 85, 102, 0.38)",
          spark: "#ff5566"
        }
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 194.6,
        endSec: 198.0,
        showMs: 3400,
        hideMs: 500,
        // Kanibalisme fatal — Cinzel sakral, terang
        fontFamily: "'Cinzel', serif",
        fontStyle: "900",
        fontSize: 16,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff5555", "#ff8888"],
          halo: "rgba(255, 85, 85, 0.38)",
          spark: "#ff5555"
        }
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 198.5,
        endSec: 202.5,
        showMs: 4000,
        hideMs: 1000,
        // Outro peleburan — lembut tapi tetap TERANG
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#cc88ff", "#ffaacc"],
          halo: "rgba(204, 136, 255, 0.30)",
          spark: "#cc88ff"
        }
      }
    ],

    audioStartTime: 133.0, // Mulai detik 133.0 (02:13.0) -> Jeda 2.8 detik untuk Intro Logo & Judul
    audioEndTime: 202.5,   // Selesai detik 202.5 (03:22.5) -> Loop kembali ke 02:13.0
    isLooping: true
  };

  // =========================================================================
  // ⚡ 2. KARAKTER SHIMMER & KAMUS TINGKAT KECERAHAN ASCII (SPEK TEKNIS)
  // =========================================================================
  const charsFixed = [
    " ", ".", ":", "-", "=", "+", "*", "#", "%", "@",
    ["$", "&", "8"], ["W", "M", "B"]
  ];
  const charsLength = charsFixed.length;
  const MAX_COLOR_INDEX = 650; // Ambang normalisasi kecerahan spesifikasi teknis

  // =========================================================================
  // 🎮 3. INISIALISASI OFFSCREEN CANVAS & ELEMEN DOM
  // =========================================================================
  const asciiContainer = document.getElementById("ascii-container");
  const outputWrapper = document.getElementById("output-wrapper");
  const audioElement = document.getElementById("audio-player");

  // Resolusi Offscreen Grid ASCII (160 kolom x 68 baris)
  const cols = 160;
  const rows = 68;
  const width = cols;
  const height = rows;

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
      // Fallback diam
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

  // =========================================================================
  // 📐 4. SISTEM ADAPTIF UKURAN LAYAR PENUH (FULLSCREEN RESPONSIVE SCALING)
  // =========================================================================
  const fitAsciiToScreen = () => {
    if (!asciiContainer) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Aspek rasio karakter monospace font: lebar ~ 0.58 tinggi
    const charHByHeight = (vh * 0.94) / rows;
    const charWByWidth = (vw * 0.94) / cols;
    const charH = Math.min(charHByHeight, charWByWidth / 0.58);

    const fontSize = Math.floor(charH * 0.88);
    const lineHeight = Math.floor(charH);
    const letterSpacing = Math.max(0, (vw * 0.94 / cols) - (fontSize * 0.58)).toFixed(1);

    asciiContainer.style.fontSize = `${fontSize}px`;
    asciiContainer.style.lineHeight = `${lineHeight}px`;
    asciiContainer.style.letterSpacing = `${letterSpacing}px`;
  };

  window.addEventListener("resize", fitAsciiToScreen);
  fitAsciiToScreen();

  // =========================================================================
  // 🌟 5. SIMULASI PARTIKEL POINTILLISM HIDUP (ORGANIC LIVING SPARKS)
  // Terinspirasi dari sistem self.spark pada kode simulasi Pointillism Python
  // =========================================================================
  const numSparks = 42;
  const sparkParticles = [];
  for (let i = 0; i < numSparks; i++) {
    sparkParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.18 + Math.random() * 0.32,
      phase: Math.random() * Math.PI * 2,
      size: Math.random() < 0.25 ? 2 : 1,
      life: Math.random()
    });
  }

  const updateAndDrawSparks = (time, baseColor) => {
    offCtx.save();
    for (let i = 0; i < numSparks; i++) {
      const p = sparkParticles[i];
      p.y -= p.speed;
      p.x += Math.sin(time * 0.0025 + p.phase) * 0.35;
      p.life = (p.life + 0.01) % 1.0;

      if (p.y < 0) {
        p.y = height + 3;
        p.x = Math.random() * width;
      }

      // Kecerahan partikel berdenyut lembut alami
      const alpha = Math.sin(p.life * Math.PI) * 0.65;
      if (alpha > 0.05) {
        offCtx.fillStyle = baseColor || "rgba(255, 255, 255, 0.5)";
        offCtx.globalAlpha = alpha;
        offCtx.fillRect(p.x, p.y, p.size, p.size);
      }
    }
    offCtx.restore();
  };

  // =========================================================================
  // 🏛️ 6. INTRO BANNER RESMI .FEAST (DETIK 133.0 - 135.8 / 02:13.0)
  // =========================================================================
  const drawIntroScene = (time, curTime, bass) => {
    const cx = width / 2;

    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    // Ethereal spark embers di latar
    updateAndDrawSparks(time, "rgba(255, 215, 0, 0.45)");

    // 1. Judul Atas
    offCtx.save();
    offCtx.fillStyle = "#ffffff";
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";
    offCtx.font = "bold 9px 'Space Grotesk', sans-serif";
    offCtx.fillText("B E L A L A N G   S E M B A H", cx, 10);

    // 2. Cover Art / Logo Tengah (Ukuran 36x36 piksel pada kanvas resolusi 160x68)
    const imgSize = 34;
    const imgX = cx - (imgSize / 2);
    const imgY = 16;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      offCtx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
    } else {
      // Fallback siluet Maneki-Neko & Altar
      offCtx.fillStyle = "#ffe066";
      offCtx.beginPath();
      offCtx.arc(cx, imgY + 16, 11, 0, Math.PI * 2);
      offCtx.fill();
      offCtx.fillRect(cx - 8, imgY + 22, 16, 10);
    }

    // Bingkai Ornamen ASCII Sudut Emas
    offCtx.strokeStyle = "#ffd700";
    offCtx.lineWidth = 1;
    const pad = 2;
    const bx = imgX - pad;
    const by = imgY - pad;
    const bw = imgSize + pad * 2;
    const bh = imgSize + pad * 2;
    const bLen = 5;

    offCtx.beginPath();
    // Sudut kiri atas
    offCtx.moveTo(bx, by + bLen); offCtx.lineTo(bx, by); offCtx.lineTo(bx + bLen, by);
    // Sudut kanan atas
    offCtx.moveTo(bx + bw - bLen, by); offCtx.lineTo(bx + bw, by); offCtx.lineTo(bx + bw, by + bLen);
    // Sudut kiri bawah
    offCtx.moveTo(bx, by + bh - bLen); offCtx.lineTo(bx, by + bh); offCtx.lineTo(bx + bLen, by + bh);
    // Sudut kanan bawah
    offCtx.moveTo(bx + bw - bLen, by + bh); offCtx.lineTo(bx + bw, by + bh); offCtx.lineTo(bx + bw, by + bh - bLen);
    offCtx.stroke();

    // 3. Subtitle Bawah
    offCtx.font = "bold 8px 'Space Grotesk', sans-serif";
    offCtx.fillStyle = "#ff2a55";
    offCtx.fillText(". F E A S T", cx, 58);

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 7. RENDER TEKS LIRIK HIDUP (ORGANIC SWAY, LIVING BREATHING & AURA)
  // =========================================================================
  const drawLyricScene = (item, time, bass) => {
    if (!item || !item.text) return;

    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    const text = item.text.trim();
    const words = text.split(" ");
    const cx = width / 2;
    const cy = height / 2;

    // Organic Sway & Breathing (Terinspirasi rumus sway & profile sinc)
    const swayX = Math.sin(time * 0.0018) * 1.4;
    const swayY = Math.cos(time * 0.0022) * 0.8;
    const bassScale = 1.0 + (bass * 0.05);

    // Ethereal Aura Pendaran Lembut di Belakang Lirik
    if (item.palette && item.palette.halo) {
      const haloGrad = offCtx.createRadialGradient(cx, cy, 2, cx, cy, 52 * bassScale);
      haloGrad.addColorStop(0, item.palette.halo);
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      offCtx.fillStyle = haloGrad;
      offCtx.fillRect(0, 0, width, height);
    }

    // Partikel bara api melayang organik
    updateAndDrawSparks(time, item.palette ? item.palette.spark : null);

    // Pembagian baris lirik otomatis agar tidak terpotong
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

    offCtx.save();
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    const baseSize = item.fontSize || 14;
    const maxW = width * 0.92; // Batas aman lebar teks

    if (lines.length === 1) {
      let size = baseSize;
      offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
      let textW = offCtx.measureText(lines[0]).width;
      if (textW > maxW) {
        size = Math.floor(size * (maxW / textW));
        offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
        textW = offCtx.measureText(lines[0]).width;
      }

      // LAPISAN 1: Teks putih terang solid (base agar selalu terbaca)
      offCtx.fillStyle = "#ffffff";
      offCtx.fillText(lines[0], cx + swayX, cy + swayY);

      // LAPISAN 2: Overlay gradasi warna tipis di atas (compositing)
      const p = item.palette;
      if (p && p.gradient && p.gradient.length >= 3) {
        offCtx.globalCompositeOperation = "multiply";
        const grad = offCtx.createLinearGradient(cx - (textW / 2), cy - 6, cx + (textW / 2), cy + 6);
        grad.addColorStop(0, p.gradient[1]);
        grad.addColorStop(0.5, p.gradient[0]);
        grad.addColorStop(1, p.gradient[2]);
        offCtx.fillStyle = grad;
        offCtx.fillText(lines[0], cx + swayX, cy + swayY);
        offCtx.globalCompositeOperation = "source-over";
      }
    } else {
      let size = Math.floor(baseSize * 0.94);
      offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
      const w1 = offCtx.measureText(lines[0]).width;
      const w2 = offCtx.measureText(lines[1]).width;
      const maxLineWidth = Math.max(w1, w2);
      if (maxLineWidth > maxW) {
        size = Math.floor(size * (maxW / maxLineWidth));
        offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
      }

      const lineSpacing = size * 0.95;
      const y1 = cy + swayY - (lineSpacing / 2);
      const y2 = cy + swayY + (lineSpacing / 2);

      // LAPISAN 1: Teks putih terang solid (selalu terbaca)
      offCtx.fillStyle = "#ffffff";
      offCtx.fillText(lines[0], cx + swayX, y1);
      offCtx.fillText(lines[1], cx + swayX, y2);

      // LAPISAN 2: Overlay gradasi warna tipis
      const p = item.palette;
      if (p && p.gradient && p.gradient.length >= 3) {
        offCtx.globalCompositeOperation = "multiply";
        const grad1 = offCtx.createLinearGradient(cx - (w1 / 2), y1 - 6, cx + (w1 / 2), y1 + 6);
        const grad2 = offCtx.createLinearGradient(cx - (w2 / 2), y2 - 6, cx + (w2 / 2), y2 + 6);
        grad1.addColorStop(0, p.gradient[1]); grad1.addColorStop(0.5, p.gradient[0]); grad1.addColorStop(1, p.gradient[2]);
        grad2.addColorStop(0, p.gradient[2]); grad2.addColorStop(0.5, p.gradient[0]); grad2.addColorStop(1, p.gradient[1]);

        offCtx.fillStyle = grad1;
        offCtx.fillText(lines[0], cx + swayX, y1);
        offCtx.fillStyle = grad2;
        offCtx.fillText(lines[1], cx + swayX, y2);
        offCtx.globalCompositeOperation = "source-over";
      }
    }

    offCtx.restore();
  };

  // =========================================================================
  // ⚡ 8. MESIN UTAMA PIXEL-TO-ASCII (REAL-TIME COLORED ASCII SHADER)
  // Menjalankan spesifikasi teknis: Shimmer jitter, deteksi kecerahan,
  // dan optimasi DOM string run-length grouping untuk 60 FPS murni.
  // =========================================================================
  const updateAsciiMatrix = () => {
    const imgData = offCtx.getImageData(0, 0, width, height).data;

    let outputText = "";

    for (let y = 0; y < height; y++) {
      let row = "";
      let curColor = null;
      let run = "";

      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = imgData[index];
        const g = imgData[index + 1];
        const b = imgData[index + 2];
        const c = r + g + b;

        // Aturan 5 Spesifikasi: Piksel gelap (c < 22) langsung spasi murni tanpa tag <span>
        if (c < 22) {
          if (run) {
            row += `<span style="color:${curColor}">${run}</span>`;
            run = "";
            curColor = null;
          }
          row += " ";
        } else {
          // Mapping kecerahan ke indeks array karakter
          const charIndex = Math.min(
            Math.floor((charsLength * c) / MAX_COLOR_INDEX),
            charsLength - 1
          );
          const result = charsFixed[charIndex];

          // Efek Dynamic Shimmer / Jitter: Jika sub-array, acak simbol tiap frame
          let char;
          if (isGlitchActive && Math.random() < 0.2) {
            const glitchGlyphs = ["†", "‡", "§", "ø", "X", "✦", "#", "!", "?"];
            char = glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)];
          } else {
            char = Array.isArray(result)
              ? result[Math.floor(Math.random() * result.length)]
              : result;
          }

          // Kuantisasi warna halus agar rangkaian karakter seragam dapat digabung (Run-Length Grouping)
          const qr = Math.round(r / 4) * 4;
          const qg = Math.round(g / 4) * 4;
          const qb = Math.round(b / 4) * 4;
          const colorStr = `rgb(${qr},${qg},${qb})`;

          if (colorStr === curColor) {
            run += char;
          } else {
            if (run) {
              row += `<span style="color:${curColor}">${run}</span>`;
            }
            curColor = colorStr;
            run = char;
          }
        }
      }

      if (run) {
        row += `<span style="color:${curColor}">${run}</span>`;
      }

      outputText += `<div>${row}</div>`;
    }

    asciiContainer.innerHTML = outputText;
  };

  // =========================================================================
  // 🎵 9. SISTEM PEMUTARAN AUDIO & KENDALI NAVIGASI
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

  asciiContainer.addEventListener("click", handleUserInteraction);
  window.addEventListener("click", (e) => {
    if (e.target !== asciiContainer && !asciiContainer.contains(e.target)) {
      handleUserInteraction();
    }
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
    fitAsciiToScreen();
    playAudio();
  });

  // =========================================================================
  // 🔄 10. LOOP ANIMASI REAL-TIME (60 FPS)
  // =========================================================================
  const updateLoop = (time) => {
    if (!isPaused) {
      if (audioElement && !audioElement.paused && audioElement.duration > 0) {
        const curTime = audioElement.currentTime;

        // Loop otomatis di akhir Chorus 2 (Detik 202.5 / 03:22.5)
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
        // Fallback timer jika audio belum dimulai
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

    // Hitung posisi audio saat ini
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

    // 1. Zona Intro Banner (Detik 133.0 s/d 135.8 = Menit 02:13)
    if (curTime < 135.8) {
      drawIntroScene(time, curTime, bass);
    } else {
      // 2. Zona Lirik dengan Tema Font Khusus
      if (isShowing) {
        const currentItem = config.lyrics[currentLyricIndex];
        if (currentItem) {
          drawLyricScene(currentItem, time, bass);
        }
      } else {
        // Jeda gelap antar lirik: layar hitam dengan partikel bara redup melayang
        offCtx.fillStyle = "#000000";
        offCtx.fillRect(0, 0, width, height);
        updateAndDrawSparks(time, "rgba(255, 42, 85, 0.2)");
      }
    }

    // 3. Konversi Offscreen Canvas ke Colored ASCII Terminal Art
    updateAsciiMatrix();

    requestAnimationFrame(updateLoop);
  };

  // Jalankan setelah font Google siap
  if (document.fonts) {
    document.fonts.ready.then(() => {
      fitAsciiToScreen();
      requestAnimationFrame(updateLoop);
    });
  } else {
    requestAnimationFrame(updateLoop);
  }
})();
