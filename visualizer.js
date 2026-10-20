/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - COLORED ASCII LYRIC VISUALIZER
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Real-Time Pixel-to-ASCII Lyric Visualizer
 * - Spacing antar karakter rapat & padat (tanpa renggang / gap besar).
 * - Teks lirik stabil & solid di tengah layar (tanpa goyangan rumput).
 * - Ukuran font lirik diperbesar secara proporsional agar sangat jelas terbaca.
 * - Tema font khusus terkurasi per baris lirik.
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (VERSE 2 & CHORUS 2) DENGAN TEMA FONT KHUSUS
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
        // Tema: Obsesi intim, fragil, mengerikan, bisikan gila
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic 700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff2a55", "#8b5cf6"],
          halo: "rgba(255, 42, 85, 0.22)",
          spark: "#ff4081"
        }
      },
      {
        text: "Rute pulangmu telah kupelajari",
        startSec: 140.0,
        endSec: 143.8,
        showMs: 3800,
        hideMs: 400,
        // Tema: Stalking teknikal, GPS surveillance terminal
        fontFamily: "'JetBrains Mono', monospace",
        fontStyle: "700",
        fontSize: 17,
        palette: {
          core: "#e0ffff",
          gradient: ["#ffffff", "#00f0ff", "#00e5a3"],
          halo: "rgba(0, 240, 255, 0.20)",
          spark: "#00f0ff"
        }
      },
      {
        text: "Kutahu nama anak kita nanti",
        startSec: 144.2,
        endSec: 147.8,
        showMs: 3600,
        hideMs: 400,
        // Tema: Khayalan delusif pernikahan sepihak, ilusi sakral
        fontFamily: "'Cinzel', serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#fffdf0",
          gradient: ["#ffffff", "#ffd700", "#ff8fab"],
          halo: "rgba(255, 215, 0, 0.22)",
          spark: "#ffd700"
        }
      },
      {
        text: "Suatu saat kau pasti mengerti",
        startSec: 148.2,
        endSec: 152.0,
        showMs: 3800,
        hideMs: 400,
        // Tema: Keyakinan hipnotik, desakan psikologis mantap
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff0055", "#b3003b"],
          halo: "rgba(255, 0, 85, 0.24)",
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
        // Tema: Kenyataan pahit kelas pekerja, peluh keringat, berat
        fontFamily: "'Anton', sans-serif",
        fontStyle: "700",
        fontSize: 19,
        palette: {
          core: "#fef3c7",
          gradient: ["#ffffff", "#f59e0b", "#b45309"],
          halo: "rgba(245, 158, 11, 0.22)",
          spark: "#f59e0b"
        }
      },
      {
        text: "Hanya porsimu dalam sehari",
        startSec: 156.4,
        endSec: 160.4,
        showMs: 4000,
        hideMs: 400,
        // Tema: Jurang kesenjangan sosial, tamparan realita
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff1744", "#7f1d1d"],
          halo: "rgba(255, 23, 68, 0.22)",
          spark: "#ff1744"
        }
      },
      {
        text: "Di dalam app kita bersimpangan",
        startSec: 160.8,
        endSec: 164.8,
        showMs: 4000,
        hideMs: 400,
        // Tema: Algoritma kencan semu, glitch layar sentuh digital
        fontFamily: "'DotGothic16', monospace",
        fontStyle: "700",
        fontSize: 17,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ff007f", "#7928ca"],
          halo: "rgba(255, 0, 127, 0.24)",
          spark: "#00f5d4"
        }
      },
      {
        text: "Aku yakin kau bisa mengerti",
        startSec: 164.8,
        endSec: 169.0,
        showMs: 4200,
        hideMs: 500,
        // Tema: Puncak desakan putus asa sebelum meledak ke chorus
        fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffd000", "#ff2a55"],
          halo: "rgba(255, 208, 0, 0.26)",
          spark: "#ffd000"
        }
      },

      // --- MOMENT 3 (02:49.5 - 03:08.6): KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
      {
        text: "Maka jadikanku belalang sembah",
        startSec: 169.5,
        endSec: 177.5,
        showMs: 8000,
        hideMs: 500,
        // Tema: CHORUS KLIMAKS! Ritual sakral penyembahan dan pengorbanan suci
        fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
        fontStyle: "900",
        fontSize: 19,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffe066", "#ff1744"],
          halo: "rgba(255, 224, 102, 0.30)",
          spark: "#ffe066"
        }
      },
      {
        text: "Walau sebentar kupercaya indah",
        startSec: 178.0,
        endSec: 184.8,
        showMs: 6800,
        hideMs: 400,
        // Tema: Keindahan fana yang puitis dan tragis
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic 700",
        fontSize: 18,
        palette: {
          core: "#fff5f5",
          gradient: ["#ffffff", "#e0aaff", "#f472b6"],
          halo: "rgba(224, 170, 255, 0.22)",
          spark: "#e0aaff"
        }
      },
      {
        text: "Seberapa banyak, seberapa mahal",
        startSec: 185.2,
        endSec: 188.6,
        showMs: 3400,
        hideMs: 400,
        // Tema: Transaksi keputusasaan materiil demi pemujaan
        fontFamily: "'Space Grotesk', sans-serif",
        fontStyle: "700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#facc15", "#f97316"],
          halo: "rgba(250, 204, 21, 0.26)",
          spark: "#facc15"
        }
      },

      // --- MOMENT 4 (03:08.6 - 03:23.0): SUMPAH DARAH & PENGORBANAN FATAL ---
      {
        text: "Semua 'kan kuberi",
        startSec: 189.0,
        endSec: 191.4,
        showMs: 2400,
        hideMs: 400,
        // Tema: Hentakan penyerahan total tanpa sisa (1 Baris Besar)
        fontFamily: "'Anton', sans-serif",
        fontStyle: "700",
        fontSize: 22,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#ffffff", "#ff1744"],
          halo: "rgba(255, 255, 255, 0.28)",
          spark: "#ff1744"
        }
      },
      {
        text: "Semua 'kan kugadai",
        startSec: 191.8,
        endSec: 194.2,
        showMs: 2400,
        hideMs: 400,
        // Tema: Taruhan terakhir menggadaikan eksistensi (1 Baris Besar)
        fontFamily: "'Anton', sans-serif",
        fontStyle: "700",
        fontSize: 22,
        palette: {
          core: "#ffdddd",
          gradient: ["#ffffff", "#ff1744", "#990000"],
          halo: "rgba(255, 23, 68, 0.30)",
          spark: "#ff1744"
        }
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 194.6,
        endSec: 198.0,
        showMs: 3400,
        hideMs: 500,
        // Tema: Ekstasi kanibalisme fatal belalang sembah betina
        fontFamily: "'Cinzel', serif",
        fontStyle: "900",
        fontSize: 19,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#dc2626", "#570026"],
          halo: "rgba(220, 38, 38, 0.30)",
          spark: "#dc2626"
        }
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 198.5,
        endSec: 202.5,
        showMs: 4000,
        hideMs: 1000,
        // Tema: Outro peleburan damai menjadi abu dan ketiadaan
        fontFamily: "'Playfair Display', serif",
        fontStyle: "italic 700",
        fontSize: 18,
        palette: {
          core: "#ffffff",
          gradient: ["#ffffff", "#a855f7", "#fda4af"],
          halo: "rgba(168, 85, 247, 0.24)",
          spark: "#a855f7"
        }
      }
    ],

    audioStartTime: 133.0, // Mulai detik 133.0 (02:13.0) -> Jeda 2.8 detik untuk Intro Logo & Judul
    audioEndTime: 202.5,   // Selesai detik 202.5 (03:22.5) -> Loop kembali ke 02:13.0
    isLooping: true
  };

  // =========================================================================
  // ⚡ 2. KARAKTER SHIMMER & KAMUS TINGKAT KECERAHAN ASCII
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

  // Resolusi Offscreen Grid ASCII (140 kolom x 52 baris): Proporsi Rapat & Huruf Besar
  const cols = 140;
  const rows = 52;
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
  // 📐 4. SISTEM ADAPTIF UKURAN LAYAR PENUH (RAPAT TANPA SPASI RENGGANG)
  // =========================================================================
  const fitAsciiToScreen = () => {
    if (!asciiContainer) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Aspek rasio monospace murni tanpa spasi tambahan (lebar ~ 0.60 tinggi)
    const charH = (vh * 0.92) / rows;
    const charW = (vw * 0.92) / (cols * 0.60);
    const fontSize = Math.floor(Math.min(charH, charW));

    asciiContainer.style.fontSize = `${fontSize}px`;
    asciiContainer.style.lineHeight = `${Math.floor(fontSize * 0.96)}px`;
    asciiContainer.style.letterSpacing = "0px"; // Nol spasi: karakter rapat & menyatu
  };

  window.addEventListener("resize", fitAsciiToScreen);
  fitAsciiToScreen();

  // =========================================================================
  // 🌟 5. SIMULASI PARTIKEL POINTILLISM LEMBUT DI LATAR BELAKANG
  // =========================================================================
  const numSparks = 24;
  const sparkParticles = [];
  for (let i = 0; i < numSparks; i++) {
    sparkParticles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.12 + Math.random() * 0.20,
      phase: Math.random() * Math.PI * 2,
      size: 1,
      life: Math.random()
    });
  }

  const updateAndDrawSparks = (time, baseColor) => {
    offCtx.save();
    for (let i = 0; i < numSparks; i++) {
      const p = sparkParticles[i];
      p.y -= p.speed;
      p.x += Math.sin(time * 0.0015 + p.phase) * 0.2;
      p.life = (p.life + 0.008) % 1.0;

      if (p.y < 0) {
        p.y = height + 2;
        p.x = Math.random() * width;
      }

      const alpha = Math.sin(p.life * Math.PI) * 0.45;
      if (alpha > 0.05) {
        offCtx.fillStyle = baseColor || "rgba(255, 255, 255, 0.35)";
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

    updateAndDrawSparks(time, "rgba(255, 215, 0, 0.35)");

    offCtx.save();
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    // 1. Judul Atas
    offCtx.fillStyle = "#ffffff";
    offCtx.font = "bold 11px 'Space Grotesk', sans-serif";
    offCtx.fillText("B E L A L A N G   S E M B A H", cx, 8);

    // 2. Cover Art / Logo Tengah (Ukuran 30x30 piksel)
    const imgSize = 28;
    const imgX = cx - (imgSize / 2);
    const imgY = 13;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      offCtx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
    } else {
      offCtx.fillStyle = "#ffe066";
      offCtx.beginPath();
      offCtx.arc(cx, imgY + 14, 10, 0, Math.PI * 2);
      offCtx.fill();
    }

    // Bingkai Ornamen Sudut Emas
    offCtx.strokeStyle = "#ffd700";
    offCtx.lineWidth = 1;
    const pad = 2;
    const bx = imgX - pad;
    const by = imgY - pad;
    const bw = imgSize + pad * 2;
    const bh = imgSize + pad * 2;
    const bLen = 4;

    offCtx.beginPath();
    offCtx.moveTo(bx, by + bLen); offCtx.lineTo(bx, by); offCtx.lineTo(bx + bLen, by);
    offCtx.moveTo(bx + bw - bLen, by); offCtx.lineTo(bx + bw, by); offCtx.lineTo(bx + bw, by + bLen);
    offCtx.moveTo(bx, by + bh - bLen); offCtx.lineTo(bx, by + bh); offCtx.lineTo(bx + bLen, by + bh);
    offCtx.moveTo(bx + bw - bLen, by + bh); offCtx.lineTo(bx + bw, by + bh); offCtx.lineTo(bx + bw, by + bh - bLen);
    offCtx.stroke();

    // 3. Subtitle Bawah
    offCtx.font = "bold 9px 'Space Grotesk', sans-serif";
    offCtx.fillStyle = "#ff2a55";
    offCtx.fillText(". F E A S T", cx, 46);

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 7. RENDER TEKS LIRIK STABIL & SOLID (DEAD-CENTER, TANPA GOYANGAN RUMPUT)
  // =========================================================================
  const drawLyricScene = (item, time, bass) => {
    if (!item || !item.text) return;

    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    const text = item.text.trim();
    const words = text.split(" ");
    const cx = width / 2;
    const cy = height / 2;

    // Ethereal Aura Lembut di Belakang Lirik
    if (item.palette && item.palette.halo) {
      const haloGrad = offCtx.createRadialGradient(cx, cy, 2, cx, cy, 46);
      haloGrad.addColorStop(0, item.palette.halo);
      haloGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      offCtx.fillStyle = haloGrad;
      offCtx.fillRect(0, 0, width, height);
    }

    // Partikel bara api latar
    updateAndDrawSparks(time, item.palette ? item.palette.spark : null);

    // Pembagian baris lirik otomatis agar proporsional dan tidak terpotong
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

    const baseSize = item.fontSize || 18;
    const maxW = width * 0.94; // Batas aman lebar teks kanvas

    if (lines.length === 1) {
      let size = baseSize;
      offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
      let textW = offCtx.measureText(lines[0]).width;
      if (textW > maxW) {
        size = Math.floor(size * (maxW / textW));
        offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
      }

      // Pewarnaan Gradasi Lirik
      const p = item.palette;
      const grad = offCtx.createLinearGradient(cx - (textW / 2), cy - 8, cx + (textW / 2), cy + 8);
      if (p && p.gradient && p.gradient.length >= 3) {
        grad.addColorStop(0, p.gradient[1]);
        grad.addColorStop(0.5, p.gradient[0]);
        grad.addColorStop(1, p.gradient[2]);
      } else {
        grad.addColorStop(0, "#ff2a55");
        grad.addColorStop(0.5, "#ffffff");
        grad.addColorStop(1, "#8b5cf6");
      }
      offCtx.fillStyle = grad;
      // Posisi DIAM KOKOH di tengah layar (tanpa goyangan)
      offCtx.fillText(lines[0], cx, cy);
    } else {
      let size = baseSize;
      offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
      const w1 = offCtx.measureText(lines[0]).width;
      const w2 = offCtx.measureText(lines[1]).width;
      const maxLineWidth = Math.max(w1, w2);
      if (maxLineWidth > maxW) {
        size = Math.floor(size * (maxW / maxLineWidth));
        offCtx.font = `${item.fontStyle || '700'} ${size}px ${item.fontFamily}`;
      }

      const p = item.palette;
      const grad1 = offCtx.createLinearGradient(cx - (w1 / 2), cy - 14, cx + (w1 / 2), cy - 2);
      const grad2 = offCtx.createLinearGradient(cx - (w2 / 2), cy + 2, cx + (w2 / 2), cy + 14);
      if (p && p.gradient && p.gradient.length >= 3) {
        grad1.addColorStop(0, p.gradient[1]); grad1.addColorStop(0.5, p.gradient[0]); grad1.addColorStop(1, p.gradient[2]);
        grad2.addColorStop(0, p.gradient[2]); grad2.addColorStop(0.5, p.gradient[0]); grad2.addColorStop(1, p.gradient[1]);
      } else {
        grad1.addColorStop(0, "#ff2a55"); grad1.addColorStop(0.5, "#ffffff"); grad1.addColorStop(1, "#8b5cf6");
        grad2.addColorStop(0, "#8b5cf6"); grad2.addColorStop(0.5, "#ffffff"); grad2.addColorStop(1, "#ff2a55");
      }

      const lineSpacing = size * 1.05;
      // Posisi DIAM KOKOH di tengah layar (tanpa goyangan)
      offCtx.fillStyle = grad1;
      offCtx.fillText(lines[0], cx, cy - (lineSpacing / 2));
      offCtx.fillStyle = grad2;
      offCtx.fillText(lines[1], cx, cy + (lineSpacing / 2));
    }

    offCtx.restore();
  };

  // =========================================================================
  // ⚡ 8. MESIN UTAMA PIXEL-TO-ASCII (RAPAT, TENANG, & SANGAT MUDAH DIBACA)
  // =========================================================================
  const updateAsciiMatrix = (time) => {
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

        // Piksel gelap langsung spasi murni tanpa tag <span>
        if (c < 24) {
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

          // Shimmer tenang: Tidak bergetar liar tiap frame, melainkan berpendar stabil
          let char;
          if (isGlitchActive && Math.random() < 0.2) {
            const glitchGlyphs = ["†", "‡", "§", "ø", "X", "✦", "#", "!", "?"];
            char = glitchGlyphs[(x + y) % glitchGlyphs.length];
          } else {
            char = Array.isArray(result)
              ? result[(x * 3 + y * 7 + Math.floor(time * 0.002)) % result.length]
              : result;
          }

          // Kuantisasi warna halus agar rangkaian karakter digabung (Run-Length Grouping)
          const qr = Math.round(r / 5) * 5;
          const qg = Math.round(g / 5) * 5;
          const qb = Math.round(b / 5) * 5;
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
        // Jeda gelap antar lirik: layar hitam dengan bara redup melayang
        offCtx.fillStyle = "#000000";
        offCtx.fillRect(0, 0, width, height);
        updateAndDrawSparks(time, "rgba(255, 42, 85, 0.2)");
      }
    }

    // 3. Konversi Offscreen Canvas ke Colored ASCII Terminal Art
    updateAsciiMatrix(time);

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
