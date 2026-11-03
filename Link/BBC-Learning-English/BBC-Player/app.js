/* ======================================================================
 * Helpers & constants
 * ==================================================================== */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const TB = 44; // title bar height (px)
const CB = 56; // control bar height (px)
const MIN_W = 360;
const MIN_H = 260;
const KEY = "bbc-player-ui-v1";
const DEFAULT_PID = "p0pglyp9";
const PID_RE = /^[a-z]0[a-z0-9]{6}$/i;

const ZOOMS = [0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.5, 1.75, 2];
const ACCENTS = {
    rose: ["244 63 94", "251 146 60"],
    violet: ["139 92 246", "236 72 153"],
    cyan: ["6 182 212", "59 130 246"],
    amber: ["245 158 11", "239 68 68"],
    emerald: ["16 185 129", "132 204 22"],
};

const urlFor = (pid) => `https://www.bbc.co.uk/programmes/${pid}/player`;
const pageFor = (pid) => `https://www.bbc.co.uk/programmes/${pid}`;

/* ---------- icons ---------- */
const svg = (name, fill) =>
    `<svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="${fill ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ""}</svg>`;
const setIcon = (el, name) => {
    el.dataset.icon = name;
    el.innerHTML = svg(name, el.hasAttribute("data-fill"));
};
const hydrate = (root = document) => $$("[data-icon]", root).forEach((el) => setIcon(el, el.dataset.icon));

/* ======================================================================
 * Elements
 * ==================================================================== */
const win = $("#win");
const frame = $("#frame");
const titlebar = $("#titlebar");
const playerEl = $("#player");
const loadingEl = $("#loading");
const slowEl = $("#slow");
const idleEl = $("#idle");
const backdrop = $("#backdrop");

/* ======================================================================
 * State + persistence
 * ==================================================================== */
const saved =
    (() => {
        try {
            return JSON.parse(localStorage.getItem(KEY) || "null");
        } catch {
            return null;
        }
    })() || {};

const state = {
    pid: PID_RE.test(saved.pid || "") ? saved.pid : DEFAULT_PID,
    recent: Array.isArray(saved.recent) ? saved.recent.filter((p) => PID_RE.test(p)).slice(0, 6) : [DEFAULT_PID],
    zoom: ZOOMS.includes(saved.zoom) ? saved.zoom : 1,
    accent: ACCENTS[saved.accent] ? saved.accent : "rose",
    opacity: typeof saved.opacity === "number" ? Math.min(1, Math.max(0.4, saved.opacity)) : 1,
    glow: saved.glow !== false,
    immersive: !!saved.immersive,
    locked: !!saved.locked,
    maximized: false,
    minimized: false,
    closed: false,
    geom: null,
    sleepEnd: null,
    sleepMin: 0,
};
if (!state.recent.length) state.recent = [state.pid];

function save() {
    try {
        localStorage.setItem(
            KEY,
            JSON.stringify({
                geom: state.geom,
                accent: state.accent,
                opacity: state.opacity,
                glow: state.glow,
                immersive: state.immersive,
                locked: state.locked,
                zoom: state.zoom,
                pid: state.pid,
                recent: state.recent,
            }),
        );
    } catch {
        /* storage unavailable: ignore */
    }
}

/* ======================================================================
 * Window geometry
 * ==================================================================== */
const canMove = () => !state.locked && !state.maximized;

const defaultGeom = () => {
    const width = Math.min(880, innerWidth - 32);
    const height = Math.min(TB + CB + Math.round((width * 9) / 16), innerHeight - 32);
    return {
        width,
        height,
        left: Math.round((innerWidth - width) / 2),
        top: Math.round((innerHeight - height) / 2),
    };
};

const clampGeom = (g) => {
    const width = Math.min(Math.max(g.width, MIN_W), innerWidth);
    const height = Math.min(Math.max(g.height, MIN_H), innerHeight);
    return {
        width,
        height,
        left: Math.min(Math.max(0, g.left), innerWidth - width),
        top: Math.min(Math.max(0, g.top), innerHeight - height),
    };
};

