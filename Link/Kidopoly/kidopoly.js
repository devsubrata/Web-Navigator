"use strict";

// --------------------------------------------------
// DOM elements
// --------------------------------------------------

const categorySelect = document.querySelector("#categorySelect");
const episodeContainer = document.querySelector("#episodeContainer");
const categoryInfo = document.querySelector("#categoryInfo");

// --------------------------------------------------
// Initialize
// --------------------------------------------------

function init() {
    populateCategorySelect();

    categorySelect.addEventListener("change", () => {
        renderCategory(categorySelect.value);
    });

    const firstCategory = Object.keys(categories)[0];

    if (firstCategory) {
        categorySelect.value = firstCategory;
        renderCategory(firstCategory);
    }
}

// --------------------------------------------------
// Populate category select
// --------------------------------------------------

function populateCategorySelect() {
    categorySelect.innerHTML = "";

    Object.keys(categories).forEach((categoryName) => {
        const option = document.createElement("option");

        option.value = categoryName;
        option.textContent = `${categoryName}'s Not Boring`;

        categorySelect.appendChild(option);
    });
}

// --------------------------------------------------
// Render category
// --------------------------------------------------

function renderCategory(categoryName) {
    const episodes = categories[categoryName] || [];
    episodeContainer.innerHTML = "";
    categoryInfo.textContent = `${episodes.length} episode${episodes.length !== 1 ? "s" : ""}`;
    episodes.forEach((episode, index) => {
        const card = createEpisodeCard(episode, index);
        episodeContainer.appendChild(card);
    });
}

// --------------------------------------------------
// Create episode card
// --------------------------------------------------

