/**
 * =========================================================================
 * BELALANG SEMBAH (.FEAST / HINDIA) - REAL-TIME COLORED ASCII LYRIC VISUALIZER
 * =========================================================================
 * File: visualizer.js
 * Deskripsi: Mesin Real-Time Pixel-to-ASCII Lyric Visualizer
 * - Formula Luminance Luma: luma = (r + g + b) / 3
 * - Noise Gate Hard Cutoff: BLACK_CUTOFF = 48 (menghilangkan kabut/fringe)
 * - Koreksi Gamma: GAMMA = 1.55 (menjaga rongga huruf terbuka & tajam)
 * - Palet Karakter Netral: [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"]
 * - letterSpacing 3.5px di Offscreen Canvas agar huruf tidak melebur jadi balok
 * - Layer Aura CSS terpisah di luar kanvas (zero leaking dots)
 */

(() => {
  // =========================================================================
  // 🎵 1. PANDUAN PENGATURAN LIRIK (VERSE 2 & CHORUS 2)
  // =========================================================================
  const config = {
    lyrics: [
      // --- MOMENT 1 (02:15.8 - 02:32.4): STALKER & OBSESI BUTA (VERSE 2A) ---
      {
        lines: ["Jumlah rambutmu", "'kan kuhafal mati"],
        startSec: 135.8,
        endSec: 139.6,
        showMs: 3800,
        hideMs: 400,
        color: "#ffffff",
        aura: "rgba(255, 42, 85, 0.16)"
      },
      {
        lines: ["Rute pulangmu", "telah kupelajari"],
        startSec: 140.0,
        endSec: 143.8,
        showMs: 3800,
        hideMs: 400,
        color: "#e0ffff",
        aura: "rgba(0, 240, 255, 0.14)"
      },
      {
        lines: ["Kutahu nama", "anak kita nanti"],
        startSec: 144.2,
        endSec: 147.8,
        showMs: 3600,
        hideMs: 400,
        color: "#fff8d6",
        aura: "rgba(255, 215, 0, 0.15)"
      },
      {
        lines: ["Suatu saat", "kau pasti mengerti"],
        startSec: 148.2,
        endSec: 152.0,
        showMs: 3800,
        hideMs: 400,
        color: "#ffffff",
        aura: "rgba(255, 0, 85, 0.16)"
      },

      // --- MOMENT 2 (02:32.4 - 02:49.0): KESENJANGAN SOSIAL & RADAR APLIKASI (VERSE 2B) ---
      {
        lines: ["Walau upahku", "dalam sebulan"],
        startSec: 152.4,
        endSec: 156.0,
        showMs: 3600,
        hideMs: 400,
        color: "#fef3c7",
        aura: "rgba(245, 158, 11, 0.15)"
      },
      {
        lines: ["Hanya porsimu", "dalam sehari"],
        startSec: 156.4,
        endSec: 160.4,
        showMs: 4000,
        hideMs: 400,
        color: "#ffffff",
        aura: "rgba(255, 23, 68, 0.16)"
      },
      {
        lines: ["Di dalam app", "kita bersimpangan"],
        startSec: 160.8,
        endSec: 164.8,
        showMs: 4000,
        hideMs: 400,
        color: "#ffffff",
        aura: "rgba(255, 0, 127, 0.16)"
      },
      {
        lines: ["Aku yakin", "kau bisa mengerti"],
        startSec: 164.8,
        endSec: 169.0,
        showMs: 4200,
        hideMs: 500,
        color: "#fff4d0",
        aura: "rgba(255, 208, 0, 0.18)"
      },

      // --- MOMENT 3 (02:49.5 - 03:08.6): KULTUS PEMUJAAN BELALANG SEMBAH (CHORUS 2) ---
      {
        lines: ["Maka jadikanku", "belalang sembah"],
        startSec: 169.5,
        endSec: 177.5,
        showMs: 8000,
        hideMs: 500,
        color: "#ffffff",
        aura: "rgba(255, 224, 102, 0.22)"
      },
      {
        lines: ["Walau sebentar", "kupercaya indah"],
        startSec: 178.0,
        endSec: 184.8,
        showMs: 6800,
        hideMs: 400,
        color: "#fff0f5",
        aura: "rgba(224, 170, 255, 0.16)"
      },
      {
        lines: ["Seberapa banyak,", "seberapa mahal"],
        startSec: 185.2,
        endSec: 188.6,
        showMs: 3400,
        hideMs: 400,
        color: "#fff8d6",
        aura: "rgba(250, 204, 21, 0.18)"
      },

      // --- MOMENT 4 (03:08.6 - 03:23.0): SUMPAH DARAH & PENGORBANAN FATAL ---
      {
        lines: ["Semua 'kan kuberi"],
        startSec: 189.0,
        endSec: 191.4,
        showMs: 2400,
        hideMs: 400,
        color: "#ffffff",
        aura: "rgba(255, 255, 255, 0.22)"
      },
      {
        lines: ["Semua 'kan kugadai"],
        startSec: 191.8,
        endSec: 194.2,
        showMs: 2400,
        hideMs: 400,
        color: "#ffdddd",
        aura: "rgba(255, 23, 68, 0.22)"
      },
      {
        lines: ["Matikan aku", "setelah usai"],
        startSec: 194.6,
        endSec: 198.0,
        showMs: 3400,
        hideMs: 500,
        color: "#ffffff",
        aura: "rgba(220, 38, 38, 0.22)"
      },
      {
        lines: ["Matikan aku", "setelah usai"],
        startSec: 198.5,
        endSec: 202.5,
        showMs: 4000,
        hideMs: 1000,
        color: "#f5e8ff",
        aura: "rgba(168, 85, 247, 0.16)"
      }
    ],

    audioStartTime: 133.0, // Mulai detik 133.0 (02:13.0) -> Banner Intro .Feast
    audioEndTime: 202.5,   // Selesai detik 202.5 (03:22.5) -> Loop kembali ke 02:13.0
    isLooping: true
  };

  // =========================================================================
  // ⚡ 2. PALET KARAKTER NETRAL & PARAMETER KETAJAMAN
  // =========================================================================
  // Simbol kepadatan simetris tanpa alfabet (W, M, B) agar tidak memicu interferensi kognitif
  const charsFixed = [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"];
  const charsLen = charsFixed.length;

  // Parameter Noise Gate & Gamma
  const BLACK_CUTOFF = 48; // Piksel redup < 48 langsung dipotong menjadi spasi murni
  const GAMMA = 1.55;      // Menekan anti-aliasing pinggir agar rongga 'a','e','o' tetap terbuka lebar

  // =========================================================================
  // 🎮 3. INISIALISASI OFFSCREEN CANVAS & DOM
  // =========================================================================
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });

  canvas.width = 180;  // 180 kolom karakter
  canvas.height = 75;  // 75 baris karakter

  const asciiContainer = document.getElementById("ascii-container");
  const bgAura = document.getElementById("bg-aura");
  const outputWrapper = document.getElementById("output-wrapper");
  const audioElement = document.getElementById("audio-player");

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
  // Menyeimbangkan rasio monospace agar setiap sel karakter menjadi kotak presisi
  // =========================================================================
  const fitAsciiToScreen = () => {
    if (!asciiContainer) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // Kompensasi rasio monospace: line-height = 0.65 * fontSize
    const fontSizeByH = (vh * 0.94) / (canvas.height * 0.65);
    const fontSizeByW = (vw * 0.94) / (canvas.width * 0.60);
    const fontSize = Math.floor(Math.min(fontSizeByH, fontSizeByW));
    const lineHeight = (fontSize * 0.65).toFixed(1);

    asciiContainer.style.fontSize = `${fontSize}px`;
    asciiContainer.style.lineHeight = `${lineHeight}px`;
    asciiContainer.style.letterSpacing = "0.5px";

    const rows = document.querySelectorAll(".ascii-row");
    rows.forEach(r => {
      r.style.height = `${lineHeight}px`;
    });
  };

  window.addEventListener("resize", fitAsciiToScreen);

  // =========================================================================
  // 🏛️ 5. INTRO BANNER RESMI .FEAST (DETIK 133.0 - 135.8 / 02:13.0)
  // =========================================================================
  const drawIntroScene = (time, curTime, bass) => {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;

    // Wajib hitam murni tanpa gradien agar tidak bocor titik-titik (.)
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // 1. Judul Atas
    ctx.fillStyle = "#ffffff";
    ctx.font = '700 10px "Space Grotesk", "Inter", sans-serif';
    if ('letterSpacing' in ctx) ctx.letterSpacing = "2px";
    ctx.fillText("B E L A L A N G   S E M B A H", cx, 10);

    // 2. Cover Art Tengah
    const imgSize = 34;
    const imgX = cx - (imgSize / 2);
    const imgY = 16;

    if (coverImg.complete && coverImg.naturalWidth > 0) {
      ctx.drawImage(coverImg, imgX, imgY, imgSize, imgSize);
    } else {
      ctx.fillStyle = "#ffe066";
      ctx.beginPath();
      ctx.arc(cx, imgY + 17, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    // Bingkai Sudut Emas
    ctx.strokeStyle = "#ffd700";
    ctx.lineWidth = 1;
    const pad = 2;
    const bx = imgX - pad, by = imgY - pad, bw = imgSize + pad * 2, bh = imgSize + pad * 2, bLen = 5;
    ctx.beginPath();
    ctx.moveTo(bx, by + bLen); ctx.lineTo(bx, by); ctx.lineTo(bx + bLen, by);
    ctx.moveTo(bx + bw - bLen, by); ctx.lineTo(bx + bw, by); ctx.lineTo(bx + bw, by + bLen);
    ctx.moveTo(bx, by + bh - bLen); ctx.lineTo(bx, by + bh); ctx.lineTo(bx + bLen, by + bh);
    ctx.moveTo(bx + bw - bLen, by + bh); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx + bw, by + bh - bLen);
    ctx.stroke();

    // 3. Subtitle Bawah
    ctx.font = '700 9px "Space Grotesk", "Inter", sans-serif';
    ctx.fillStyle = "#ff2a55";
    ctx.fillText(". F E A S T", cx, 63);

    ctx.restore();
  };

  // =========================================================================
  // ✍️ 6. RENDER TEKS LIRIK KE OFFSCREEN CANVAS
  // =========================================================================
  const drawLyricsToOffscreen = (lines, color = "#ffffff") => {
    const w = canvas.width;
    const h = canvas.height;

    // Bersihkan kanvas dengan hitam murni (JANGAN gambar gradien/blur di sini)
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, w, h);

    // Ukuran font tebal & bersih agar rongga huruf (counter) terbuka lebar
    const fontSize = lines.length > 1 ? 23 : 27;
    ctx.font = `800 ${fontSize}px "Space Grotesk", "Inter", Arial, sans-serif`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // PENTING: Jarak antar huruf agar tidak melebur jadi balok bata
    if ('letterSpacing' in ctx) {
      ctx.letterSpacing = "3.5px";
    }

    // Bebas shadowBlur agar pinggiran huruf tajam
    ctx.shadowBlur = 0;

    const lineSpacing = fontSize * 1.15;
    const totalHeight = (lines.length - 1) * lineSpacing;
    const startY = (h / 2) - (totalHeight / 2);

    lines.forEach((line, index) => {
      ctx.save();
      const yPos = startY + (index * lineSpacing);
      ctx.translate(w / 2, yPos);
      // Skala vertikal 1.15x untuk mengompensasi rasio tinggi font ASCII
      ctx.scale(1, 1.15);
      ctx.fillText(line, 0, 0);
      ctx.restore();
    });
  };

  // =========================================================================
  // ⚡ 7. MESIN UTAMA PIXEL-TO-ASCII (LUMINANCE, GAMMA, & HARD CUTOFF)
  // =========================================================================
  const updateAscii = () => {
    const w = canvas.width;
    const h = canvas.height;
    const imgData = ctx.getImageData(0, 0, w, h).data;

    let htmlOutput = "";

    for (let y = 0; y < h; y++) {
      let rowHtml = '<div class="ascii-row">';
      let emptySpaceBuffer = "";

      for (let x = 0; x < w; x++) {
        const idx = (y * w + x) * 4;
        const r = imgData[idx];
        const g = imgData[idx + 1];
        const b = imgData[idx + 2];

        // 1. Hitung Luminance rata-rata (0 - 255)
        const luma = (r + g + b) / 3;

        // 2. Hard Cutoff (Noise Gate): Potong anti-aliasing redup & artefak
        if (luma < BLACK_CUTOFF) {
          emptySpaceBuffer += " ";
          continue;
        }

        // Tuangkan akumulasi spasi kosong sebelum karakter menyala
        if (emptySpaceBuffer.length > 0) {
          rowHtml += emptySpaceBuffer;
          emptySpaceBuffer = "";
        }

        // 3. Normalisasi (0.0 - 1.0) + Koreksi Kurva Gamma untuk menajamkan tepi
        const normalized = (luma - BLACK_CUTOFF) / (255 - BLACK_CUTOFF);
        const gammaCorrected = Math.pow(normalized, GAMMA);

        // 4. Petakan ke indeks karakter netral (1 sampai charsLen - 1)
        let charIndex = Math.floor(gammaCorrected * (charsLen - 1)) + 1;
        if (charIndex >= charsLen) charIndex = charsLen - 1;

        const char = charsFixed[charIndex];

        // 5. Render karakter dengan warna asli piksel
        rowHtml += `<span style="color:rgb(${r},${g},${b})">${char}</span>`;
      }

      rowHtml += "</div>";
      htmlOutput += rowHtml;
    }

    asciiContainer.innerHTML = htmlOutput;
  };

  // =========================================================================
  // 🎵 8. SISTEM PEMUTARAN AUDIO & KENDALI NAVIGASI
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
  // 🔄 9. LOOP ANIMASI REAL-TIME (60 FPS)
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
      if (bgAura) bgAura.style.background = "radial-gradient(circle, rgba(255, 215, 0, 0.14) 0%, rgba(0, 0, 0, 0) 70%)";
      drawIntroScene(time, curTime, bass);
    } else {
      // 2. Zona Lirik dengan Teks Tajam
      if (isShowing) {
        const currentItem = config.lyrics[currentLyricIndex];
        if (currentItem) {
          if (bgAura && currentItem.aura) {
            bgAura.style.background = `radial-gradient(circle, ${currentItem.aura} 0%, rgba(0, 0, 0, 0) 70%)`;
          }
          drawLyricsToOffscreen(currentItem.lines, currentItem.color || "#ffffff");
        }
      } else {
        // Jeda gelap antar lirik: layar hitam murni
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }

    // 3. Konversi Offscreen Canvas ke Colored ASCII Terminal Art
    updateAscii();

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