const getGeom = () => {
    const r = win.getBoundingClientRect();
    return { left: r.left, top: r.top, width: r.width, height: r.height };
};

state.geom = clampGeom(saved.geom && saved.geom.width ? saved.geom : defaultGeom());

let animTimer;
function render(animate) {
    if (animate) {
        win.classList.add("anim");
        clearTimeout(animTimer);
        animTimer = setTimeout(() => win.classList.remove("anim"), 340);
    }

    let g = state.geom;
    if (state.maximized) g = { left: 0, top: 0, width: innerWidth, height: innerHeight };
    else if (state.minimized) g = { ...g, height: TB };

    win.style.left = g.left + "px";
    win.style.top = g.top + "px";
    win.style.width = g.width + "px";
    win.style.height = g.height + "px";

    frame.dataset.max = state.maximized;
    frame.dataset.min = state.minimized;

    const hideResizers = state.maximized || state.minimized || state.locked;
    $$(".resizer", win).forEach((r) => (r.style.display = hideResizers ? "none" : "block"));
    titlebar.style.cursor = canMove() ? "grab" : "default";

    setIcon($("#btn-max"), state.maximized ? "restore" : "square");
    $("#btn-max").dataset.tip = state.maximized ? "Restore · M" : "Maximize · M";
    setIcon($("#btn-min"), state.minimized ? "chevup" : "minus");
    $("#btn-min").dataset.tip = state.minimized ? "Restore · N" : "Minimize · N";
}

/** Persist geometry after a drag / resize gesture. */
function commit() {
    if (state.maximized) return;
    const r = getGeom();
    state.geom.left = r.left;
    state.geom.top = r.top;
    if (!state.minimized) {
        state.geom.width = r.width;
        state.geom.height = r.height;
    }
    save();
}

/* ======================================================================
 * Window controls
 * ==================================================================== */
function toggleMax() {
    closeMenus();
    state.minimized = false;
    state.maximized = !state.maximized;
    render(true);
}

function toggleMin() {
    closeMenus();
    state.maximized = false;
    state.minimized = !state.minimized;
    render(true);
}

function closePlayer() {
    closeMenus();
    if (document.fullscreenElement) document.exitFullscreen();
    state.closed = true;
    stopPlayback(false);
    win.classList.add("closing");
    setTimeout(() => {
        if (state.closed) win.classList.add("hidden");
    }, 220);
    $("#dock").classList.remove("hidden");
    $("#dock").classList.add("flex");
}

function reopenPlayer() {
    state.closed = false;
    win.classList.remove("hidden");
    void win.offsetWidth; // force reflow so the fade-in transition runs
    win.classList.remove("closing");
    $("#dock").classList.add("hidden");
    $("#dock").classList.remove("flex");
    loadPlayer();
}

function toggleLock(force) {
    state.locked = typeof force === "boolean" ? force : !state.locked;
    render();
    sync();
    save();
    toast(state.locked ? "Position locked" : "Position unlocked");
}

/* ---------- snapping + ratio ---------- */
function snap(name) {
    closeMenus();
    state.maximized = false;
    state.minimized = false;

    const W = innerWidth,
        H = innerHeight,
        m = 16;
    const g = { ...state.geom };
    let next = g;

    switch (name) {
        case "tl":
            next = { ...g, left: m, top: m };
            break;
        case "tr":
            next = { ...g, left: W - g.width - m, top: m };
            break;
        case "bl":
            next = { ...g, left: m, top: H - g.height - m };
            break;
        case "br":
            next = { ...g, left: W - g.width - m, top: H - g.height - m };
            break;
        case "center":
            next = { ...g, left: (W - g.width) / 2, top: (H - g.height) / 2 };
            break;
        case "left":
            next = { left: 0, top: 0, width: W / 2, height: H };
            break;
        case "right":
            next = { left: W / 2, top: 0, width: W / 2, height: H };
            break;
        case "mini": {
            const width = 380;
            const height = (state.immersive ? 0 : TB + CB) + Math.round((width * 9) / 16);
            next = { width, height, left: W - width - m, top: H - height - m };
            break;
        }
    }

    state.geom = clampGeom(next);
    render(true);
    save();
}

