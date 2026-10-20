/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - COLORED ASCII LYRIC VISUALIZER
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Real-Time Pixel-to-ASCII Lyric Visualizer hidup & bernapas
 * dengan tema obsesi mendalam (nuansa crimson/kemerahan obsesif), banner
 * pembuka resmi yang tajam & jelas, animasi dramatis khusus Chorus 2
 * ("Maka jadikanku belalang sembah"), serta transisi mulus bebas bug.
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (VERSE 2 & CHORUS 2) DENGAN TEMA OBSESI MENDALAM
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
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff2a55", "#e60050"],
          halo: "rgba(255, 42, 85, 0.35)",
          spark: "#ff4d6d"
        }
      },
      {
        text: "Rute pulangmu telah kupelajari",
        startSec: 140.0,
        endSec: 143.8,
        showMs: 3800,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff3366", "#00f0ff"],
          halo: "rgba(255, 51, 102, 0.32)",
          spark: "#ff3366"
        }
      },
      {
        text: "Kutahu nama anak kita nanti",
        startSec: 144.2,
        endSec: 147.8,
        showMs: 3600,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff4081", "#ffd700"],
          halo: "rgba(255, 64, 129, 0.35)",
          spark: "#ffd700"
        }
      },
      {
        text: "Suatu saat kau pasti mengerti",
        startSec: 148.2,
        endSec: 152.0,
        showMs: 3800,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff0055", "#b3003b"],
          halo: "rgba(255, 0, 85, 0.38)",
          spark: "#ff0055"
        }
      },

      // --- MOMENT 2 (02:32.4 - 02:49.0): KESENJANGAN SOSIAL & RADAR APLIKASI (VERSE 2B) ---
      {
        text: "Walau upahku dalam sebulan",
        startSec: 152.4,
        endSec: 156.0,
        showMs: 3600,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff5722", "#ff1744"],
          halo: "rgba(255, 87, 34, 0.35)",
          spark: "#ff5722"
        }
      },
      {
        text: "Hanya porsimu dalam sehari",
        startSec: 156.4,
        endSec: 160.4,
        showMs: 4000,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#ff4d6d"],
          halo: "rgba(255, 23, 68, 0.38)",
          spark: "#ff1744"
        }
      },
      {
        text: "Di dalam app kita bersimpangan",
        startSec: 160.8,
        endSec: 164.8,
        showMs: 4000,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff007f", "#9333ea"],
          halo: "rgba(255, 0, 127, 0.35)",
          spark: "#ff007f"
        }
      },
      {
        text: "Aku yakin kau bisa mengerti",
        startSec: 164.8,
        endSec: 168.8,
        showMs: 4000,
        hideMs: 600,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#ffa114"],
          halo: "rgba(255, 23, 68, 0.40)",
          spark: "#ff1744"
        }
      },

      // --- MOMENT 3 (02:49.5 - 03:08.6): KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
      {
        text: "Maka jadikanku belalang sembah",
        startSec: 169.5,
        endSec: 177.5,
        showMs: 8000,
        hideMs: 500,
        // CHORUS KLIMAKS! Sakral, dramatis, altar shockwave, Cinzel monumental
        fontFamily: "'Cinzel', serif",
        fontStyle: "900",
        fontSize: 16,
        dramatic: true,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#ffd700"],
          halo: "rgba(255, 23, 68, 0.52)",
          spark: "#ffd700"
        }
      },
      {
        text: "Walau sebentar kupercaya indah",
        startSec: 178.0,
        endSec: 184.8,
        showMs: 6800,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff4081", "#c084fc"],
          halo: "rgba(255, 64, 129, 0.35)",
          spark: "#ff4081"
        }
      },
      {
        text: "Seberapa banyak, seberapa mahal",
        startSec: 185.2,
        endSec: 188.6,
        showMs: 3400,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff3d00", "#ffd700"],
          halo: "rgba(255, 61, 0, 0.35)",
          spark: "#ffd700"
        }
      },

      // --- MOMENT 4 (03:08.6 - 03:23.0): SUMPAH DARAH & PENGORBANAN FATAL ---
      {
        text: "Semua 'kan kuberi",
        startSec: 189.0,
        endSec: 191.4,
        showMs: 2400,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffffff", "#ff1744"],
          halo: "rgba(255, 255, 255, 0.45)",
          spark: "#ff1744"
        }
      },
      {
        text: "Semua 'kan kugadai",
        startSec: 191.8,
        endSec: 194.2,
        showMs: 2400,
        hideMs: 400,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#ff3366"],
          halo: "rgba(255, 23, 68, 0.45)",
          spark: "#ff1744"
        }
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 194.6,
        endSec: 198.0,
        showMs: 3400,
        hideMs: 500,
        fontFamily: "'Cinzel', serif",
        fontStyle: "900",
        fontSize: 16,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#e60026", "#ff4d6d"],
          halo: "rgba(230, 0, 38, 0.45)",
          spark: "#e60026"
        }
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 198.5,
        endSec: 202.5,
        showMs: 4000,
        hideMs: 1000,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff758f", "#c084fc"],
          halo: "rgba(255, 117, 143, 0.30)",
          spark: "#ff758f"
        }
      }
    ],

    audioStartTime: 133.0, // Mulai detik 133.0 (02:13.0) -> Intro Banner Resmi
    audioEndTime: 202.5,   // Selesai detik 202.5 (03:22.5) -> Loop kembali
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
  const MAX_COLOR_INDEX = 650;

  // =========================================================================
  // 🎮 3. INISIALISASI OFFSCREEN CANVAS & ELEMEN DOM
  // =========================================================================
  const asciiContainer = document.getElementById("ascii-container");
  const outputWrapper = document.getElementById("output-wrapper");
  const audioElement = document.getElementById("audio-player");

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
      // Fallback
    }
  };

  const getBassEnergy = () => {
    if (!analyser || !dataArray) return 0;
    analyser.getByteFrequencyData(dataArray);
    const lowFreq = (dataArray[0] + dataArray[1] + dataArray[2] + dataArray[3]) / 4;
    return lowFreq / 255;
  };

  const triggerGlitch = (duration = 110) => {
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
  // =========================================================================
  const maxSparks = 65;
  const sparkParticles = [];
  for (let i = 0; i < maxSparks; i++) {
    sparkParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.16 + Math.random() * 0.35,
      phase: Math.random() * Math.PI * 2,
      size: Math.random() < 0.25 ? 2 : 1,
      life: Math.random()
    });
  }

  const updateAndDrawSparks = (time, baseColor, count = 42) => {
    offCtx.save();
    const activeCount = Math.min(count, maxSparks);
    for (let i = 0; i < activeCount; i++) {
      const p = sparkParticles[i];
      p.y -= p.speed;
      p.x += Math.sin(time * 0.0025 + p.phase) * 0.35;
      p.life = (p.life + 0.01) % 1.0;

      if (p.y < 0) {
        p.y = height + 3;
        p.x = Math.random() * width;
      }

      const alpha = Math.sin(p.life * Math.PI) * 0.75;
      if (alpha > 0.05) {
        offCtx.fillStyle = baseColor || "#ff2a55";
        offCtx.globalAlpha = alpha;
        offCtx.fillRect(p.x, p.y, p.size, p.size);
      }
    }
    offCtx.restore();
  };

  // =========================================================================
  // 🏛️ 6. INTRO BANNER RESMI .FEAST (DETIK 133.0 - 135.8 / 02:13.0)
  // Didesain tajam, terbaca jelas, dan beresolusi tinggi dalam format ASCII
  // =========================================================================
  const drawIntroScene = (time, curTime, bass) => {
    const cx = width / 2;

    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    // Ethereal red-gold spark embers di latar
    updateAndDrawSparks(time, "rgba(255, 42, 85, 0.45)", 35);

    offCtx.save();
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    // 1. Judul Atas: Jelas, Tebal, dan Mudah Dibaca
    offCtx.font = "bold 11px 'Space Grotesk', sans-serif";
    const titleGrad = offCtx.createLinearGradient(cx - 55, 11, cx + 55, 11);
    titleGrad.addColorStop(0, "#ff4d6d");
    titleGrad.addColorStop(0.3, "#ffffff");
    titleGrad.addColorStop(0.7, "#ffffff");
    titleGrad.addColorStop(1, "#ffd700");
    offCtx.fillStyle = titleGrad;
    offCtx.fillText("BELALANG SEMBAH", cx, 11);

    // 2. Cover Art / Logo Tengah (34x34 piksel pada kanvas 160x68)
    const imgSize = 34;
    const imgX = cx - (imgSize / 2);
    const imgY = 17;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      try {
        offCtx.filter = "contrast(1.6) brightness(1.25)";
      } catch (e) {}
      offCtx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
      offCtx.filter = "none";
    } else {
      offCtx.fillStyle = "#ffd700";
      offCtx.beginPath();
      offCtx.arc(cx, imgY + 16, 12, 0, Math.PI * 2);
      offCtx.fill();
    }

    // Bingkai Ornamen Sudut Emas-Kemerahan
    offCtx.strokeStyle = "#ff2a55";
    offCtx.lineWidth = 1;
    const pad = 2;
    const bx = imgX - pad;
    const by = imgY - pad;
    const bw = imgSize + pad * 2;
    const bh = imgSize + pad * 2;
    const bLen = 6;

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

    // 3. Subtitle Artis: Jelas & Tajam
    offCtx.font = "bold 10px 'Space Grotesk', sans-serif";
    const artistGrad = offCtx.createLinearGradient(cx - 30, 57, cx + 30, 57);
    artistGrad.addColorStop(0, "#ffd700");
    artistGrad.addColorStop(0.5, "#ffffff");
    artistGrad.addColorStop(1, "#ff1744");
    offCtx.fillStyle = artistGrad;
    offCtx.fillText(". F E A S T", cx, 57);

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 7. RENDER TEKS LIRIK DENGAN TEMA OBSESI MENDALAM & ANIMASI DRAMATIS
  // =========================================================================
  const drawLyricScene = (item, time, bass) => {
    if (!item || !item.text) return;

    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    const text = item.text.trim();
    const words = text.split(" ");
    const cx = width / 2;
    const cy = height / 2;

    const swayX = Math.sin(time * 0.0018) * 1.3;
    const swayY = Math.cos(time * 0.0022) * 0.7;
    const bassScale = 1.0 + (bass * 0.06);

    // Ethereal Obsessive Halo Aura (Denyutan pendaran merah obsesif mendalam)
    if (item.palette && item.palette.halo) {
      const haloRadius = (item.dramatic ? 62 : 52) * bassScale;
      const haloGrad = offCtx.createRadialGradient(cx, cy, 2, cx, cy, haloRadius);
      haloGrad.addColorStop(0, item.palette.halo);
      haloGrad.addColorStop(0.65, "rgba(180, 0, 35, 0.12)");
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      offCtx.fillStyle = haloGrad;
      offCtx.fillRect(0, 0, width, height);
    }

    // --- ANIMASI KHUSUS DRAMATIS: KULTUS BELALANG SEMBAH (CHORUS 2) ---
    if (item.dramatic) {
      // 1. Gelombang Altar Sakral (Expanding Ritual Shockwaves)
      const waveTime = time * 0.045;
      for (let w = 0; w < 3; w++) {
        const r = (waveTime + w * 22) % 68;
        const alpha = Math.max(0, (1 - r / 68) * 0.45);
        offCtx.strokeStyle = `rgba(255, 23, 68, ${alpha})`;
        offCtx.lineWidth = 1;
        offCtx.beginPath();
        offCtx.arc(cx, cy, r, 0, Math.PI * 2);
        offCtx.stroke();
      }

      // 2. Berkas Sinar Ritual Diagonal Emas
      offCtx.save();
      offCtx.strokeStyle = "rgba(255, 215, 0, 0.18)";
      offCtx.lineWidth = 1;
      for (let a = 0; a < 8; a++) {
        const angle = (a * Math.PI / 4) + (time * 0.0008);
        offCtx.beginPath();
        offCtx.moveTo(cx, cy);
        offCtx.lineTo(cx + Math.cos(angle) * 75, cy + Math.sin(angle) * 35);
        offCtx.stroke();
      }
      offCtx.restore();

      // Partikel bara api pengorbanan ekstra intens
      updateAndDrawSparks(time, "#ff1744", 60);
    } else {
      updateAndDrawSparks(time, item.palette ? item.palette.spark : "#ff2a55", 38);
    }

    // Pembagian baris lirik otomatis agar pas di layar
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
    const maxW = width * 0.91;

    if (lines.length === 1) {
      let size = baseSize;
      offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
      let textW = offCtx.measureText(lines[0]).width;
      if (textW > maxW) {
        size = Math.floor(size * (maxW / textW));
        offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
        textW = offCtx.measureText(lines[0]).width;
      }

      // Gradasi terang: Batang huruf dijamin putih solid (#ffffff), tepi berpendar kemerahan
      const p = item.palette;
      const grad = offCtx.createLinearGradient(cx - (textW / 2), cy, cx + (textW / 2), cy);
      if (p && p.gradient && p.gradient.length >= 3) {
        grad.addColorStop(0, p.gradient[1]);
        grad.addColorStop(0.25, "#ffffff");
        grad.addColorStop(0.5, "#ffffff");
        grad.addColorStop(0.75, "#ffffff");
        grad.addColorStop(1, p.gradient[2]);
      } else {
        grad.addColorStop(0, "#ff2a55");
        grad.addColorStop(0.5, "#ffffff");
        grad.addColorStop(1, "#ff2a55");
      }
      offCtx.fillStyle = grad;
      offCtx.fillText(lines[0], cx + swayX, cy + swayY);
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

      const lineSpacing = size * 0.96;
      const y1 = cy + swayY - (lineSpacing / 2);
      const y2 = cy + swayY + (lineSpacing / 2);

      const p = item.palette;
      const grad1 = offCtx.createLinearGradient(cx - (w1 / 2), y1, cx + (w1 / 2), y1);
      const grad2 = offCtx.createLinearGradient(cx - (w2 / 2), y2, cx + (w2 / 2), y2);
      if (p && p.gradient && p.gradient.length >= 3) {
        grad1.addColorStop(0, p.gradient[1]); grad1.addColorStop(0.3, "#ffffff"); grad1.addColorStop(0.7, "#ffffff"); grad1.addColorStop(1, p.gradient[2]);
        grad2.addColorStop(0, p.gradient[2]); grad2.addColorStop(0.3, "#ffffff"); grad2.addColorStop(0.7, "#ffffff"); grad2.addColorStop(1, p.gradient[1]);
      } else {
        grad1.addColorStop(0, "#ff2a55"); grad1.addColorStop(0.5, "#ffffff"); grad1.addColorStop(1, "#ff2a55");
        grad2.addColorStop(0, "#ff2a55"); grad2.addColorStop(0.5, "#ffffff"); grad2.addColorStop(1, "#ff2a55");
      }

      offCtx.fillStyle = grad1;
      offCtx.fillText(lines[0], cx + swayX, y1);
      offCtx.fillStyle = grad2;
      offCtx.fillText(lines[1], cx + swayX, y2);
    }

    offCtx.restore();
  };

  // =========================================================================
  // ⚡ 8. MESIN UTAMA PIXEL-TO-ASCII (REAL-TIME COLORED ASCII SHADER)
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
          const charIndex = Math.min(
            Math.floor((charsLength * c) / MAX_COLOR_INDEX),
            charsLength - 1
          );
          const result = charsFixed[charIndex];

          let char;
          if (isGlitchActive && Math.random() < 0.16) {
            const glitchGlyphs = ["†", "‡", "§", "ø", "X", "✦", "#", "!", "?"];
            char = glitchGlyphs[Math.floor(Math.random() * glitchGlyphs.length)];
          } else {
            char = Array.isArray(result)
              ? result[Math.floor(Math.random() * result.length)]
              : result;
          }

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
      triggerGlitch(120);
      if (audioElement && config.lyrics[currentLyricIndex].startSec !== undefined) {
        audioElement.currentTime = config.lyrics[currentLyricIndex].startSec;
      }
    } else if (e.code === "ArrowLeft") {
      e.preventDefault();
      currentLyricIndex = (currentLyricIndex - 1 + config.lyrics.length) % config.lyrics.length;
      timeAccumulator = 0;
      isShowing = true;
      triggerGlitch(120);
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
  // 🔄 10. LOOP ANIMASI REAL-TIME (60 FPS) DENGAN TRANSISI BEBAS BUG
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
            triggerGlitch(150);
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
                triggerGlitch(120);
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
            triggerGlitch(120);
          }
        }
      }
    }
    lastTime = time;

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
      // 2. Zona Lirik dengan Tema Obsesif
      if (isShowing) {
        const currentItem = config.lyrics[currentLyricIndex];
        if (currentItem) {
          drawLyricScene(currentItem, time, bass);
        }
      } else {
        // Jeda antar lirik
        offCtx.fillStyle = "#000000";
        offCtx.fillRect(0, 0, width, height);

        // TRANSISI KHUSUS DRAMATIS SEBELUM CHORUS 2 (168.8s - 169.5s)
        // Lingkaran altar sakral mengumpul ke pusat, menyiapkan ledakan Chorus
        if (curTime >= 168.8 && curTime < 169.5) {
          const progress = (curTime - 168.8) / 0.7;
          const gatherRadius = Math.max(6, 55 * (1 - progress));
          offCtx.strokeStyle = `rgba(255, 23, 68, ${0.4 + progress * 0.4})`;
          offCtx.lineWidth = 1.5;
          offCtx.beginPath();
          offCtx.arc(width / 2, height / 2, gatherRadius, 0, Math.PI * 2);
          offCtx.stroke();
          updateAndDrawSparks(time, "#ff1744", 45);
        } else {
          updateAndDrawSparks(time, "rgba(255, 42, 85, 0.28)", 28);
        }
      }
    }

    // 3. Konversi Offscreen Canvas ke Colored ASCII Terminal Art
    updateAsciiMatrix();

    requestAnimationFrame(updateLoop);
  };

  if (document.fonts) {
    document.fonts.ready.then(() => {
      fitAsciiToScreen();
      requestAnimationFrame(updateLoop);
    });
  } else {
    requestAnimationFrame(updateLoop);
  }
})();
