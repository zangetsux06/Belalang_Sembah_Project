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
      // Lirik bisik-bisik: SEMUA MERAH SOLID (#ff1744) sesuai permintaan user
      {
        text: "Jumlah rambutmu 'kan kuhafal mati",
        startSec: 135.8,
        endSec: 140.0,
        showMs: 4200,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ff1744"
      },
      {
        text: "Rute pulangmu telah kupelajari",
        startSec: 140.0,
        endSec: 144.2,
        showMs: 4200,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ff1744"
      },
      {
        text: "Kutahu nama anak kita nanti",
        startSec: 144.2,
        endSec: 148.2,
        showMs: 4000,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ff1744"
      },
      {
        text: "Suatu saat kau pasti mengerti",
        startSec: 148.2,
        endSec: 152.4,
        showMs: 4200,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ff1744"
      },

      // --- MOMENT 2 (02:32.4 - 02:49.0): KESENJANGAN SOSIAL & RADAR APLIKASI (VERSE 2B) ---
      {
        text: "Walau upahku dalam sebulan",
        startSec: 152.4,
        endSec: 156.4,
        showMs: 4000,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ffffff"
      },
      {
        text: "Hanya porsimu dalam sehari",
        startSec: 156.4,
        endSec: 160.8,
        showMs: 4400,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ffffff"
      },
      {
        text: "Di dalam app kita bersimpangan",
        startSec: 160.8,
        endSec: 164.8,
        showMs: 4000,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ffffff"
      },
      {
        text: "Aku yakin kau bisa mengerti",
        startSec: 164.8,
        endSec: 169.5,
        showMs: 4700,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ffffff"
      },

      // --- MOMENT 3 (02:49.5 - 03:08.6): KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
      // Bagian 1: "Maka jadikanku" - Warna putih solid normal membangun tensi
      {
        text: "Maka jadikanku",
        startSec: 169.5,
        endSec: 173.0,
        showMs: 3500,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 16,
        color: "#ffffff"
      },
      // Bagian 2: "Belalang Sembah" - KLIMAKS DROP MERAH DARAH & EFEK BERDARAH (DARI B SAMPAI h)!
      {
        text: "Belalang Sembah",
        startSec: 173.0,
        endSec: 178.0,
        showMs: 5000,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ff1744",
        singleLine: true,
        dramatic: true,
        bleeding: true
      },
      {
        text: "Walau sebentar kupercaya indah",
        startSec: 178.0,
        endSec: 185.2,
        showMs: 7200,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ff1744"
      },
      {
        text: "Seberapa banyak, seberapa mahal",
        startSec: 185.2,
        endSec: 189.0,
        showMs: 3800,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 14,
        color: "#ff1744"
      },

      // --- MOMENT 4 (03:08.6 - 03:23.0): SUMPAH DARAH & PENGORBANAN FATAL ---
      {
        text: "Semua 'kan kuberi",
        startSec: 189.0,
        endSec: 191.8,
        showMs: 2800,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 16,
        color: "#ff1744"
      },
      {
        text: "Semua 'kan kugadai",
        startSec: 191.8,
        endSec: 194.6,
        showMs: 2800,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 16,
        color: "#ff1744"
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 194.6,
        endSec: 198.5,
        showMs: 3900,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 15,
        color: "#e60026"
      },
      {
        text: "Matikan aku setelah usai",
        startSec: 198.5,
        endSec: 202.5,
        showMs: 4000,
        fontFamily: '"Space Grotesk", "Arial", sans-serif',
        fontStyle: "700",
        fontSize: 15,
        color: "#d90429"
      }
    ],

    audioStartTime: 133.0, // Mulai detik 133.0 (02:13.0) -> Intro Banner Resmi
    audioEndTime: 202.5,   // Selesai detik 202.5 (03:22.5) -> Loop kembali
    isLooping: true
  };

  // =========================================================================
  // ⚡ 2. KARAKTER SHIMMER & KAMUS TINGKAT KECERAHAN ASCII (SPEK REFERENSI BERSIH)
  // Karakter seimbang, bersih, tidak terlalu tebal atau berhimpitan
  // =========================================================================
  const charsFixed = [
    " ", ".", ":", "-", "=", "+", "i", "s", "c", "!", "?",
    "0", "1", "2", "3", "4", "5", "6",
    ["8", "9"],
    ["@", "#"],
    ["X", "Y", "Z"],
    ["#", "%", "*"]
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
  // 🩸 5B. SIMULASI EFEK BERDARAH REALISTIK (LETTER-ANCHORED ASCII BLOOD DRIPS)
  // Menetes murni dari bagian bawah goresan huruf "Belalang Sembah" (dari B ke h)
  // Dilengkapi fisika gravitasi halus, motion stretch, dan pooling dasar
  // =========================================================================
  const maxBloodDrips = 26;
  const bloodDrips = [];
  const floorPool = new Uint8Array(width);

  for (let i = 0; i < maxBloodDrips; i++) {
    bloodDrips.push({
      targetRatio: (i + Math.random() * 0.7) / maxBloodDrips,
      anchorX: 0,
      anchorY: 0,
      streamLen: Math.random() * 3,
      maxStreamLen: 5 + Math.random() * 14,
      streamSpeed: 0.09 + Math.random() * 0.14,
      dropActive: false,
      dropY: 0,
      dropVy: 0,
      color: Math.random() < 0.7 ? "#ff1744" : (Math.random() < 0.5 ? "#d90429" : "#ff2a55")
    });
  }

  const resetBloodDrips = () => {
    for (let i = 0; i < bloodDrips.length; i++) {
      const d = bloodDrips[i];
      d.targetRatio = (i + Math.random() * 0.7) / bloodDrips.length;
      d.streamLen = Math.random() * 2;
      d.maxStreamLen = 5 + Math.random() * 14;
      d.dropActive = false;
      d.dropY = 0;
      d.dropVy = 0;
    }
    floorPool.fill(0);
  };

  const updateAndDrawBloodDrips = (time, textCenterX, textCenterY, size, textW) => {
    const textLeft = Math.max(1, Math.floor(textCenterX - textW / 2));
    const textRight = Math.min(width - 2, Math.ceil(textCenterX + textW / 2));
    const scanTop = Math.max(0, Math.floor(textCenterY - size * 0.45));
    const scanBottom = Math.min(height - 1, Math.ceil(textCenterY + size * 0.85));
    const scanW = textRight - textLeft + 1;
    const scanH = scanBottom - scanTop + 1;

    if (scanW <= 0 || scanH <= 0) return;

    let imgData;
    try {
      imgData = offCtx.getImageData(textLeft, scanTop, scanW, scanH).data;
    } catch (e) {
      return;
    }

    // Pindai dasar huruf: cari piksel huruf paling bawah untuk setiap kolom X dari 'B' ke 'h'
    const validBottoms = [];
    for (let col = 0; col < scanW; col++) {
      const pxX = textLeft + col;
      for (let row = scanH - 1; row >= 0; row--) {
        const idx = (row * scanW + col) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        // Deteksi warna huruf merah (#ff1744: r > 120 dan r jauh lebih tinggi dari g)
        if (r > 120 && r > g + 25) {
          validBottoms.push({ x: pxX, bottomY: scanTop + row });
          break;
        }
      }
    }

    if (validBottoms.length === 0) return;

    offCtx.save();

    for (let i = 0; i < bloodDrips.length; i++) {
      const d = bloodDrips[i];
      const entryIdx = Math.min(
        Math.floor(d.targetRatio * validBottoms.length),
        validBottoms.length - 1
      );
      const col = validBottoms[entryIdx];
      d.anchorX = col.x;
      d.anchorY = col.bottomY;

      // 1. Aliran darah kental merembes memanjang ke bawah menempel pada dasar huruf
      if (d.streamLen < d.maxStreamLen) {
        d.streamLen += d.streamSpeed;
      } else if (!d.dropActive) {
        // Aliran meregang maksimal, tetesan darah putus & jatuh ke bawah
        d.dropActive = true;
        d.dropY = d.anchorY + d.streamLen;
        d.dropVy = 0.35 + Math.random() * 0.25;
        d.streamLen = Math.max(1, d.streamLen * 0.35); // Elastic snap-back
        d.maxStreamLen = 5 + Math.random() * 14;
      }

      // Gambar aliran darah vertikal menempel persis di bawah huruf
      const sLen = Math.floor(d.streamLen);
      if (sLen > 0) {
        offCtx.fillStyle = d.color;
        offCtx.fillRect(d.anchorX, d.anchorY + 1, 1, sLen);

        // Ujung bulir tetesan yang menggantung
        offCtx.fillStyle = "#ff2a55";
        offCtx.fillRect(d.anchorX, d.anchorY + sLen, 1, 1);
      }

      // 2. Partikel tetesan darah jatuh gravitasi (Smooth gravity acceleration)
      if (d.dropActive) {
        d.dropVy += 0.042; // Akselerasi gravitasi mulus ke bawah
        d.dropY += d.dropVy;

        const curDropY = Math.round(d.dropY);
        // Motion stretch: saat jatuh lebih cepat, partikel memanjang 1-2 piksel agar mulus di terminal ASCII
        const stretch = Math.min(2, Math.max(1, Math.round(d.dropVy * 0.85)));

        if (curDropY < height - 2) {
          offCtx.fillStyle = d.color;
          offCtx.fillRect(d.anchorX, curDropY, 1, stretch);
        } else {
          // Menyentuh lantai: tetesan menyerap ke genangan bawah dan reset
          if (d.anchorX >= 0 && d.anchorX < width) {
            floorPool[d.anchorX] = Math.min(3, (floorPool[d.anchorX] || 0) + 1);
          }
          d.dropActive = false;
          d.targetRatio = (Math.random() * 0.9 + (i / bloodDrips.length) * 0.1);
        }
      }
    }

    // 3. Efek genangan darah tipis organik di lantai (floor puddles)
    for (let x = 0; x < width; x++) {
      if (floorPool[x] > 0) {
        const pLvl = floorPool[x];
        offCtx.fillStyle = pLvl >= 2 ? "#b7094c" : "#89021b";
        offCtx.fillRect(Math.max(0, x - 1), height - 1, 3, 1);
        if (Math.random() < 0.015) {
          floorPool[x]--;
        }
      }
    }

    offCtx.restore();
  };

  // =========================================================================
  // 🏛️ 6. INTRO BANNER RESMI .FEAST (DETIK 133.0 - 135.8 / 02:13.0)
  // Format tajam, font seragam dengan lirik, banner terang jelas tidak gelap
  // =========================================================================
  const drawIntroScene = (time, curTime, bass) => {
    const cx = width / 2;

    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    // Ethereal white spark embers di latar
    updateAndDrawSparks(time, "rgba(255, 255, 255, 0.35)", 25);

    offCtx.save();
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    // 1. Judul Atas: Jelas, Putih Solid, Font Samakan dengan Lirik
    offCtx.font = '700 12px "Space Grotesk", "Arial", sans-serif';
    offCtx.fillStyle = "#ffffff";
    offCtx.fillText("BELALANG SEMBAH", cx, 9);

    // 2. Cover Art / Logo Tengah (38x38 piksel, Terang Jelas Tidak Gelap)
    const imgSize = 38;
    const imgX = Math.round(cx - (imgSize / 2));
    const imgY = 15;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      try {
        offCtx.filter = "brightness(2.6) contrast(1.15) saturate(1.3)";
      } catch (e) {}
      offCtx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
      offCtx.filter = "none";
    } else {
      offCtx.fillStyle = "#ffffff";
      offCtx.beginPath();
      offCtx.arc(cx, imgY + 18, 14, 0, Math.PI * 2);
      offCtx.fill();
    }

    // Bingkai Ornamen Sudut Putih Bersih
    offCtx.strokeStyle = "rgba(255, 255, 255, 0.85)";
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

    // 3. Subtitle Artis: Jelas, Putih Solid, Font Samakan dengan Lirik
    offCtx.font = '700 10px "Space Grotesk", "Arial", sans-serif';
    offCtx.fillStyle = "#ffffff";
    offCtx.fillText(". F E A S T", cx, 59);

    offCtx.restore();
  };

  // =========================================================================
  // ✍️ 7. RENDER TEKS LIRIK: WARNA SOLID BERSIH & EFEK BERDARAH CHORUS
  // Lirik biasa putih bersih, saat "Belalang sembah" warna merah darah berdarah
  // =========================================================================
  const drawLyricScene = (item, time, bass) => {
    if (!item || !item.text) return;

    // Latar belakang 100% hitam pekat murni tanpa noise
    offCtx.fillStyle = "#000000";
    offCtx.fillRect(0, 0, width, height);

    const text = item.text.trim();
    const cx = width / 2;
    const cy = height / 2;

    const swayX = Math.sin(time * 0.0018) * 1.3;
    const swayY = Math.cos(time * 0.0022) * 0.7;

    // Partikel bara api: putih bersih untuk lirik biasa, merah darah untuk lirik berdarah
    const isRedTheme = item.color === "#ff1744" || item.color === "#e60026" || item.color === "#d90429" || item.bleeding;
    const sparkColor = isRedTheme ? "#ff1744" : "rgba(255, 255, 255, 0.35)";
    updateAndDrawSparks(time, sparkColor, isRedTheme ? 40 : 20);

    offCtx.save();
    offCtx.textAlign = "center";
    offCtx.textBaseline = "middle";

    const maxW = width * 0.90;
    let size = item.fontSize || 14;
    const fontFam = item.fontFamily || '"Space Grotesk", "Arial", sans-serif';
    const fontSty = item.fontStyle || '700';
    offCtx.font = `${fontSty} ${size}px ${fontFam}`;

    // Word-wrapping dinamis: untuk baris singleLine/bleeding ("Belalang Sembah"), pertahankan 1 baris utuh
    let lines = [];
    if (item.singleLine || item.bleeding) {
      lines = [text];
      const lw = offCtx.measureText(text).width;
      if (lw > maxW) {
        size = Math.floor(size * (maxW / lw));
        offCtx.font = `${fontSty} ${size}px ${fontFam}`;
      }
    } else {
      const words = text.split(" ");
      let currentLine = words[0] || "";

      for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let w = offCtx.measureText(currentLine + " " + word).width;
        if (w < maxW) {
          currentLine += " " + word;
        } else {
          lines.push(currentLine);
          currentLine = word;
        }
      }
      lines.push(currentLine);

      // Auto-scale jika ada baris yang masih melebihi batas kanvas
      let maxLineWidth = 0;
      for (let i = 0; i < lines.length; i++) {
        const lw = offCtx.measureText(lines[i]).width;
        if (lw > maxLineWidth) maxLineWidth = lw;
      }
      if (maxLineWidth > maxW) {
        size = Math.floor(size * (maxW / maxLineWidth));
        offCtx.font = `${fontSty} ${size}px ${fontFam}`;
      }
    }

    const lineHeight = Math.round(size * 1.20);
    const totalHeight = lines.length * lineHeight;
    const startY = (height / 2) - (totalHeight / 2) + (lineHeight / 2) + swayY;

    // Warna solid tegas tanpa gradien: putih bersih untuk lirik biasa, merah darah untuk lirik berdarah
    const textColor = item.color || "#ffffff";
    offCtx.fillStyle = textColor;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineY = startY + (i * lineHeight);
      offCtx.fillText(line, cx + swayX, lineY);
    }

    // 🩸 Efek Berdarah (Blood Drips) presisi murni menetes dari huruf "Belalang Sembah" (B sampai h)
    if (item.bleeding) {
      const textW = offCtx.measureText(text).width;
      updateAndDrawBloodDrips(time, cx + swayX, startY, size, textW);
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
      if (!targetItem || !targetItem.bleeding) resetBloodDrips();
      const isChorus = Boolean(targetItem && (targetItem.dramatic || targetItem.bleeding));
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
      if (!targetItem || !targetItem.bleeding) resetBloodDrips();
      const isChorus = Boolean(targetItem && (targetItem.dramatic || targetItem.bleeding));
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
            resetBloodDrips();
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
                if (!item.bleeding) resetBloodDrips();
                const isChorus = Boolean(item && (item.dramatic || item.bleeding));
                if (isChorus) {
                  // Glitch intens Chorus 2 ("Belalang Sembah")
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
          if (!targetItem || !targetItem.bleeding) resetBloodDrips();
          const isChorus = Boolean(targetItem && (targetItem.dramatic || targetItem.bleeding));
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
