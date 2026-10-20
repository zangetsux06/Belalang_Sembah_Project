/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - COLORED ASCII LYRIC VISUALIZER
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Real-Time Pixel-to-ASCII Lyric Visualizer hidup & bernapas
 * dengan tema obsesi kemerahan (Crimson/Blood-Red Obsession), banner pembuka
 * resmi tajam & jelas, transisi lirik instan langsung ganti tanpa jeda/fade,
 * serta efek glitch ASCII lirik elektrik dinamis pada pergantian lirik & Chorus 2
 * ("Maka jadikanku belalang sembah") tanpa noise/artefak teks hantu.
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (VERSE 2 & CHORUS 2) - TEMA KEMERAHAN OBSESIF
  // Seluruh timestamp dirancang rapat kontinu (seamless direct cut tanpa jeda).
  // =========================================================================
  const config = {
    lyrics: [
      // --- MOMENT 1 (02:15.8 - 02:32.4): STALKER & OBSESI BUTA (VERSE 2A) ---
      {
        text: "Jumlah rambutmu 'kan kuhafal mati",
        startSec: 135.8,
        endSec: 140.0,
        showMs: 4200,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#d90429"],
          halo: "rgba(255, 23, 68, 0.35)",
          spark: "#ff1744"
        }
      },
      {
        text: "Rute pulangmu telah kupelajari",
        startSec: 140.0,
        endSec: 144.2,
        showMs: 4200,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff2a55", "#ff5252"],
          halo: "rgba(255, 42, 85, 0.35)",
          spark: "#ff2a55"
        }
      },
      {
        text: "Kutahu nama anak kita nanti",
        startSec: 144.2,
        endSec: 148.2,
        showMs: 4000,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff2a55", "#e60039"],
          halo: "rgba(255, 42, 85, 0.35)",
          spark: "#ff2a55"
        }
      },
      {
        text: "Suatu saat kau pasti mengerti",
        startSec: 148.2,
        endSec: 152.4,
        showMs: 4200,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#e60026", "#b3001e"],
          halo: "rgba(230, 0, 38, 0.38)",
          spark: "#ff1744"
        }
      },

      // --- MOMENT 2 (02:32.4 - 02:49.0): KESENJANGAN SOSIAL & RADAR APLIKASI (VERSE 2B) ---
      {
        text: "Walau upahku dalam sebulan",
        startSec: 152.4,
        endSec: 156.4,
        showMs: 4000,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff3344", "#d90429"],
          halo: "rgba(255, 51, 68, 0.35)",
          spark: "#ff3344"
        }
      },
      {
        text: "Hanya porsimu dalam sehari",
        startSec: 156.4,
        endSec: 160.8,
        showMs: 4400,
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
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#d90429"],
          halo: "rgba(255, 23, 68, 0.35)",
          spark: "#ff1744"
        }
      },
      {
        text: "Aku yakin kau bisa mengerti",
        startSec: 164.8,
        endSec: 169.5,
        showMs: 4700,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff2a55", "#d90429"],
          halo: "rgba(255, 42, 85, 0.38)",
          spark: "#ff2a55"
        }
      },

      // --- MOMENT 3 (02:49.5 - 03:08.6): KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
      {
        text: "Maka jadikanku belalang sembah",
        startSec: 169.5,
        endSec: 178.0,
        showMs: 8500,
        // CHORUS KLIMAKS! Font Space Grotesk tebal, efek glitch ASCII lirik elektrik
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 16,
        dramatic: true,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#d90429"],
          spark: "#ff1744"
        }
      },
      {
        text: "Walau sebentar kupercaya indah",
        startSec: 178.0,
        endSec: 185.2,
        showMs: 7200,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff2a55", "#e60039"],
          halo: "rgba(255, 42, 85, 0.35)",
          spark: "#ff2a55"
        }
      },
      {
        text: "Seberapa banyak, seberapa mahal",
        startSec: 185.2,
        endSec: 189.0,
        showMs: 3800,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 14,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff2a55", "#d90429"],
          halo: "rgba(255, 42, 85, 0.35)",
          spark: "#ff2a55"
        }
      },

      // --- MOMENT 4 (03:08.6 - 03:23.0): SUMPAH DARAH & PENGORBANAN FATAL ---
      {
        text: "Semua 'kan kuberi",
        startSec: 189.0,
        endSec: 191.8,
        showMs: 2800,
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
        endSec: 194.6,
        showMs: 2800,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#d90429"],
          halo: "rgba(255, 23, 68, 0.45)",
          spark: "#ff1744"
        }
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 194.6,
        endSec: 198.5,
        showMs: 3900,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 16,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#e60026", "#d90429"],
          spark: "#e60026"
        }
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 198.5,
        endSec: 202.5,
        showMs: 4000,
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 15,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff4d6d", "#d90429"],
          halo: "rgba(255, 77, 109, 0.32)",
          spark: "#ff4d6d"
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
  let isPaused = false;

  // =========================================================================
  // ⚡ SISTEM EFEK GLITCH ASCII LIRIK (PUNCHY DIGITAL CORRUPTION)
  // =========================================================================
  const GLITCH_CHARS = ["#", "%", "&", "8", "X", "$", "/", "\\", "!", "?", "+", "-", "=", "*", "0", "1", "@"];
  let glitchRemainingMs = 0;
  let glitchIntensity = 0;
  let glitchTimeout = null;
  let lastLyricIndex = -1;

  const triggerGlitch = (durationMs = 200, intensity = 0.5, isIntense = false) => {
    glitchRemainingMs = durationMs;
    glitchIntensity = intensity;
    if (outputWrapper) {
      const cls = isIntense ? "glitching-intense" : "glitching";
      outputWrapper.classList.remove("glitching", "glitching-intense");
      void outputWrapper.offsetWidth; // Force DOM reflow agar animasi glitch bisa di-trigger ulang
      outputWrapper.classList.add(cls);

      if (glitchTimeout) clearTimeout(glitchTimeout);
      glitchTimeout = setTimeout(() => {
        outputWrapper.classList.remove("glitching", "glitching-intense");
      }, Math.min(durationMs, isIntense ? 320 : 160));
    }
  };

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
  // Serpihan bara api merah melayang organik
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

  const updateAndDrawSparks = (time, baseColor, count = 40) => {
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
        offCtx.fillStyle = baseColor || "#ff1744";
        offCtx.globalAlpha = alpha;
        offCtx.fillRect(p.x, p.y, p.size, p.size);
      }
    }
    offCtx.restore();
  };

  // =========================================================================
  // 🏛️ 6. INTRO BANNER RESMI .FEAST (DETIK 133.0 - 135.8 / 02:13.0)
  // Format tajam, kontras tinggi, dan mudah dibaca dalam gaya kemerahan obsesif
  // =========================================================================
  const drawIntroScene = (time, curTime, bass) => {
    const cx = width / 2;

    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    // Ethereal crimson spark embers di latar
    updateAndDrawSparks(time, "rgba(255, 23, 68, 0.45)", 35);

    offCtx.save();
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    // 1. Judul Atas: Jelas, Tebal, dan Mudah Dibaca
    offCtx.font = "bold 11px 'Space Grotesk', sans-serif";
    const titleGrad = offCtx.createLinearGradient(cx - 55, 11, cx + 55, 11);
    titleGrad.addColorStop(0, "#ff2a55");
    titleGrad.addColorStop(0.3, "#ffffff");
    titleGrad.addColorStop(0.7, "#ffffff");
    titleGrad.addColorStop(1, "#d90429");
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
      offCtx.fillStyle = "#ff1744";
      offCtx.beginPath();
      offCtx.arc(cx, imgY + 16, 12, 0, Math.PI * 2);
      offCtx.fill();
    }

    // Bingkai Ornamen Sudut Kemerahan
    offCtx.strokeStyle = "#ff1744";
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
    artistGrad.addColorStop(0, "#ff1744");
    artistGrad.addColorStop(0.5, "#ffffff");
    artistGrad.addColorStop(1, "#d90429");
    offCtx.fillStyle = artistGrad;
    offCtx.fillText(". F E A S T", cx, 57);

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 7. RENDER TEKS LIRIK: TEMA OBSESI KEMERAHAN & ELEMEN VISUAL BERSIH
  // Menghilangkan garis lingkaran/vektor latar yang memicu glitch teks hantu
  // =========================================================================
  const drawLyricScene = (item, time, bass) => {
    if (!item || !item.text) return;

    // Latar belakang 100% hitam pekat murni tanpa noise
    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    const text = item.text.trim();
    const words = text.split(" ");
    const cx = width / 2;
    const cy = height / 2;

    const swayX = Math.sin(time * 0.0018) * 1.3;
    const swayY = Math.cos(time * 0.0022) * 0.7;

    // Partikel bara api kemerahan melayang halus di latar belakang
    updateAndDrawSparks(time, item.palette ? item.palette.spark : "#ff1744", item.dramatic ? 45 : 30);

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

      // Gradasi kemerahan obsesif: Inti huruf putih solid (#ffffff), tepian merah crimson
      const p = item.palette;
      const grad = offCtx.createLinearGradient(cx - (textW / 2), cy, cx + (textW / 2), cy);
      if (p && p.gradient && p.gradient.length >= 3) {
        grad.addColorStop(0, p.gradient[1]);
        grad.addColorStop(0.25, "#ffffff");
        grad.addColorStop(0.5, "#ffffff");
        grad.addColorStop(0.75, "#ffffff");
        grad.addColorStop(1, p.gradient[2]);
      } else {
        grad.addColorStop(0, "#ff1744");
        grad.addColorStop(0.5, "#ffffff");
        grad.addColorStop(1, "#d90429");
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
        grad1.addColorStop(0, "#ff1744"); grad1.addColorStop(0.5, "#ffffff"); grad1.addColorStop(1, "#d90429");
        grad2.addColorStop(0, "#ff1744"); grad2.addColorStop(0.5, "#ffffff"); grad2.addColorStop(1, "#d90429");
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
  // Dilengkapi efek glitch teks karakter ASCII elektrik dinamis
  // =========================================================================
  const updateAsciiMatrix = () => {
    const imgData = offCtx.getImageData(0, 0, width, height).data;

    let outputText = "";
    const isGlitch = glitchRemainingMs > 0;

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

          let char = Array.isArray(result)
            ? result[Math.floor(Math.random() * result.length)]
            : result;

          let qr = Math.round(r / 4) * 4;
          let qg = Math.round(g / 4) * 4;
          let qb = Math.round(b / 4) * 4;

          // ⚡ Efek Glitch ASCII Lirik: Scramble karakter dan flash crimson/putih
          if (isGlitch && Math.random() < (0.35 * glitchIntensity)) {
            char = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
            if (Math.random() < 0.5) {
              qr = 255;
              qg = Math.random() < 0.3 ? 255 : 23;
              qb = Math.random() < 0.3 ? 255 : 68;
            }
          }

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
      const nextIndex = (currentLyricIndex + 1) % config.lyrics.length;
      currentLyricIndex = nextIndex;
      timeAccumulator = 0;
      const targetItem = config.lyrics[nextIndex];
      if (audioElement && targetItem.startSec !== undefined) {
        audioElement.currentTime = targetItem.startSec;
      }
      const isChorus = (nextIndex === 8) || (targetItem && targetItem.dramatic);
      triggerGlitch(isChorus ? 360 : 120, isChorus ? 0.9 : 0.35, isChorus);
      lastLyricIndex = nextIndex;
    } else if (e.code === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentLyricIndex - 1 + config.lyrics.length) % config.lyrics.length;
      currentLyricIndex = prevIndex;
      timeAccumulator = 0;
      const targetItem = config.lyrics[prevIndex];
      if (audioElement && targetItem.startSec !== undefined) {
        audioElement.currentTime = targetItem.startSec;
      }
      const isChorus = (prevIndex === 8) || (targetItem && targetItem.dramatic);
      triggerGlitch(isChorus ? 360 : 120, isChorus ? 0.9 : 0.35, isChorus);
      lastLyricIndex = prevIndex;
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    fitAsciiToScreen();
    playAudio();
  });

  // =========================================================================
  // 🔄 10. LOOP ANIMASI REAL-TIME: PENGGANTIAN LIRIK LANGSUNG (DIRECT CUT)
  // Dilengkapi efek glitch lirik instan, tanpa fade in, tanpa fade out
  // =========================================================================
  const updateLoop = (time) => {
    if (lastTime === 0) lastTime = time;
    const deltaTime = time - lastTime;
    lastTime = time;

    // Reduksi sisa waktu efek glitch
    if (glitchRemainingMs > 0) {
      glitchRemainingMs = Math.max(0, glitchRemainingMs - (deltaTime || 16));
    }

    if (!isPaused) {
      if (audioElement && !audioElement.paused && audioElement.duration > 0) {
        const curTime = audioElement.currentTime;

        // Loop otomatis di akhir Chorus 2 (Detik 202.5 / 03:22.5)
        if (config.audioEndTime && curTime >= config.audioEndTime) {
          if (config.isLooping) {
            audioElement.currentTime = config.audioStartTime;
            currentLyricIndex = 0;
            lastLyricIndex = -1;
          } else {
            isPaused = true;
            audioElement.pause();
          }
          return;
        }

        // Penggantian lirik langsung secara kontinu (Direct Cut)
        if (curTime >= 135.8) {
          for (let i = 0; i < config.lyrics.length; i++) {
            const item = config.lyrics[i];
            if (curTime >= item.startSec && curTime < item.endSec) {
              if (currentLyricIndex !== i) {
                currentLyricIndex = i;
                const isChorus = (i === 8) || (item && item.dramatic);
                if (isChorus) {
                  // Glitch intens Chorus 2 ("Maka jadikanku belalang sembah")
                  triggerGlitch(360, 0.9, true);
                } else {
                  // Glitch transisi lirik biasa
                  triggerGlitch(120, 0.35, false);
                }
                lastLyricIndex = i;
              }
              break;
            }
          }
        }
      } else {
        // Fallback timer jika audio belum dimulai: ganti lirik langsung tanpa jeda
        timeAccumulator += deltaTime;

        const currentLyric = config.lyrics[currentLyricIndex];
        if (timeAccumulator > (currentLyric ? currentLyric.showMs : 4000)) {
          timeAccumulator = 0;
          const nextIndex = (currentLyricIndex + 1) % config.lyrics.length;
          currentLyricIndex = nextIndex;
          const targetItem = config.lyrics[nextIndex];
          const isChorus = (nextIndex === 8) || (targetItem && targetItem.dramatic);
          triggerGlitch(isChorus ? 360 : 120, isChorus ? 0.9 : 0.35, isChorus);
          lastLyricIndex = nextIndex;
        }
      }
    }

    let curTime = config.audioStartTime;
    if (audioElement && !audioElement.paused && audioElement.duration > 0) {
      curTime = audioElement.currentTime;
    } else {
      const item = config.lyrics[currentLyricIndex];
      curTime = item ? item.startSec : config.audioStartTime;
    }

    const bass = getBassEnergy();

    // 1. Zona Intro Banner (Detik 133.0 s/d 135.8 = Menit 02:13)
    if (curTime < 135.8) {
      drawIntroScene(time, curTime, bass);
    } else {
      // 2. Zona Lirik: Langsung tampil tanpa jeda fade in / fade out
      const currentItem = config.lyrics[currentLyricIndex];
      if (currentItem) {
        drawLyricScene(currentItem, time, bass);
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