function fitRatio(str) {
    closeMenus();
    const [a, b] = str.split(":").map(Number);
    const ratio = a / b;

    state.maximized = false;
    state.minimized = false;

    const chrome = state.immersive ? 0 : TB + CB;
    let w = state.geom.width;
    let h = Math.round(w / ratio) + chrome;
    if (h > innerHeight) {
        h = innerHeight;
        w = Math.round((h - chrome) * ratio);
    }

    state.geom = clampGeom({ ...state.geom, width: w, height: h });
    render(true);
    save();
    toast("Fitted to " + str);
}

/* ======================================================================
 * Player loading
 * ==================================================================== */
let slowTimer;

function setStatus(s) {
    const dot = $("#status-dot");
    dot.className =
        "h-1.5 w-1.5 rounded-full " +
        {
            loading: "bg-amber-400 animate-pulse",
            ready: "bg-emerald-400",
            stopped: "bg-slate-500",
        }[s];
    $("#status-text").textContent = { loading: "Loading…", ready: "Ready", stopped: "Stopped" }[s];
}

/* ---------- ?pid=… from the URL (overrides the saved pid) ---------- */
const rawPid = new URLSearchParams(location.search).get("pid");
const urlPid = rawPid ? parsePid(rawPid) : null;

if (urlPid) {
    state.pid = urlPid;
    state.recent = [urlPid, ...state.recent.filter((p) => p !== urlPid)].slice(0, 6);
    save();
} else if (rawPid) {
    setTimeout(() => toast("Invalid programme ID in URL"), 400);
}

function loadPlayer() {
    clearTimeout(slowTimer);
    idleEl.classList.add("hidden");
    idleEl.classList.remove("grid");
    loadingEl.classList.remove("hidden");
    slowEl.classList.add("hidden");
    setStatus("loading");
    $("#pid-text").textContent = state.pid;
    playerEl.src = urlFor(state.pid);
    slowTimer = setTimeout(() => slowEl.classList.remove("hidden"), 8000);
}

function stopPlayback(showIdle) {
    clearTimeout(slowTimer);
    playerEl.src = "about:blank";
    loadingEl.classList.add("hidden");
    setStatus("stopped");
    if (showIdle) {
        idleEl.classList.remove("hidden");
        idleEl.classList.add("grid");
    }
}

playerEl.addEventListener("load", () => {
    const src = playerEl.getAttribute("src");
    if (!src || src === "about:blank") return;
    clearTimeout(slowTimer);
    loadingEl.classList.add("hidden");
    slowEl.classList.add("hidden");
    setStatus("ready");
});

