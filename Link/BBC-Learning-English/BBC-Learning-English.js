const { PDFDocument } = PDFLib;

const programSelection = document.getElementById("programSelection");
programmeNames.forEach((program, i) => {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = program;
    if (i === 0) option.setAttribute("selected", true);
    programSelection.appendChild(option);
});

function createCard(card) {
    const btnCSS = "background: none; border: none; cursor: pointer; margin:0; padding:0;";
    const btnCSS2 =
        "margin-top:5px; background: #eee; border: 1px solid rgba(210, 215, 211, 0.9); border-radius: 5px; cursor: pointer; padding: 3px 5px";
    return `
        <div style='margin: 0; text-align: center; padding: 10px; background:${card.cardBg}; display: inline-flex; align-self: flex-start;  flex-direction: column; align-items: center; border-radius: 10px;  box-shadow: 2px 2px 6px rgba(0,0,0,0.3);'>
            <span style='font-size: 15px; color: black; font-weight: bold; display: block;'>
                ${card.episode}
            </span>
            <img src="${card.bgImageLink}" width="300" height="169" style="border-radius: 6px; margin-top: 5px;">
            <a href="${card.webUrl}" target="_blank" style='max-width:450px; text-decoration: none; color: teal; font-size: 22px; font-weight: 700; margin-bottom:10px;'>
                ${card.title}
            </a>
            <audio controls>
                <source src="${card.audioLink}" type="audio/mpeg">
            </audio>
            <div class="display:flex; align-items:center; justify-content:center;">
                <button style="${btnCSS}" title="Download Audio" class="download-audio" data-audio="${encodeURIComponent(JSON.stringify(card))}">🎶</button>
                <button style="${btnCSS}" title="Download Transcripts" class="download-transcript" data-transcript="${encodeURIComponent(JSON.stringify(card))}">📋</button>
                <button style="${btnCSS}" title="Copy Card Image" class="copy-image" data-img="${encodeURIComponent(JSON.stringify(card))}">🖼️</button>
                <button style="${btnCSS2}" title="load on player" class="load-on-player" data-audio="${encodeURIComponent(JSON.stringify(card))}">Load</button>
                <button style="${btnCSS2}" title="load on play list" class="load-on-playlist" data-audio="${encodeURIComponent(JSON.stringify(card))}">LoadOnList</button>
            </div>
        </div>
    `;
}

let sorted = true;

function loadProgramData(programData) {
    if (!sorted) programData = [...programData].reverse();

    let html = ``;
    const colorSetIndex = Math.floor(Math.random() * colorSets.length);
    console.log("color set: ", colorSetIndex + 1);

    programData.forEach((episode) => {
        let monthIndex = parseInt(episode.episode.split(" ")[1].slice(2, 4));
        let cardBg = colorSets[colorSetIndex][monthIndex];
        html += createCard({ ...episode, cardBg });
    });

    const container = document.querySelector(".container");
    container.innerHTML = html;
    addAllEventListeners();
}
loadProgramData(programmesList[0]);
document.querySelector(".full-program-name").innerHTML = `<a target="_blank" style="text-decoration: none;" href="${programmesURL[0]}">
        ${fullProgrammeNames[0]}
    </a> 
    <br> Episodes: ${programmesList[0].length}
    `;

function selectProgramData() {
    let programIndex = programSelection.value;
    document.querySelector(".full-program-name").innerHTML = `<a target="_blank" style="text-decoration: none;" href="${programmesURL[programIndex]}">
            ${fullProgrammeNames[programIndex]}
        </a> 
        <br> Episodes: ${programmesList[programIndex].length}
        `;
    loadProgramData(programmesList[programIndex]);
}

programSelection.addEventListener("change", selectProgramData);
document.getElementById("sort-btn").onclick = () => {
    sorted = !sorted;
    selectProgramData();
};

function createFilename(obj) {
    const part1 = obj.episode.split(" ")[1].trim();
    const part2 = obj.type;
    const part3 = obj.title.replace(/[^\w\s]/g, "").replace(/\s+/g, " ");
    return part1 + "_" + part2 + " ➜ " + part3;
}

