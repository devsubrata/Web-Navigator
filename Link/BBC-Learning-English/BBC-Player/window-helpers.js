function makeResizable(el, options = {}) {
    const MIN_WIDTH = options.minWidth || 200;
    const MIN_HEIGHT = options.minHeight || 150;

    // 1️⃣ Create resizers dynamically
    const resizerDefs = [
        // Corners
        { class: "corner top-left", dir: "tl", cursor: "nwse-resize" },
        { class: "corner top-right", dir: "tr", cursor: "nesw-resize" },
        { class: "corner bottom-left", dir: "bl", cursor: "nesw-resize" },
        { class: "corner bottom-right", dir: "br", cursor: "nwse-resize" },
        // Edges
        { class: "edge top", dir: "t", cursor: "ns-resize" },
        { class: "edge bottom", dir: "b", cursor: "ns-resize" },
        { class: "edge left", dir: "l", cursor: "ew-resize" },
        { class: "edge right", dir: "r", cursor: "ew-resize" },
    ];

    resizerDefs.forEach((def) => {
        const div = document.createElement("div");
        div.className = "resizer " + def.class;
        div.dataset.direction = def.dir;
        div.style.position = "absolute";
        div.style.background = "transparent";
        div.style.zIndex = 10;
        div.style.cursor = def.cursor;

        // Size and positioning for corners
        if (def.class.startsWith("corner")) {
            div.style.width = "20px";
            div.style.height = "20px";
            if (def.dir.includes("t")) div.style.top = "-10px";
            if (def.dir.includes("b")) div.style.bottom = "-10px";
            if (def.dir.includes("l")) div.style.left = "-10px";
            if (def.dir.includes("r")) div.style.right = "-10px";
        } else {
            // Edges
            if (def.dir === "t" || def.dir === "b") {
                div.style.height = "10px";
                div.style.left = "10px";
                div.style.right = "10px";
                if (def.dir === "t") div.style.top = "-5px";
                else div.style.bottom = "-5px";
            } else {
                div.style.width = "10px";
                div.style.top = "10px";
                div.style.bottom = "10px";
                if (def.dir === "l") div.style.left = "-5px";
                else div.style.right = "-5px";
            }
        }

        el.appendChild(div);
    });

    // 2️⃣ Resizing logic
    let startX, startY, startWidth, startHeight, startLeft, startTop;
    let currentDirection = "";

    const resizers = el.querySelectorAll(".resizer");
    resizers.forEach((resizer) => resizer.addEventListener("mousedown", resizeMouseDown));

    function resizeMouseDown(e) {
        e.preventDefault();
        currentDirection = e.target.dataset.direction;

        const rect = el.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        startWidth = rect.width;
        startHeight = rect.height;
        startLeft = rect.left;
        startTop = rect.top;

        document.addEventListener("mousemove", elementResize);
        document.addEventListener("mouseup", closeResizeElement);
    }
    function elementResize(e) {
        let dx = e.clientX - startX;
        let dy = e.clientY - startY;
        let newWidth = startWidth;
        let newHeight = startHeight;
        let newLeft = startLeft;
        let newTop = startTop;

        const dir = currentDirection;

        if (dir.includes("r")) newWidth = startWidth + dx;
        if (dir.includes("l")) {
            newWidth = startWidth - dx;
            newLeft = startLeft + dx;
        }
        if (dir.includes("b")) newHeight = startHeight + dy;
        if (dir.includes("t")) {
            newHeight = startHeight - dy;
            newTop = startTop + dy;
        }

        if (newWidth < MIN_WIDTH) {
            newWidth = MIN_WIDTH;
            if (dir.includes("l")) newLeft = startLeft + startWidth - MIN_WIDTH;
        }
        if (newHeight < MIN_HEIGHT) {
            newHeight = MIN_HEIGHT;
            if (dir.includes("t")) newTop = startTop + startHeight - MIN_HEIGHT;
        }
        el.style.width = newWidth + "px";
        el.style.height = newHeight + "px";
        el.style.left = newLeft + "px";
        el.style.top = newTop + "px";
    }
    function closeResizeElement() {
        document.removeEventListener("mousemove", elementResize);
        document.removeEventListener("mouseup", closeResizeElement);
    }
}

function makeDraggable(el, calcNew = true) {
    let isDragging = false;
    let offsetX, offsetY;

    let titleBar = el.querySelector(".title") || el;
    titleBar.style.cursor = "grab";

    titleBar.addEventListener("mousedown", (e) => {
        if (e.target !== titleBar) return;
        if (e.target.classList.contains("resizer")) return;

        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;
        document.body.style.userSelect = "none";
        titleBar.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;

        // Calculate new position with bounds
        let newLeft = e.clientX - offsetX;
        let newTop = e.clientY - offsetY;

        if (calcNew) [newLeft, newTop] = preventOffscreen(newLeft, newTop);

        el.style.left = `${newLeft}px`;
        el.style.top = `${newTop}px`;
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.userSelect = "";
        titleBar.style.cursor = "grab";
    });

    function preventOffscreen(newLeft, newTop) {
        newLeft = Math.max(0, Math.min(window.innerWidth - el.offsetWidth, newLeft));
        newTop = Math.max(0, Math.min(window.innerHeight - el.offsetHeight, newTop));
        return [newLeft, newTop];
    }
}