/** Accepts a bare programme ID or any bbc.co.uk URL containing one. */
function parsePid(value) {
    const m = value.trim().match(/(?:^|[\/\s])([a-z]0[a-z0-9]{6})(?=$|[\/?#\s])/i);
    return m ? m[1].toLowerCase() : null;
}

function loadPid(pid) {
    state.pid = pid;
    state.recent = [pid, ...state.recent.filter((p) => p !== pid)].slice(0, 6);
    closeMenus();
    loadPlayer();
    save();
    toast("Loading " + pid);
}

const reload = () => {
    closeMenus();
    loadPlayer();
    toast("Reloading…");
};
const openExternal = () => window.open(pageFor(state.pid), "_blank", "noopener");

async function copyLink() {
    const url = pageFor(state.pid);
    try {
        await navigator.clipboard.writeText(url);
        toast("Link copied");
    } catch {
        const area = document.createElement("textarea");
        area.value = url;
        document.body.appendChild(area);
        area.select();
        try {
            document.execCommand("copy");
            toast("Link copied");
        } catch {
            toast("Couldn't copy link");
        }
        area.remove();
    }
}

/* ======================================================================
 * Zoom
 * ==================================================================== */
function applyZoom() {
    const z = state.zoom;
    playerEl.style.width = 100 / z + "%";
    playerEl.style.height = 100 / z + "%";
    playerEl.style.transform = z === 1 ? "none" : `scale(${z})`;
    $("#zoom-val").textContent = Math.round(z * 100) + "%";
}

function setZoom(z) {
    state.zoom = z;
    applyZoom();
    save();
}

function stepZoom(direction) {
    let i = ZOOMS.findIndex((z) => Math.abs(z - state.zoom) < 0.01);
    if (i < 0) i = ZOOMS.indexOf(1);
    setZoom(ZOOMS[Math.min(ZOOMS.length - 1, Math.max(0, i + direction))]);
}

/* ======================================================================
 * Appearance
 * ==================================================================== */
function applyAccent() {
    const [a, b] = ACCENTS[state.accent];
    win.style.setProperty("--accent", a);
    win.style.setProperty("--accent2", b);
}

/** Push current state into every control that reflects it. */
function sync() {
    applyAccent();
    frame.style.opacity = state.opacity;
    $("#opacity").value = Math.round(state.opacity * 100);
    $("#opacity-val").textContent = Math.round(state.opacity * 100) + "%";
    $("#glow").style.display = state.glow ? "" : "none";

    $("#sw-glow").setAttribute("aria-checked", state.glow);
    $("#sw-immersive").setAttribute("aria-checked", state.immersive);
    $("#sw-lock").setAttribute("aria-checked", state.locked);
    $("#btn-immersive").classList.toggle("is-on", state.immersive);

    const lock = $("#btn-lock");
    setIcon(lock, state.locked ? "lock" : "unlock");
    lock.classList.toggle("is-on", state.locked);

    $$("#swatches button").forEach((b) => {
        const on = b.dataset.accent === state.accent;
        b.classList.toggle("ring-2", on);
        b.classList.toggle("ring-white", on);
    });
}

/* ======================================================================
 * Immersive mode (auto-hiding chrome)
 * ==================================================================== */
let chromeTimer;
let interacting = false;
let openMenu = null;

function showChrome() {
    clearTimeout(chromeTimer);
    frame.dataset.chrome = "shown";
}

function scheduleHide(delay = 1400) {
    if (!state.immersive) return;
    clearTimeout(chromeTimer);
    chromeTimer = setTimeout(() => {
        if (!openMenu && !interacting) frame.dataset.chrome = "hidden";
    }, delay);
}

function setImmersive(on) {
    state.immersive = on;
    frame.dataset.immersive = on;
    showChrome();
    scheduleHide(1600);
    sync();
    save();
    toast(on ? "Immersive on · hover the top or bottom edge" : "Immersive off");
}

$("#hot-top").addEventListener("mouseenter", showChrome);
$("#hot-bottom").addEventListener("mouseenter", showChrome);
[titlebar, $("#controls")].forEach((el) => {
    el.addEventListener("mouseenter", showChrome);
    el.addEventListener("mouseleave", () => scheduleHide());
});

/* ======================================================================
 * Menus
 * ==================================================================== */
function closeMenus() {
    $$(".menu").forEach((m) => m.classList.add("hidden"));
    backdrop.classList.add("hidden");
    $$("[data-menu]").forEach((b) => {
        b.classList.remove("is-on");
        b.setAttribute("aria-expanded", "false");
    });
    openMenu = null;
    scheduleHide();
}

function toggleMenu(id, button) {
    if (openMenu === id) return closeMenus();
    closeMenus();

    $("#" + id).classList.remove("hidden");
    backdrop.classList.remove("hidden");
    openMenu = id;

    if (button) {
        button.classList.add("is-on");
        button.setAttribute("aria-expanded", "true");
    }
    showChrome();

    if (id === "menu-load") {
        renderRecent();
        $("#load-err").classList.add("hidden");
        setTimeout(() => $("#load-input").focus(), 0);
    }
    if (id === "menu-sleep") markSleep();
}

$$("[data-menu]").forEach((b) => b.addEventListener("click", () => toggleMenu(b.dataset.menu, b)));
backdrop.addEventListener("mousedown", closeMenus);
document.addEventListener("mousedown", (e) => {
    if (openMenu && !win.contains(e.target)) closeMenus();
});

function renderRecent() {
    const list = $("#recent");
    list.innerHTML = "";

    state.recent.forEach((pid) => {
        const li = document.createElement("li");
        const current = pid === state.pid;
        li.innerHTML = `
        <button class="menu-item ${current ? "active" : ""}">
          <span data-icon="play" data-fill class="[&>svg]:h-3.5 [&>svg]:w-3.5"></span>
          <span class="font-mono text-xs">${pid}</span>
          ${current ? '<span class="ml-auto text-[10px] font-semibold tracking-wider">NOW</span>' : ""}
        </button>`;
        li.querySelector("button").addEventListener("click", () => loadPid(pid));
        list.appendChild(li);
    });

    hydrate(list);
}

function loadPid(pid) {
    state.pid = pid;
    state.recent = [pid, ...state.recent.filter((p) => p !== pid)].slice(0, 6);
    closeMenus();
    loadPlayer();
    syncPidInput(); // ← add this line
    save();
    toast("Loading " + pid);
}

$("#load-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const pid = parsePid($("#load-input").value);
    if (!pid) return $("#load-err").classList.remove("hidden");
    $("#load-input").value = "";
    loadPid(pid);
});
$("#load-input").addEventListener("input", () => $("#load-err").classList.add("hidden"));

/* ---------- bottom-bar programme input ---------- */
const pidInput = $("#pid-input");

function syncPidInput() {
    pidInput.value = state.pid;
    $("#pid-list").innerHTML = state.recent.map((p) => `<option value="${p}">`).join("");
}

$("#pid-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const pid = parsePid(pidInput.value);

    if (!pid) {
        pidInput.classList.add("!border-rose-500");
        setTimeout(() => pidInput.classList.remove("!border-rose-500"), 1200);
        toast("Enter a valid programme ID, e.g. p0phstk6");
        return;
    }

    pidInput.blur();
    loadPid(pid);
});

/* ======================================================================
 * Sleep timer
 * ==================================================================== */
let sleepInterval;

function formatTime(ms) {
    const total = Math.max(0, Math.round(ms / 1000));
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    const mm = h ? String(m).padStart(2, "0") : String(m).padStart(2, "0");
    return (h ? h + ":" : "") + mm + ":" + String(s).padStart(2, "0");
}

function setSleepPill(visible) {
    const pill = $("#sleep-pill");
    pill.classList.toggle("hidden", !visible);
    pill.classList.toggle("inline-flex", visible);
}

function setSleep(minutes) {
    clearInterval(sleepInterval);

    if (!minutes) {
        state.sleepEnd = null;
        state.sleepMin = 0;
        setSleepPill(false);
        closeMenus();
        toast("Sleep timer off");
        return;
    }

    state.sleepMin = minutes;
    state.sleepEnd = Date.now() + minutes * 60000;
    setSleepPill(true);
    sleepInterval = setInterval(tickSleep, 1000);
    tickSleep();
    closeMenus();
    toast(`Playback will stop in ${minutes} min`);
}

function tickSleep() {
    const remaining = state.sleepEnd - Date.now();
    if (remaining <= 0) {
        clearInterval(sleepInterval);
        state.sleepEnd = null;
        state.sleepMin = 0;
        setSleepPill(false);
        stopPlayback(true);
        return;
    }
    $("#sleep-left").textContent = formatTime(remaining);
}

function markSleep() {
    $$("[data-sleep]").forEach((b) => b.classList.toggle("active", Number(b.dataset.sleep) === (state.sleepMin || 0)));
}

/* ======================================================================
 * Toast
 * ==================================================================== */
let toastTimer;
function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.remove("opacity-0", "translate-y-2");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add("opacity-0", "translate-y-2"), 1900);
}