function addAllEventListeners() {
    document.querySelectorAll(".download-audio").forEach((btn) => {
        btn.onclick = async () => {
            const data = JSON.parse(decodeURIComponent(btn.dataset.audio));
            const fileName = createFilename(data);

            // 🔥 Create spinner
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `⏳ Downloading...`;

            try {
                const res = await fetch(data.audioLink);
                const blob = await res.blob();

                const url = URL.createObjectURL(blob);

                const a = document.createElement("a");
                a.href = url;
                a.download = `${fileName}.mp3`;
                a.click();

                URL.revokeObjectURL(url);

                // ✅ Success feedback
                btn.innerHTML = "✅ Done";
            } catch (err) {
                console.error(err);
                btn.innerHTML = "❌ Failed";
            } finally {
                // 🔄 Restore after 2s
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 2000);
            }
        };
    });

    function addToMobilePlayer(item) {
        const player = document.getElementById("mobile-player");
        if (player) player.style.display = "";

        if (!window.mobileAudioPlaylist) {
            window.mobileAudioPlaylist = [];
            window.mobileCurrentIndex = 0;

            const wrapper = document.createElement("div");
            wrapper.id = "mobile-player";
            wrapper.style.cssText = `
                margin:25px auto;
                width:min(95%,350px);
                background:#fff;
                border:1px solid #ccc;
                border-radius:8px;
                box-shadow:0 2px 8px rgba(0,0,0,.2);
                font-size:14px;
                user-select: none;
            `;

            wrapper.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; font-weight:bold; padding:5px;background:#eee; border-radius:5px;">
                    <span class="title" style="cursor: grab; touch-action: none; padding: 2px 8px; font-size:17px; color:brown;">🎵 Playlist</span>
                    <div style="display:flex;">
                        <button id="mobile-toggle"
                                style="border:none; background:none; cursor:pointer; font-size:18px;"
                                title="Collapse">⿻</button>
                        <button id="mobile-close"
                                style="border:none; background:none; cursor:pointer; font-size:18px;"
                                title="Close">❌</button>
                    </div>
                </div>
                <div id="mobile-body" style="padding:8px; padding-top:0;">
                    <div id="mobile-now-playing" style="white-space:wrap; overflow:hidden; font-weight:bold; font-size:16px; margin-bottom:4px; text-align:center; color:blue; padding:3px 8px;"></div>
                    <audio id="mobile-audio" controls style="width:100%"></audio>
                    <div class="mobile-controls" style="display:flex; gap:3px; justify-content:center; align-items:center;">
                        <input type="number" id="mobile-timeInput" placeholder="5s" min="0" style="width:40px; padding: 2px; border-radius: 4px; border: 1px solid #ccc; text-align: center; font-size: 16px; outline:none;"/>
                        <button id="mobile-rewindBtn">⏪</button>
                        <button id="mobile-playPauseBtn">⏯️</button>
                        <button id="mobile-forwardBtn">⏩</button>
                        <button id="mobile-repeat" title="Repeat current song / playlist">🔂/🔁</button>
                        <button id="mobile-scroll-current" title="Scroll currently playing item">📲</button>
                        <button id="mobile-playback-speed" title="Adjust playback speed" style="width:50px; font-size: 16px; border: none; border-radius: 5px; cursor: pointer; padding: 3px;">1× → 1.25× → 1.5× → 1.75× → 2×</button>
                        <button id="mobile-websearch" title="Look up in the web">🌐</button>
                    </div>
                    <div id="mobile-playlist" style="border:1px solid #ADD8E6; border-radius:3px; max-height:120px; overflow-y:auto; margin-top:6px;"></div>
                </div>
            `;
            document.body.appendChild(wrapper);
            makeTouchDraggable(wrapper);
            wrapper.scrollIntoView({ behavior: "smooth", block: "end" });

            const body = wrapper.querySelector("#mobile-body");
            const toggleBtn = wrapper.querySelector("#mobile-toggle");
            const closeBtn = wrapper.querySelector("#mobile-close");
            const audio = document.getElementById("mobile-audio");

            const timeInput = document.getElementById("mobile-timeInput");
            const rewindBtn = document.getElementById("mobile-rewindBtn");
            const playPauseBtn = document.getElementById("mobile-playPauseBtn");
            const forwardBtn = document.getElementById("mobile-forwardBtn");
            const repeatBtn = document.getElementById("mobile-repeat");
            const scrollBtn = document.getElementById("mobile-scroll-current");
            const speedBtn = document.getElementById("mobile-playback-speed");
            window.speeds = [1, 1.25, 1.5, 1.75, 2];
            window.speedIndex = 0;
            const webSearchBtn = document.getElementById("mobile-websearch");

            const btnStyle = `
                font-size: 16px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                padding: 2px;
            `;

            [rewindBtn, playPauseBtn, forwardBtn, repeatBtn, scrollBtn, webSearchBtn].forEach((btn) => (btn.style = btnStyle));

            toggleBtn.onclick = () => {
                const hidden = body.style.display === "none";
                body.style.display = hidden ? "block" : "none";
                toggleBtn.textContent = hidden ? "⿻" : "▢";
            };

            closeBtn.onclick = () => {
                wrapper.style.display = "none";
                audio.pause();
                audio.currentTime = 0;
            };

            // default skip
            timeInput.value = 5;

            // repeat mode
            window.mobileRepeatMode = 0; // 0=None, 1=Song, 2=Playlist

            repeatBtn.textContent = "➡️";
            repeatBtn.title = "Repeat Off";

            repeatBtn.onclick = () => {
                window.mobileRepeatMode = (window.mobileRepeatMode + 1) % 3;

                switch (window.mobileRepeatMode) {
                    case 0:
                        repeatBtn.textContent = "➡️";
                        repeatBtn.title = "Repeat Off";
                        break;

                    case 1:
                        repeatBtn.textContent = "🔂";
                        repeatBtn.title = "Repeat Current Song";
                        break;

                    case 2:
                        repeatBtn.textContent = "🔁";
                        repeatBtn.title = "Repeat Playlist";
                        break;
                }
            };

            rewindBtn.onclick = () => {
                const sec = Number(timeInput.value) || 5;
                audio.currentTime = Math.max(0, audio.currentTime - sec);
            };

            forwardBtn.onclick = () => {
                const sec = Number(timeInput.value) || 5;
                audio.currentTime = Math.min(audio.duration || Infinity, audio.currentTime + sec);
            };

            playPauseBtn.onclick = () => {
                if (audio.paused) audio.play();
                else audio.pause();
            };

            audio.addEventListener("play", () => {
                playPauseBtn.textContent = "⏸️";
            });

            audio.addEventListener("pause", () => {
                playPauseBtn.textContent = "▶️";
            });

            audio.addEventListener("ended", () => {
                switch (window.mobileRepeatMode) {
                    // Repeat current song
                    case 1:
                        playMobileTrack(window.mobileCurrentIndex);
                        return;
                    // Repeat playlist
                    case 2:
                        window.mobileCurrentIndex++;
                        if (window.mobileCurrentIndex >= window.mobileAudioPlaylist.length) window.mobileCurrentIndex = 0;
                        playMobileTrack(window.mobileCurrentIndex);
                        return;
                    // No repeat
                    default:
                        window.mobileCurrentIndex++;
                        if (window.mobileCurrentIndex < window.mobileAudioPlaylist.length) playMobileTrack(window.mobileCurrentIndex);
                }
            });

            //* Control playback speed
            audio.playbackRate = window.speeds[window.speedIndex];
            speedBtn.textContent = `${window.speeds[window.speedIndex]}×`;

            speedBtn.onclick = () => {
                window.speedIndex = (window.speedIndex + 1) % window.speeds.length;
                audio.playbackRate = window.speeds[window.speedIndex];
                speedBtn.textContent = `${window.speeds[window.speedIndex]}×`;
            };

            //* Scroll current
            scrollBtn.onclick = () => {
                const row = window.mobilePlaylistRows?.[window.mobileCurrentIndex];
                if (!row) return;

                row.scrollIntoView({ behavior: "smooth", block: "center" });
                row.animate([{ background: "#fff59d" }, { background: "" }], { duration: 1200 });
            };
        }
        // prevent duplicates
        if (!window.mobileAudioPlaylist.some((e) => e.audioLink === item.audioLink)) {
            window.mobileAudioPlaylist.push(item);
            renderMobilePlaylist();
        }
        // autoplay first song
        if (window.mobileAudioPlaylist.length === 1) {
            playMobileTrack(0);
        }
    }

    function playMobileTrack(index) {
        window.mobileCurrentIndex = index;
        const item = window.mobileAudioPlaylist[index];
        const audio = document.getElementById("mobile-audio");
        audio.src = item.audioLink;

        document.getElementById("mobile-now-playing").innerHTML =
            `<a href="${item.webUrl}" target="_blank" style="text-decoration:none; color:blue;">${item.title}</a>`;
        audio.playbackRate = window.speeds[window.speedIndex];
        document.getElementById("mobile-websearch").onclick = () => {
            open(`https://www.google.com/search?q="${item.title}"`, "_blank");
        };

        audio.play();

        window.mobileAudioPlaylist.forEach((item, i) => {
            const row = document.querySelector(`#mobile-playlist div:nth-child(${i + 1})`);
            if (i === index) row.style.background = "#e8f5ff";
            else row.style.background = "#fff";
        });
    }

    function renderMobilePlaylist() {
        const div = document.getElementById("mobile-playlist");
        div.innerHTML = "";

        window.mobilePlaylistRows = [];

        window.mobileAudioPlaylist.forEach((item, i) => {
            const row = document.createElement("div");

            row.style.cssText = `
                display:flex;
                align-items:center;
                justify-content:space-between;
                gap:8px;
                padding:5px;
                border-bottom:1px solid #eee;
                background:${i === window.mobileCurrentIndex ? "#e8f5ff" : ""};
            `;

            const title = document.createElement("span");
            title.innerHTML = `<span style="color:teal;">${i + 1}.</span> ${item.title}`;
            title.style.cssText = `
                flex:1;
                cursor:pointer;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            `;

            title.onclick = () => playMobileTrack(i);

            const del = document.createElement("button");
            del.textContent = "⛔";
            del.title = "Delete";
            del.style.cssText = `
                border:none;
                background:none;
                cursor:pointer;
                font-size:16px;
            `;

            del.onclick = (e) => {
                e.stopPropagation();

                window.mobileAudioPlaylist.splice(i, 1);

                if (window.mobileAudioPlaylist.length === 0) {
                    document.getElementById("mobile-audio").removeAttribute("src");
                    document.getElementById("mobile-audio").load();
                    document.getElementById("mobile-now-playing").textContent = "";
                    renderMobilePlaylist();
                    return;
                }

                if (i < window.mobileCurrentIndex) window.mobileCurrentIndex--;

                if (i === window.mobileCurrentIndex) {
                    if (window.mobileCurrentIndex >= window.mobileAudioPlaylist.length)
                        window.mobileCurrentIndex = window.mobileAudioPlaylist.length - 1;

                    playMobileTrack(window.mobileCurrentIndex);
                } else {
                    renderMobilePlaylist();
                }
            };
            row.appendChild(title);
            row.appendChild(del);

            div.appendChild(row);

            window.mobilePlaylistRows.push(row);
            row.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    document.querySelectorAll(".load-on-player").forEach((btn) => {
        btn.onclick = async () => {
            const data = JSON.parse(decodeURIComponent(btn.dataset.audio));
            const audioPlayer = document.getElementById("audioPlayer");
            const videoPlayer = document.getElementById("fsVideo");

            try {
                if (videoPlayer) {
                    window.dispatchEvent(
                        new CustomEvent("ADD_FROM_ONLINE", {
                            detail: {
                                mediaUrl: data.audioLink,
                                baseName: data.title || "BBC Learning English",
                            },
                        }),
                    );
                } else if (audioPlayer) {
                    audioPlayer.innerHTML = `<source src="${data.audioLink}" type="audio/mpeg">`;
                    audioPlayer.load(); // important!
                    audioPlayer.play();
                } else {
                    addToMobilePlayer(data);
                }
            } catch (err) {
                console.error("Loading failed", err);
            }
        };
    });

    document.querySelectorAll(".load-on-playlist").forEach((btn) => {
        btn.onclick = async () => {
            try {
                const player = document.getElementById("audioPlayer");
                if (player) {
                    const data = JSON.parse(decodeURIComponent(btn.dataset.audio));

                    const part1 = data.episode.split(" ")[1].trim();
                    const part2 = data.type;
                    const part3 = data.title;
                    const filename = `${part1}_${part2} ➜ ${part3}.mp3`;

                    const audioLink = data.audioLink;

                    window.dispatchEvent(
                        new CustomEvent("ADD_ONLINE_AUDIO", {
                            detail: {
                                filename,
                                audioLink,
                            },
                        }),
                    ); // 🔥 ADD to playlist instead of play directly
                }
            } catch (err) {
                console.error("Loading failed", err);
            }
        };
    });

    document.querySelectorAll(".copy-image").forEach((btn) => {
        btn.onclick = async () => {
            const data = JSON.parse(decodeURIComponent(btn.dataset.img));
            // 🔥 Create spinner
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `Copying...`;
            try {
                // Fetch from extension context (bypasses CORS if host_permissions are set)
                const response = await fetch(data.bgImageLink);
                const blob = await response.blob();

                // Convert to ImageBitmap
                const bitmap = await createImageBitmap(blob);

                // Draw on canvas
                const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
                const ctx = canvas.getContext("2d");
                ctx.drawImage(bitmap, 0, 0);

                // Convert to PNG blob
                const pngBlob = await canvas.convertToBlob({ type: "image/png" });

                // Copy PNG to clipboard
                await navigator.clipboard.write([new ClipboardItem({ "image/png": pngBlob })]);
                // ✅ Success feedback
                btn.innerHTML = "✅ Done";
            } catch (err) {
                console.error(err);
                btn.innerHTML = "❌ Failed";
            } finally {
                // 🔄 Restore after 2s
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 2000);
            }
        };
    });

    document.querySelectorAll(".download-transcript").forEach((btn) => {
        btn.onclick = async () => {
            const data = JSON.parse(decodeURIComponent(btn.dataset.transcript));
            const pdfUrls = data.transcripts;
            const fileName = createFilename(data);

            // 🔥 Create spinner
            const originalText = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = `⏳ Downloading...`;

            try {
                const mergedPdf = await PDFDocument.create();

                for (const url of pdfUrls) {
                    const response = await fetch(url);
                    const bytes = await response.arrayBuffer();
                    const pdf = await PDFDocument.load(bytes);
                    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

                    pages.forEach((page) => mergedPdf.addPage(page));
                }

                const mergedBytes = await mergedPdf.save();

                const blob = new Blob([mergedBytes], { type: "application/pdf" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `${fileName}.pdf`; // customize filename
                a.click();
                URL.revokeObjectURL(url);

                // ✅ Success feedback
                btn.innerHTML = "✅ Done";
            } catch (err) {
                console.error(err);
                btn.innerHTML = "❌ Failed";
            } finally {
                // 🔄 Restore after 2s
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.disabled = false;
                }, 2000);
            }
        };
    });
}

document.querySelector(".nav-btns .go-up").onclick = () => scrollWindow("up");
document.querySelector(".nav-btns .go-down").onclick = () => scrollWindow("down");

function scrollWindow(direction) {
    if (direction === "down") {
        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}
