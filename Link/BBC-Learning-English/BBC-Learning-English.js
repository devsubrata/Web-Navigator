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
        <div style='margin: 0; text-align: center; padding: 10px; background:${card.cardBg}; display: inline-flex; flex-direction: column; align-items: center; border-radius: 10px;  box-shadow: 2px 2px 6px rgba(0,0,0,0.3);'>
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
    console.log(colorSetIndex);

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
document.querySelector(".full-program-name").textContent = `${fullProgrammeNames[0]} | Episodes: ${programmesList[0].length}`;

function selectProgramData() {
    let programIndex = programSelection.value;
    document.querySelector(".full-program-name").textContent =
        `${fullProgrammeNames[programIndex]} | Episodes: ${programmesList[programIndex].length}`;
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

    document.querySelectorAll(".load-on-player").forEach((btn) => {
        btn.onclick = async () => {
            const data = JSON.parse(decodeURIComponent(btn.dataset.audio));
            try {
                const player = document.getElementById("audioPlayer");
                if (player) {
                    player.innerHTML = `<source src="${data.audioLink}" type="audio/mpeg">`;
                    player.load(); // important!
                    player.play();
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