/* ======================================================================
 * Fullscreen
 * ==================================================================== */
function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (frame.requestFullscreen) frame.requestFullscreen().catch(() => toast("Fullscreen was blocked by the browser"));
    else toast("Fullscreen isn't supported here");
}

document.addEventListener("fullscreenchange", () => {
    const on = !!document.fullscreenElement;
    setIcon($("#btn-fs"), on ? "exitfs" : "fullscreen");
    $("#btn-fs").dataset.tip = on ? "Exit fullscreen · F" : "Fullscreen · F";
});

/* ======================================================================
 * Static UI built from data (help list, accent swatches)
 * ==================================================================== */
const SHORTCUTS = [
    ["F", "Fullscreen"],
    ["M", "Maximize / restore"],
    ["N", "Minimize / restore"],
    ["R", "Reload"],
    ["L", "Load programme"],
    ["O", "Open on BBC"],
    ["C", "Copy link"],
    ["I", "Immersive mode"],
    ["P", "Lock position"],
    ["+  −", "Zoom in / out"],
    ["0", "Reset zoom"],
    ["1–5", "Snap corners / center"],
    ["Esc", "Close menu / un-maximize"],
];

SHORTCUTS.forEach(([key, label]) => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between rounded-md px-1.5 py-1 text-[13px] text-slate-300";
    li.innerHTML = `<span>${label}</span><span class="kbd" style="margin-left:0">${key}</span>`;
    $("#help-list").appendChild(li);
});

