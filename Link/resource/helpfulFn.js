function downloadImage(img) {
    const rawName = new URL(img.src).pathname.split("/").pop();
    const fileName = decodeURIComponent(rawName);
    const link = document.createElement("a");
    link.href = img.src;
    link.download = fileName;
    link.click();
}

function getImageName(img) {
    return img.substring(0, img.lastIndexOf("."));
}

function highlightTerms(text, colorIndex = 14) {
    const colors = [
        "text-[#FF0000]", // 0
        "text-[#990033]", // 1
        "text-[#ff0066]", // 2
        "text-[#e63804]", // 3
        "text-[#B37400]", // 4
        "text-[#5fb503]", // 5
        "text-[#009c1a]", // 6
        "text-[#0000FF]", // 7
        "text-[#0404bb]", // 8
        "text-[#d303d3]", // 9
        "text-[#FF69B4]", // 10
        "text-[#E97451]", // 11
        "text-[#9400D3]", // 12
        "text-[#4B0082]", // 13
        "text-[#6600ff]", // 14
        "text-[#e48f05]", // 15
        "text-[#04cab6]", // 16
        "text-[#f53928]", // 17
        "text-[#151201]", // 18
        "text-[#512d01]", // 19
    ];

    const highlightedText = text.replace(/(\d+)?\*(.*?)\*/g, (match, index, content) => {
        const i = index ? Number(index) : colorIndex;
        const colorClass = colors[i];
        return `<span class="font-semibold ${colorClass}">${content.trim()}</span>`;
    });
    return highlightedText;
}

function makeTouchDraggable(el, calcNew = true) {
    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    const titleBar = el.querySelector(".title") || el;

    titleBar.style.cursor = "grab";

    // Required for left/top to work
    el.style.position = "fixed";

    // Initial position if none
    if (!el.style.left) {
        el.style.left = "10px";
        el.style.top = "10px";
    }

    function getPoint(e) {
        if (e.touches)
            return {
                x: e.touches[0].clientX,
                y: e.touches[0].clientY,
            };

        return {
            x: e.clientX,
            y: e.clientY,
        };
    }

    function start(e) {
        if (e.target !== titleBar) return;

        dragging = true;

        const p = getPoint(e);

        offsetX = p.x - el.offsetLeft;
        offsetY = p.y - el.offsetTop;

        titleBar.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
    }

    function move(e) {
        if (!dragging) return;
        titleBar.style.cursor = "grabbing";

        const p = getPoint(e);

        let left = p.x - offsetX;
        let top = p.y - offsetY;

        if (calcNew) [left, top] = preventOffscreen(left, top);

        el.style.left = left + "px";
        el.style.top = top + "px";

        if (e.cancelable) e.preventDefault();
    }

    function end() {
        dragging = false;
        titleBar.style.cursor = "grab";
        document.body.style.userSelect = "";
    }

    titleBar.addEventListener("mousedown", start);
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", end);

    titleBar.addEventListener("touchstart", start, { passive: true });
    document.addEventListener("touchmove", move, { passive: false });
    document.addEventListener("touchend", end);

    function preventOffscreen(left, top) {
        left = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, left));
        top = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, top));
        return [left, top];
    }
}