function createEpisodeCard(episode, index) {
    const card = document.createElement("article");

    card.className = `
        group
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-[#fffbeb]
        shadow-sm
        transition-all
        duration-200
        hover:shadow-xl
    `;

    // ==================================================
    // HEADER
    // ==================================================
    const header = document.createElement("header");
    header.className = `border-b border-slate-100 px-5 py-4 sm:px-6 bg-emerald-50 flex justify-between`;

    const episodeNumber = document.createElement("div");
    episodeNumber.className = ` text-[17px] font-bold text-indigo-600 `;
    episodeNumber.textContent = episode.meta.number;

    const episodeMeta = document.createElement("div");
    episodeMeta.className = ` mt-1 flex items-center gap-2 text-sm text-slate-500 `;
    episodeMeta.innerHTML = `
        <span>🗓️${escapeHTML(episode.meta.date)}</span>
        <span>⏰${escapeHTML(episode.meta.duration)}</span>
    `;

    header.appendChild(episodeNumber);
    header.appendChild(episodeMeta);

    // ==================================================
    // IMAGE
    // ==================================================
    const imageWrapper = document.createElement("div");
    imageWrapper.className = ` flex w-full items-center justify-center bg-slate-50 p-3`;

    const image = document.createElement("img");
    image.src = episode.image.url;
    image.alt = episode.image.alt || `Artwork for ${episode.title}`;

    image.loading = "lazy";
    image.decoding = "async";

    // IMPORTANT:
    // object-contain keeps the entire image visible.
    // No cropping.
    image.className = ` block h-auto max-h-[500px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.01] rounded-[10px]`;
    imageWrapper.appendChild(image);

    // ==================================================
    // CONTENT
    // ==================================================
    const content = document.createElement("div");
    content.className = `p-5 pt-0`;

    // ==================================================
    // TITLE
    // ==================================================
    const title = document.createElement("h2");
    title.className = `text-[24px] font-bold leading-snug text-sky-900 text-center font-['Baloo_2',_cursive]`;
    title.innerHTML = `<a href=${episode.episode_url} target="_blank">${episode.title}</a>`;

    // ==================================================
    // AUDIO
    // ==================================================
    const audio = document.createElement("audio");
    audio.src = episode.audio.url;
    audio.preload = "metadata";

    // Do NOT use native controls.
    // The player below is completely custom.

    audio.className = "hidden";
    audio.setAttribute("aria-label", `Play ${episode.title}`);

    // ==================================================
    // CUSTOM PLAYER
    // ==================================================

    const player = document.createElement("div");
    player.className = `mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4`;

    // --------------------------------------------------
    // Time row
    // --------------------------------------------------
    const progressRow = document.createElement("div");
    progressRow.className = `flex items-center gap-3`;

    const currentTime = document.createElement("span");
    currentTime.className = `min-w-[42px] text-right text-xs font-medium tabular-nums text-slate-500`;
    currentTime.textContent = "0:00";

    // --------------------------------------------------
    // Progress bar
    // --------------------------------------------------
    const progress = document.createElement("input");

    progress.type = "range";
    progress.min = "0";
    progress.max = "100";
    progress.step = "0.1";
    progress.value = "0";

    progress.className = `h-2 min-w-0 flex-1 cursor-pointer accent-indigo-600`;
    progress.setAttribute("aria-label", "Audio progress");

    const totalTime = document.createElement("span");
    totalTime.className = `min-w-[42px] text-xs font-medium tabular-nums text-slate-500`;
    totalTime.textContent = "0:00";

    progressRow.appendChild(currentTime);
    progressRow.appendChild(progress);
    progressRow.appendChild(totalTime);

    // --------------------------------------------------
    // Main controls
    // --------------------------------------------------
    const controls = document.createElement("div");
    controls.className = `mt-2 flex items-center justify-center gap-1`;

    // --------------------------------------------------
    // Rewind
    // --------------------------------------------------
    const rewindButton = document.createElement("button");
    rewindButton.type = "button";
    rewindButton.className = `flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-indigo-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300`;
    rewindButton.innerHTML = `
        <span aria-hidden="true">↶</span>
        <span class="sr-only">Rewind 15 seconds</span>
    `;

    // --------------------------------------------------
    // Play / Pause
    // --------------------------------------------------
    const playButton = document.createElement("button");
    playButton.type = "button";
    playButton.className = ` flex h-9 min-w-28 items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300`;
    playButton.innerHTML = `
        <span class="play-icon" aria-hidden="true">▷</span>
        <span class="play-label">Play</span>
    `;

    // --------------------------------------------------
    // Forward
    // --------------------------------------------------
    const forwardButton = document.createElement("button");
    forwardButton.type = "button";
    forwardButton.className = `flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-indigo-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300`;
    forwardButton.innerHTML = `
        <span aria-hidden="true">↷</span>
        <span class="sr-only">Forward 15 seconds</span>
    `;

    const downloadButton = document.createElement("button");
    downloadButton.type = "button";
    downloadButton.className = `flex h-8 min-w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-indigo-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300`;
    downloadButton.textContent = `🢃`;
    downloadButton.onclick = async () => {
        const chars = {
            "?": "❓",
            ":": " ➜",
            "/": "⁄",
            "\\": "⧵",
            "*": "✱",
            "<": "‹",
            ">": "›",
            "|": "│",
            '"': "'",
        };

        // Start with the original episode title
        let fileName = episode.title;

        // Loop through each invalid character and replace all occurrences
        for (const [invalidChar, safeChar] of Object.entries(chars)) {
            fileName = fileName.replaceAll(invalidChar, safeChar);
        }

        console.log(fileName);

        // 🔥 Create spinner
        const originalText = downloadButton.innerHTML;
        downloadButton.disabled = true;
        downloadButton.innerHTML = `⏳ Downloading...`;

        try {
            const link = document.createElement("a");

            link.href = episode.audio.url;
            link.download = `${fileName}.mp3`;
            link.target = "_blank";

            document.body.appendChild(link);
            link.click();
            link.remove();

            downloadButton.innerHTML = "✅ Done!";
        } catch (error) {
            console.error("Download error:", error);
            downloadButton.innerHTML = "❌ Failed!";
        } finally {
            setTimeout(() => {
                downloadButton.innerHTML = originalText;
                downloadButton.disabled = false;
            }, 2000);
        }
    };

    const webSearch = document.createElement("a");
    webSearch.textContent = `🌐`;
    webSearch.href = `https://www.google.com/search?q=${episode.title}`;
    webSearch.target = "_blank";
    webSearch.className = `flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-100 hover:text-indigo-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-indigo-300 pointer focus:outline-none`;

    controls.appendChild(rewindButton);
    controls.appendChild(playButton);
    controls.appendChild(forwardButton);
    controls.appendChild(webSearch);
    controls.appendChild(downloadButton);

    // ==================================================
    // PLAYER EVENTS
    // ==================================================

    // --------------------------------------------------
    // Play / Pause
    // --------------------------------------------------

    playButton.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    });

    // --------------------------------------------------
    // Rewind 15 seconds
    // --------------------------------------------------

    rewindButton.addEventListener("click", () => {
        audio.currentTime = Math.max(0, audio.currentTime - 15);
    });

    // --------------------------------------------------
    // Forward 15 seconds
    // --------------------------------------------------

    forwardButton.addEventListener("click", () => {
        if (!Number.isFinite(audio.duration)) {
            return;
        }

        audio.currentTime = Math.min(audio.duration, audio.currentTime + 15);
    });

    // --------------------------------------------------
    // Progress bar seeking
    // --------------------------------------------------

    progress.addEventListener("input", () => {
        if (!Number.isFinite(audio.duration)) {
            return;
        }

        const percentage = Number(progress.value);

        audio.currentTime = (percentage / 100) * audio.duration;
    });

    // --------------------------------------------------
    // Update progress
    // --------------------------------------------------

    audio.addEventListener("timeupdate", () => {
        if (!Number.isFinite(audio.duration)) return;
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.value = percentage;
        currentTime.textContent = formatTime(audio.currentTime);
    });

    // --------------------------------------------------
    // Metadata loaded
    // --------------------------------------------------

    audio.addEventListener("loadedmetadata", () => {
        if (!Number.isFinite(audio.duration)) return;
        totalTime.textContent = formatTime(audio.duration);
        currentTime.textContent = formatTime(audio.currentTime);
    });

    // --------------------------------------------------
    // Playing
    // --------------------------------------------------
    audio.addEventListener("play", () => {
        playButton.querySelector(".play-icon").textContent = "❚❚";
        playButton.querySelector(".play-label").textContent = "Pause";
    });

    // --------------------------------------------------
    // Paused
    // --------------------------------------------------
    audio.addEventListener("pause", () => {
        playButton.querySelector(".play-icon").textContent = "▷";
        playButton.querySelector(".play-label").textContent = "Play";
    });

    // --------------------------------------------------
    // Ended
    // --------------------------------------------------

    audio.addEventListener("ended", () => {
        progress.value = 100;

        currentTime.textContent = formatTime(audio.duration);

        playButton.querySelector(".play-icon").textContent = "▶";

        playButton.querySelector(".play-label").textContent = "Replay";
    });

    // ==================================================
    // Assemble player
    // ==================================================

    player.appendChild(progressRow);
    player.appendChild(controls);

    // ==================================================
    // EPISODE NOTES
    // ==================================================

    const notesSection = document.createElement("section");

    notesSection.className = `
        mt-2
        pt-5
    `;

    const notesHeading = document.createElement("h3");

    notesHeading.className = `
        mb-2
        text-[17px]
        font-bold
        uppercase
        tracking-wider
        text-slate-500
    `;

    notesHeading.textContent = "Episode Note";

    const notes = document.createElement("div");

    notes.className = `
        text-[16px]
        leading-7
        text-slate-600
        font-['Inter']
    `;

    episode.notes
        .split(/\n\s*\n/)
        .map((text) => text.trim())
        .filter(Boolean)
        .forEach((paragraph) => {
            const p = document.createElement("p");
            p.className = "mb-3 last:mb-0";
            p.textContent = paragraph;
            notes.appendChild(p);
        });

    notesSection.appendChild(notesHeading);
    notesSection.appendChild(notes);

    // ==================================================
    // Assemble content
    // ==================================================

    content.appendChild(title);

    content.appendChild(audio);

    content.appendChild(player);

    content.appendChild(notesSection);

    // ==================================================
    // Assemble card
    // ==================================================

    card.appendChild(header);
    card.appendChild(imageWrapper);
    card.appendChild(content);

    return card;
}

// --------------------------------------------------
// Format seconds as M:SS / H:MM:SS
// --------------------------------------------------

function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
        return "0:00";
    }

    seconds = Math.floor(seconds);

    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

// --------------------------------------------------
// Escape HTML
// --------------------------------------------------

function escapeHTML(value) {
    return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

// --------------------------------------------------
// Start application
// --------------------------------------------------

init();