Object.entries(ACCENTS).forEach(([name, [from, to]]) => {
    const button = document.createElement("button");
    button.dataset.accent = name;
    button.setAttribute("aria-label", name);
    button.className = "h-6 w-6 rounded-full ring-offset-2 ring-offset-slate-900 transition hover:scale-110";
    button.style.background = `linear-gradient(135deg, rgb(${from}), rgb(${to}))`;
    button.addEventListener("click", () => {
        state.accent = name;
        sync();
        save();
    });
    $("#swatches").appendChild(button);
});

/* ======================================================================
 * Event wiring
 * ==================================================================== */
$("#btn-close").addEventListener("click", closePlayer);
$("#btn-max").addEventListener("click", toggleMax);
$("#btn-min").addEventListener("click", toggleMin);
$("#btn-lock").addEventListener("click", () => toggleLock());
$("#dock").addEventListener("click", reopenPlayer);

$("#btn-reload").addEventListener("click", reload);
$("#btn-open").addEventListener("click", openExternal);
$("#btn-open-menu").addEventListener("click", () => {
    closeMenus();
    openExternal();
});
$("#slow-open").addEventListener("click", openExternal);
$("#btn-copy").addEventListener("click", copyLink);
$("#btn-fs").addEventListener("click", toggleFullscreen);
$("#btn-immersive").addEventListener("click", () => setImmersive(!state.immersive));
$("#idle-resume").addEventListener("click", loadPlayer);

$("#zoom-in").addEventListener("click", () => stepZoom(1));
$("#zoom-out").addEventListener("click", () => stepZoom(-1));
$("#zoom-val").addEventListener("click", () => setZoom(1));

$$("[data-ratio]").forEach((b) => b.addEventListener("click", () => fitRatio(b.dataset.ratio)));
$$("[data-snap]").forEach((b) => b.addEventListener("click", () => snap(b.dataset.snap)));
$$("[data-sleep]").forEach((b) => b.addEventListener("click", () => setSleep(Number(b.dataset.sleep))));

$("#opacity").addEventListener("input", (e) => {
    state.opacity = e.target.value / 100;
    sync();
    save();
});
$("#sw-glow").addEventListener("click", () => {
    state.glow = !state.glow;
    sync();
    save();
});
$("#sw-immersive").addEventListener("click", () => setImmersive(!state.immersive));
$("#sw-lock").addEventListener("click", () => toggleLock());

$("#btn-reset").addEventListener("click", () => {
    state.maximized = false;
    state.minimized = false;
    state.locked = false;
    state.geom = defaultGeom();
    state.zoom = 1;
    state.opacity = 1;
    applyZoom();
    render(true);
    sync();
    save();
    closeMenus();
    toast("Layout reset");
});

titlebar.addEventListener("dblclick", (e) => {
    if (e.target === titlebar) toggleMax();
});

/* ======================================================================
 * Drag / resize integration
 * ==================================================================== */

// Registered BEFORE makeDraggable so it can veto a drag while locked/maximized.
titlebar.addEventListener("mousedown", (e) => {
    if (!canMove()) e.stopImmediatePropagation();
});

makeResizable(win, { minWidth: MIN_W, minHeight: MIN_H });
makeDraggable(win);

// Stop the iframe from swallowing mouse events mid-gesture.
win.addEventListener(
    "mousedown",
    (e) => {
        const onHandle = e.target === titlebar || e.target.closest(".resizer");
        if (onHandle && canMove()) {
            interacting = true;
            document.body.classList.add("interacting");
            closeMenus();
            showChrome();
        }
    },
    true,
);

// Registered AFTER makeDraggable so cursor + persistence settle last.
document.addEventListener("mouseup", () => {
    titlebar.style.cursor = canMove() ? "grab" : "default";
    if (!interacting) return;
    interacting = false;
    document.body.classList.remove("interacting");
    commit();
    scheduleHide();
});

/* ======================================================================
 * Responsive chrome + viewport changes
 * ==================================================================== */
new ResizeObserver(([entry]) => {
    const w = entry.contentRect.width;
    frame.dataset.w = w < 520 ? "sm" : w < 700 ? "md" : "lg";
}).observe(frame);

window.addEventListener("resize", () => {
    if (state.maximized) return render();
    state.geom = clampGeom(state.geom);
    render();
});

/* ======================================================================
 * Keyboard shortcuts
 * ==================================================================== */
const SHORTCUT_ACTIONS = {
    f: toggleFullscreen,
    m: toggleMax,
    n: toggleMin,
    r: reload,
    o: openExternal,
    c: copyLink,
    p: () => toggleLock(),
    i: () => setImmersive(!state.immersive),
    l: () => toggleMenu("menu-load", $("#btn-load")),
    "?": () => toggleMenu("menu-help", $("#btn-help")),
    "+": () => stepZoom(1),
    "=": () => stepZoom(1),
    "-": () => stepZoom(-1),
    _: () => stepZoom(-1),
    0: () => setZoom(1),
    1: () => snap("tl"),
    2: () => snap("tr"),
    3: () => snap("bl"),
    4: () => snap("br"),
    5: () => snap("center"),
    escape: () => {
        if (openMenu) closeMenus();
        else if (state.maximized) toggleMax();
    },
};

document.addEventListener("keydown", (e) => {
    if (state.closed) return;

    if (e.target.matches && e.target.matches("input, textarea, select")) {
        if (e.key === "Escape") e.target.blur();
        return;
    }
    if (e.ctrlKey || e.metaKey || e.altKey) return;

    const action = SHORTCUT_ACTIONS[e.key.toLowerCase()];
    if (action) {
        e.preventDefault();
        action();
    }
});

/* ======================================================================
 * Boot
 * ==================================================================== */
hydrate();
frame.dataset.immersive = state.immersive;
applyZoom();
sync();
render();
$("#pid-text").textContent = state.pid;
syncPidInput();
loadPlayer();
if (state.immersive) scheduleHide(2500);
